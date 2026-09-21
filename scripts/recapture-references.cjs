#!/usr/bin/env node
/**
 * Recapture les screenshots pleine page des sites de la page Références
 * (/services/sites-web). Source unique de vérité : data/web-references.json
 * (seuls les sites non archivés sont capturés).
 *
 * Usage : node scripts/recapture-references.cjs [--no-git] [--only=slug,slug]
 *   --no-git      : capture sans commit ni push (run manuel / revue avant PR)
 *   --only=a,b    : ne recapture que ces slugs (nom de fichier sans extension)
 *
 * Garanties, dans l'ordre où elles comptent pour l'affichage :
 *  1. Un site qui ne répond pas correctement (réseau KO, HTTP ≥ 400, page
 *     d'erreur Cloudflare…) n'écrase JAMAIS la capture précédente.
 *  2. Le hero est capturé propre : bandeaux cookies / modales retirés après
 *     stabilisation ET juste avant la capture (les CMP s'injectent tard),
 *     contrôles vidéo masqués, verrou de scroll des CMP levé.
 *  3. La page est parcourue de haut en bas avant la capture pour déclencher
 *     le lazy-loading et les animations au scroll, puis ramenée en haut :
 *     le composant affiche le haut de l'image au repos (hero) et défile au
 *     survol, il faut donc que tout le bas soit rendu.
 *  4. Vidéos et embeds YouTube figés en image (frame courante, poster ou
 *     miniature YouTube) : sans ça, YouTube affiche une invite anti-robot
 *     dans le hero et une <video> peut bloquer indéfiniment la capture.
 *  5. Repli automatique : capture pleine page → sinon sans vidéos → sinon
 *     par tranches d'écran (seule façon fidèle de rendre un site dont le
 *     contenu est épinglé au scroll ; aussi utilisée si la pleine page
 *     ressort anormalement vide).
 *  6. Sortie en vrai WebP (l'ancien script écrivait du JPEG sous .webp).
 *
 * Lancé par cron sur le VPS (lundi 3 h). playwright-core n'est pas une
 * dépendance du site : il est résolu depuis le repo si présent, sinon depuis
 * DIGIQO_TOOLS_DIR (/root/.config/digiqo/tools), hors dépôt et hors purge npm.
 */

const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public', 'references', 'fullpage');
const TOOLS_DIR = process.env.DIGIQO_TOOLS_DIR || '/root/.config/digiqo/tools';
const NO_GIT = process.argv.includes('--no-git');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '')
  .replace('--only=', '')
  .split(',')
  .filter(Boolean);

const VIEWPORT = { width: 1280, height: 800 };
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
// Au-delà, on tronque : une page infinie ne doit pas produire un fichier
// de plusieurs Mo ni faire échouer la capture (limite Chrome ~16 000 px).
const MAX_PAGE_HEIGHT = 14000;

function loadModule(name) {
  try {
    return require(name);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    return require(path.join(TOOLS_DIR, 'node_modules', name));
  }
}

function git(args) {
  return execFileSync('git', args, { cwd: PROJECT_ROOT, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
}

const references = require('../data/web-references.json');
const sites = references
  .filter((r) => !r.archived)
  .map((r) => ({ slug: path.basename(r.screenshot).replace(/\.\w+$/, ''), url: r.url }))
  .filter((s) => ONLY.length === 0 || ONLY.includes(s.slug));

// Sélecteurs des CMP et modales connus, plus une détection générique par
// position fixed/sticky + contenu « cookies » ou rôle dialog. On ne touche
// jamais à html/body/main, et jamais à une balise de structure sur le seul
// critère du nom de classe : un hero s'appelle souvent « banner » ou
// « overlay », le retirer par nom vidait des captures.
const OVERLAY_SELECTORS = [
  '#usercentrics-root', '#axeptio_overlay', '#didomi-host', '#didomi-popup',
  '#CybotCookiebotDialog', '#CybotCookiebotDialogBodyUnderlay', '#onetrust-consent-sdk',
  '#tarteaucitronRoot', '#tarteaucitronAlertBig', '#cmplz-cookiebanner-container',
  '.cmplz-blocked-content-notice', '.cky-consent-container', '.cky-overlay', '.cky-modal',
  '#cookie-notice', '#cookie-law-info-bar', '#cookie-law-info-again', '#moove_gdpr_cookie_info_bar',
  '.wt-cli-cookie-bar', '#BorlabsCookieBox', '#BorlabsCookieBoxWidget', '.iubenda-cst',
  '#iubenda-cs-banner', '#termly-code-snippet-support', '.cc-window', '.cc-banner', '#klaro',
  '.orejime-Notice', '#hs-eu-cookie-confirmation', '#shopify-pc__banner', '.cmp-container',
  '#cmp-container', '#gdpr-cookie-message', '.cookie-consent-banner', '#CookieConsent',
  '.cookieconsent', '#cookieConsent', '#cookie-banner', '.cookie-banner', '#cookies-banner',
  '.cookies-banner', '#cookie-bar', '.cookie-bar', '#cookieBar', '.cookie-notice', '.cookie-popup',
  '#cookie-popup', '.consent-banner', '#consent-banner', '.gdpr-banner', '#gdpr-banner',
  '.rgpd-banner', '#rgpd-banner', '[data-testid="consent-banner"]', '[data-cookie-banner]',
  '[data-cookieconsent]', '.pum-overlay', '.elementor-popup-modal', '.brz-popup2',
  'dialog[open]',
];
const COOKIE_TEXT = /cookie|consent|donn[ée]es personnelles|vie priv[ée]e|rgpd|gdpr|traceurs|confidentialit[ée]/i;
const OVERLAY_NAME = /popup|pop-up|modal|overlay|backdrop|lightbox|cookie|consent|gdpr|rgpd|newsletter-popup/i;
const NEVER_REMOVE = new Set(['HTML', 'BODY', 'MAIN']);
const STRUCTURAL = new Set(['HEADER', 'FOOTER', 'NAV', 'SECTION', 'ARTICLE']);
// En dessous (octets JPEG par pixel), la pleine page est considérée vide :
// typique d'un site à contenu épinglé au scroll → capture par tranches.
const MIN_DENSITY = 0.01;

function cleanPageInBrowser({ selectors, cookieText, overlayName, neverRemove, structural }) {
  const cookieRe = new RegExp(cookieText[0], cookieText[1]);
  const overlayRe = new RegExp(overlayName[0], overlayName[1]);
  const protectedTags = new Set(neverRemove);
  const structuralTags = new Set(structural);
  const removed = [];

  const isProtected = (el) => !el || protectedTags.has(el.tagName);
  const remove = (el) => {
    if (isProtected(el) || !el.isConnected) return;
    removed.push(el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''));
    el.remove();
  };

  // 1. CMP / modales connus.
  for (const sel of selectors) {
    try { document.querySelectorAll(sel).forEach(remove); } catch (_) { /* sélecteur invalide */ }
  }

  // 2. Générique : éléments fixed/sticky qui ressemblent à un overlay. On
  //    remonte au plus haut ancêtre qui ne contient rien d'autre (wrapper +
  //    backdrop d'une modale) pour ne pas laisser un voile sombre.
  const candidates = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (isProtected(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const text = (el.textContent || '').trim();
    const name = (el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '');
    const isDialog = el.getAttribute('role') === 'dialog' || el.getAttribute('aria-modal') === 'true' || el.tagName === 'DIALOG';
    const looksCookie = cookieRe.test(text.slice(0, 600)) && text.length < 4000;
    const looksOverlay = overlayRe.test(name) && !structuralTags.has(el.tagName);
    if (isDialog || looksCookie || looksOverlay) candidates.push(el);
  }
  for (let el of candidates) {
    if (!el.isConnected) continue;
    const len = (el.textContent || '').trim().length;
    let top = el;
    while (top.parentElement && !isProtected(top.parentElement) && (top.parentElement.textContent || '').trim().length === len) {
      top = top.parentElement;
    }
    remove(top);
  }

  // 3. Les CMP verrouillent souvent le scroll : sans ça, la capture pleine
  //    page se limite à un écran.
  for (const el of [document.documentElement, document.body]) {
    el.style.setProperty('overflow', 'visible', 'important');
    el.style.setProperty('height', 'auto', 'important');
    el.style.setProperty('position', 'static', 'important');
  }
  document.querySelectorAll('video').forEach((v) => { v.removeAttribute('controls'); });
  return removed;
}

// Remplace les vidéos par une image (frame courante via canvas, sinon poster)
// et les iframes YouTube par la miniature officielle de la vidéo, dans la
// même boîte. Une vidéo cross-origin sans poster est laissée en place.
function freezeMediaInBrowser() {
  const cloneBox = (from, to) => {
    for (const a of ['class', 'id', 'style', 'width', 'height']) {
      if (from.hasAttribute(a)) to.setAttribute(a, from.getAttribute(a));
    }
    if (!from.getAttribute('style') && !from.hasAttribute('width')) {
      const r = from.getBoundingClientRect();
      to.style.width = r.width + 'px';
      to.style.height = r.height + 'px';
    }
    to.style.setProperty('object-fit', 'cover');
  };
  let frozen = 0;
  document.querySelectorAll('video').forEach((v) => {
    let src = null;
    try {
      if (v.readyState >= 2 && v.videoWidth > 0) {
        // Une frame uniforme (noire : vidéo non décodée côté serveur) ne vaut
        // rien, on préfère alors le poster.
        const probe = document.createElement('canvas');
        probe.width = 32;
        probe.height = 18;
        const pctx = probe.getContext('2d');
        pctx.drawImage(v, 0, 0, 32, 18);
        const d = pctx.getImageData(0, 0, 32, 18).data;
        let sum = 0;
        let sum2 = 0;
        for (let i = 0; i < d.length; i += 4) {
          const l = (d[i] + d[i + 1] + d[i + 2]) / 3;
          sum += l;
          sum2 += l * l;
        }
        const n = d.length / 4;
        const std = Math.sqrt(Math.max(0, sum2 / n - (sum / n) ** 2));
        if (std > 2) {
          const c = document.createElement('canvas');
          c.width = v.videoWidth;
          c.height = v.videoHeight;
          c.getContext('2d').drawImage(v, 0, 0);
          src = c.toDataURL('image/jpeg', 0.85);
        }
      }
    } catch (_) {
      src = null; // canvas « tainted » (vidéo cross-origin)
    }
    if (!src && v.poster) src = v.poster;
    if (!src) return;
    const img = document.createElement('img');
    cloneBox(v, img);
    img.src = src;
    v.replaceWith(img);
    frozen++;
  });
  document.querySelectorAll('iframe').forEach((f) => {
    const m = (f.src || '').match(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{6,})/);
    if (!m) return;
    const img = document.createElement('img');
    cloneBox(f, img);
    img.src = `https://i.ytimg.com/vi/${m[1]}/maxresdefault.jpg`;
    img.onerror = () => { img.onerror = null; img.src = `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`; };
    f.replaceWith(img);
    frozen++;
  });
  return frozen;
}

// Capture par tranches d'écran : on défile, on photographie le viewport, on
// assemble. Les barres fixes/sticky présentes en haut de page (header,
// widgets) sont masquées à partir de la 2e tranche ; les sections épinglées
// pleine hauteur restent visibles, c'est le but.
async function captureStitched(page, sharp, height) {
  const vh = VIEWPORT.height;
  // Jamais moins d'un écran : une tranche ne peut pas dépasser le canevas.
  const H = Math.max(vh, Math.min(height, MAX_PAGE_HEIGHT));
  await page.evaluate((limit) => {
    window.__digiqoBars = [...document.body.querySelectorAll('*')].filter((el) => {
      const p = getComputedStyle(el).position;
      if (p !== 'fixed' && p !== 'sticky') return false;
      return el.getBoundingClientRect().height < limit;
    });
  }, vh * 0.4);
  const slices = [];
  for (let y = 0; y < H; y += vh) {
    const top = Math.min(y, H - vh);
    await page.evaluate((t) => window.scrollTo(0, t), top);
    await page.waitForTimeout(250);
    if (y > 0) {
      await page.evaluate(() => (window.__digiqoBars || []).forEach((el) => el.style.setProperty('visibility', 'hidden', 'important')));
    }
    const buf = await page.screenshot({ type: 'png', animations: 'disabled', caret: 'hide', timeout: 20000 });
    slices.push({ input: buf, top, left: 0 });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return sharp({ create: { width: VIEWPORT.width, height: H, channels: 3, background: '#ffffff' } })
    .composite(slices)
    .jpeg({ quality: 85 })
    .toBuffer();
}

async function scrollThrough(page) {
  // Parcourt la page par pas d'écran pour déclencher lazy-loading et
  // animations au scroll, puis remonte en haut. Borné en pas et en hauteur.
  await page.evaluate(async (maxHeight) => {
    const step = Math.max(400, Math.round(window.innerHeight * 0.8));
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    for (let i = 0; i < 60; i++) {
      const limit = Math.min(document.documentElement.scrollHeight, maxHeight);
      if (y >= limit) break;
      window.scrollTo(0, y);
      await sleep(140);
      y += step;
    }
    window.scrollTo(0, Math.min(document.documentElement.scrollHeight, maxHeight));
    await sleep(300);
    window.scrollTo(0, 0);
    await sleep(500);
  }, MAX_PAGE_HEIGHT);
}

async function captureSite(browser, site) {
  const context = await browser.newContext({ viewport: VIEWPORT, userAgent: UA, locale: 'fr-FR' });
  const page = await context.newPage();
  try {
    const response = await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!response) throw new Error('aucune réponse HTTP');
    if (response.status() >= 400) throw new Error(`HTTP ${response.status()} — capture précédente conservée`);
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1500);

    // Regex passées en [source, flags] : sérialisation sûre vers le navigateur.
    const cleanArgs = {
      selectors: OVERLAY_SELECTORS,
      cookieText: [COOKIE_TEXT.source, COOKIE_TEXT.flags],
      overlayName: [OVERLAY_NAME.source, OVERLAY_NAME.flags],
      neverRemove: [...NEVER_REMOVE],
      structural: [...STRUCTURAL],
    };
    const removed1 = await page.evaluate(cleanPageInBrowser, cleanArgs);
    await scrollThrough(page);
    const removed2 = await page.evaluate(cleanPageInBrowser, cleanArgs);
    const frozen = await page.evaluate(freezeMediaInBrowser);
    await page.waitForTimeout(frozen ? 2000 : 800);

    let sharp = null;
    try { sharp = loadModule('sharp'); } catch (_) { /* JPEG brut en sortie */ }

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const clip = height > MAX_PAGE_HEIGHT ? { x: 0, y: 0, width: VIEWPORT.width, height: MAX_PAGE_HEIGHT } : undefined;
    const shootFullPage = () => page.screenshot({
      fullPage: true,
      clip,
      type: 'jpeg',
      quality: 85,
      animations: 'disabled',
      caret: 'hide',
      timeout: 45000,
    });

    let jpeg = null;
    let mode = 'pleine page';
    try {
      jpeg = await shootFullPage();
    } catch (_) {
      // Une <video> non gelée peut bloquer la capture pleine page : on la
      // retire et on retente une fois.
      await page.evaluate(() => document.querySelectorAll('video').forEach((v) => v.remove()));
      try { jpeg = await shootFullPage(); mode = 'pleine page sans vidéo'; } catch (_) { jpeg = null; }
    }

    const capturedHeight = Math.min(height, MAX_PAGE_HEIGHT);
    const density = jpeg ? jpeg.length / (VIEWPORT.width * capturedHeight) : 0;
    if (sharp && (!jpeg || density < MIN_DENSITY)) {
      try {
        const stitched = await captureStitched(page, sharp, height);
        if (!jpeg || stitched.length > jpeg.length) { jpeg = stitched; mode = 'tranches'; }
      } catch (e) {
        if (!jpeg) throw e;
      }
    }
    if (!jpeg) throw new Error('capture impossible — capture précédente conservée');

    const outPath = path.join(OUTPUT_DIR, `${site.slug}.webp`);
    // sharp absent : on écrit le JPEG tel quel (les navigateurs sniffent le format).
    const bytes = sharp ? await sharp(jpeg).webp({ quality: 80 }).toBuffer() : jpeg;
    fs.writeFileSync(outPath, bytes);
    const removed = [...removed1, ...removed2];
    const notes = [mode, `${capturedHeight}px${clip ? ' tronqué' : ''}`, `${(bytes.length / 1024).toFixed(0)} Ko`];
    if (frozen) notes.push(`${frozen} média figé`);
    if (removed.length) notes.push(`retiré: ${removed.slice(0, 3).join(' ')}`);
    return `✓ ${site.slug} (${notes.join(', ')})`;
  } finally {
    await context.close().catch(() => {});
  }
}

async function main() {
  const { chromium } = loadModule('playwright-core');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox', '--disable-gpu', '--enable-unsafe-swiftshader', '--hide-scrollbars',
      // Les vidéos de hero doivent démarrer pour qu'on ait une frame à figer.
      '--autoplay-policy=no-user-gesture-required',
    ],
  });

  let ok = 0;
  let ko = 0;
  for (const site of sites) {
    try {
      console.log(await captureSite(browser, site));
      ok++;
    } catch (e) {
      ko++;
      console.log(`✗ ${site.slug}: ${String(e.message || e).split('\n')[0].substring(0, 120)}`);
    }
  }
  await browser.close();
  console.log(`\n${ok} capturés, ${ko} conservés tels quels`);

  if (NO_GIT) {
    console.log('[--no-git] aucun commit, aucun push.');
    return;
  }
  if (ok === 0) return;

  // Commit + push uniquement si des fichiers ont réellement changé. On se
  // resynchronise d'abord : après chaque PR mergée sur GitHub, main local est
  // en retard et le push serait rejeté.
  try {
    git(['pull', '--rebase', '--autostash']);
    git(['add', 'public/references/fullpage/']);
    const staged = git(['diff', '--cached', '--stat']).trim();
    if (!staged) {
      console.log('Aucun changement détecté');
      return;
    }
    git(['commit', '-m', 'chore: recapture automatique des screenshots références']);
    git(['push']);
    console.log(`✓ screenshots mis à jour et poussés`);
  } catch (e) {
    console.log(`✗ Erreur git: ${String(e.stderr || e.message).substring(0, 200)}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
