#!/usr/bin/env node
/**
 * Recapture full-page screenshots of all reference sites.
 * Usage: node scripts/recapture-references.js
 * Auto-commits and pushes if any screenshots changed.
 */

const { chromium } = require('playwright-core');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'references', 'fullpage');

const sites = [
  { name: 'sogitec-energie-fr', url: 'https://sogitec-energie.fr' },
  { name: 'laboussoledumanager-re', url: 'https://laboussoledumanager.re' },
  { name: 'pascal-destercke-com', url: 'https://pascal-destercke.com' },
  { name: 'velocit-ai-fr', url: 'https://velocit-ai.fr' },
  { name: 'monster-phone-re', url: 'https://monster-phone.re' },
  { name: 'parapente-reunion-fr', url: 'https://parapente-reunion.fr' },
  { name: 'clicknvan-com', url: 'https://clicknvan.com' },
  { name: 'zeneatyoga-com', url: 'https://zeneatyoga.com' },
  { name: 'investis-dom-com', url: 'https://investis-dom.com' },
  { name: 'cmxfactory-com', url: 'https://cmxfactory.com' },
  { name: 'sattwika-com', url: 'https://sattwika.com' },
];

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-gpu', '--enable-unsafe-swiftshader'],
  });

  let changed = 0;

  for (const site of sites) {
    try {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() =>
        page.goto(site.url, { waitUntil: 'load', timeout: 15000 })
      );
      // Remove cookie banners and popups
      await page.evaluate(() => {
        document.querySelectorAll(
          '[class*="cookie"], [class*="consent"], [id*="cookie"], [id*="consent"], [class*="popup"], [class*="modal"], [class*="banner"], dialog[open]'
        ).forEach(el => el.remove());
      });
      await page.waitForTimeout(1500);

      const outPath = path.join(OUTPUT_DIR, `${site.name}.webp`);
      await page.screenshot({
        path: outPath,
        fullPage: true,
        type: 'jpeg',
        quality: 80,
        timeout: 45000,
      });
      changed++;
      console.log(`✓ ${site.name}`);
      await page.close();
    } catch (e) {
      console.log(`✗ ${site.name}: ${e.message.substring(0, 80)}`);
    }
  }

  await browser.close();

  // Auto-commit and push if there are changes
  if (changed > 0) {
    try {
      const projectRoot = path.join(__dirname, '..');
      execSync('git add public/references/fullpage/', { cwd: projectRoot });
      const diff = execSync('git diff --cached --stat', { cwd: projectRoot }).toString().trim();
      if (diff) {
        execSync(
          `git commit -m "chore: recapture automatique des screenshots références"`,
          { cwd: projectRoot }
        );
        execSync('git push', { cwd: projectRoot });
        console.log(`\n✓ ${changed} screenshots mis à jour et poussés`);
      } else {
        console.log('\nAucun changement détecté');
      }
    } catch (e) {
      console.log(`\n✗ Erreur git: ${e.message.substring(0, 100)}`);
    }
  }
}

capture();
