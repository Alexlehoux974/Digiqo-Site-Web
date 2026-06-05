#!/usr/bin/env node
/**
 * Vérifie que tous les sites de la page Références (services/sites-web) sont encore en ligne.
 * Source de vérité : data/web-references.json
 *
 * Comportement :
 *  - Un site qui ne répond plus est ARCHIVÉ (archived: true) → il reste dans le JSON
 *    mais n'est plus affiché sur le site (le composant filtre les archivés).
 *  - Un site archivé qui répond à nouveau est RÉACTIVÉ (archived: false) automatiquement.
 *  - Anti-faux-positif : un site doit échouer 2 passages consécutifs avant d'être archivé
 *    (champ consecutiveFailures), et chaque passage tente l'URL jusqu'à 3 fois.
 *  - Le script commit + push uniquement si le JSON a changé.
 *
 * Usage : node scripts/check-references.js
 *   --dry-run  : vérifie et affiche le résultat sans écrire ni pousser
 *
 * Conçu pour être lancé régulièrement (cron / agent planifié).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function git(args) {
  return execFileSync('git', args, { cwd: PROJECT_ROOT }).toString();
}

const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_FILE = path.join(PROJECT_ROOT, 'data', 'web-references.json');
const DRY_RUN = process.argv.includes('--dry-run');

const ARCHIVE_AFTER = 2;      // passages consécutifs hors ligne avant archivage
const ATTEMPTS_PER_RUN = 3;   // tentatives par passage
const TIMEOUT_MS = 20000;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 DigiqoRefChecker/1.0';

function nowISO() {
  return new Date().toISOString();
}

async function probe(url) {
  // En ligne = on obtient une réponse HTTP avec status < 500.
  // Hors ligne = erreur réseau (DNS, refus, timeout) ou erreur serveur 5xx, sur toutes les tentatives.
  let lastInfo = 'aucune réponse';
  for (let i = 0; i < ATTEMPTS_PER_RUN; i++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': UA, Accept: 'text/html,*/*' },
      });
      clearTimeout(t);
      if (res.status < 500) {
        return { online: true, status: res.status };
      }
      lastInfo = `HTTP ${res.status}`;
    } catch (e) {
      clearTimeout(t);
      lastInfo = (e && e.cause && e.cause.code) || (e && e.name) || String(e);
    }
    // petite pause entre tentatives
    await new Promise((r) => setTimeout(r, 1500));
  }
  return { online: false, status: lastInfo };
}

async function main() {
  const refs = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const archivedNow = [];
  const reactivatedNow = [];
  const stillDown = [];

  for (const ref of refs) {
    const result = await probe(ref.url);
    ref.lastChecked = nowISO();
    ref.lastStatus = String(result.status);

    if (result.online) {
      ref.lastOnline = nowISO();
      ref.consecutiveFailures = 0;
      if (ref.archived) {
        ref.archived = false;
        reactivatedNow.push(ref.name);
        console.log(`↑ RÉACTIVÉ  ${ref.name} (${ref.url}) → de nouveau en ligne [${result.status}]`);
      } else {
        console.log(`✓ en ligne  ${ref.name} [${result.status}]`);
      }
    } else {
      ref.consecutiveFailures = (ref.consecutiveFailures || 0) + 1;
      if (!ref.archived && ref.consecutiveFailures >= ARCHIVE_AFTER) {
        ref.archived = true;
        archivedNow.push(ref.name);
        console.log(`✗ ARCHIVÉ   ${ref.name} (${ref.url}) → hors ligne ${ref.consecutiveFailures}× [${result.status}]`);
      } else if (ref.archived) {
        console.log(`· archivé   ${ref.name} → toujours hors ligne [${result.status}]`);
      } else {
        stillDown.push(ref.name);
        console.log(`! instable  ${ref.name} → hors ligne ${ref.consecutiveFailures}/${ARCHIVE_AFTER} [${result.status}] (pas encore archivé)`);
      }
    }
  }

  const json = JSON.stringify(refs, null, 2) + '\n';
  console.log('\n--- Résumé ---');
  console.log(`Total: ${refs.length} | affichés: ${refs.filter((r) => !r.archived).length} | archivés: ${refs.filter((r) => r.archived).length}`);
  if (archivedNow.length) console.log(`Nouveaux archivés: ${archivedNow.join(', ')}`);
  if (reactivatedNow.length) console.log(`Réactivés: ${reactivatedNow.join(', ')}`);
  if (stillDown.length) console.log(`En surveillance (1 échec): ${stillDown.join(', ')}`);

  if (DRY_RUN) {
    console.log('\n[dry-run] aucune écriture, aucun push.');
    return;
  }

  fs.writeFileSync(DATA_FILE, json);

  // Commit + push uniquement si le fichier a réellement changé.
  try {
    git(['add', 'data/web-references.json']);
    const staged = git(['diff', '--cached', '--stat']).trim();
    if (!staged) {
      console.log('\nAucun changement à pousser.');
      return;
    }
    const parts = [];
    if (archivedNow.length) parts.push(`archive ${archivedNow.join(', ')}`);
    if (reactivatedNow.length) parts.push(`réactive ${reactivatedNow.join(', ')}`);
    const summary = parts.length ? parts.join(' ; ') : 'maj statuts références';
    git(['commit', '-m', 'chore(references): ' + summary]);
    git(['push']);
    console.log('\n✓ Changements poussés.');
  } catch (e) {
    console.log(`\n✗ Erreur git: ${String(e.message || e).substring(0, 200)}`);
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
