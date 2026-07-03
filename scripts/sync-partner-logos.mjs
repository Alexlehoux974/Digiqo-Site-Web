#!/usr/bin/env node
/**
 * sync-partner-logos.mjs
 * -------------------------------------------------------------------------
 * Synchronise les logos clients depuis le Drive partagé des graphistes vers
 * le bandeau de la home (lib/partners-data.ts + public/partenaires/*.webp).
 *
 * - Auth via compte de service Google (clé JSON hors dépôt).
 * - Liste le dossier Drive (Shared Drive => supportsAllDrives).
 * - Détecte les clients ABSENTS de partners-data.ts (dédup par tokens + Levenshtein).
 * - Écarte les non-logos (notre propre logo, fichiers sans nom, mockups).
 * - Télécharge le meilleur fichier par client, convertit en WebP carré 1024
 *   (PNG => fond transparent ; JPEG => fond blanc, comme la carte du bandeau).
 * - Injecte les entrées dans partners-data.ts.
 *
 * Usage:
 *   node scripts/sync-partner-logos.mjs --dry-run   # rapport seul, n'écrit rien
 *   node scripts/sync-partner-logos.mjs             # importe + met à jour les fichiers
 *
 * Idempotent : relancer n'ajoute que les nouveaux clients. Utilisé aussi par
 * la routine hebdomadaire.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const KEY = process.env.DRIVE_SA_KEY || '/root/.config/digiqo/drive-sa.json'
const FOLDER_ID = process.env.DRIVE_LOGOS_FOLDER || '1SoFgI6Fib2eYgFOGVN1qD2DSnO-yLxxK'
const PARTNERS = path.join(ROOT, 'lib/partners-data.ts')
const PUBLIC_DIR = path.join(ROOT, 'public/partenaires')
const SCOPE = 'https://www.googleapis.com/auth/drive.readonly'
const DRY = process.argv.includes('--dry-run')

// ---------- Google SA auth (zéro dépendance) ----------
const b64url = (b) => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
async function getToken(sa) {
  const now = Math.floor(Date.now() / 1000)
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64url(JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: sa.token_uri, iat: now, exp: now + 3600 }))
  const sig = b64url(crypto.sign('RSA-SHA256', Buffer.from(`${head}.${claim}`), sa.private_key))
  const res = await fetch(sa.token_uri, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${claim}.${sig}` }) })
  const d = await res.json()
  if (!res.ok) throw new Error('Auth SA échouée: ' + JSON.stringify(d))
  return d.access_token
}
async function listFolder(tok) {
  const files = []; let pageToken = null
  do {
    const p = new URLSearchParams({ q: `'${FOLDER_ID}' in parents and trashed = false`, fields: 'nextPageToken, files(id,name,mimeType,size)', pageSize: '1000', supportsAllDrives: 'true', includeItemsFromAllDrives: 'true', corpora: 'allDrives' })
    if (pageToken) p.set('pageToken', pageToken)
    const res = await fetch('https://www.googleapis.com/drive/v3/files?' + p, { headers: { Authorization: 'Bearer ' + tok } })
    const d = await res.json()
    if (!res.ok) throw new Error('List échouée: ' + JSON.stringify(d))
    files.push(...(d.files || [])); pageToken = d.nextPageToken
  } while (pageToken)
  return files
}
async function download(tok, id) {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media&supportsAllDrives=true`, { headers: { Authorization: 'Bearer ' + tok } })
  if (!res.ok) throw new Error('Download échoué (' + res.status + ')')
  return Buffer.from(await res.arrayBuffer())
}

// ---------- normalisation / matching ----------
const STOP = new Set(['de', 'd', 'la', 'le', 'les', 'du', 'des', 'l', 'a', 'au', 'aux', 'et', 'the', 'by', 'un', 'une', 'oi', 'sarl', 'sas'])
const DROP = new Set(['logo', 'logos', 'final', 'def', 'hd', 'rvb', 'cmjn', 'fond', 'blanc', 'noir', 'copie', 'copy', 'new', 'imac', 'mockup', 'version', 'png'])
const toks = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\.(png|jpe?g|webp|svg)$/ig, '').replace(/[-_]?\d{3,4}x\d{3,4}/g, '').replace(/&/g, ' ').split(/[^a-z0-9]+/).filter(t => t && t.length >= 2 && !STOP.has(t) && !DROP.has(t) && !/^v\d+$/.test(t))
const compact = (s) => toks(s).join('')
const inter = (a, b) => [...a].filter(x => b.has(x)).length
const subset = (a, b) => [...a].every(x => b.has(x))
function lev(a, b) { const m = a.length, n = b.length; const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]); for (let j = 0; j <= n; j++) dp[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return dp[m][n] }

const VOWEL = /[aeiouyàâäéèêëîïôöùûü]/i
function titleName(src) {
  const base = src.replace(/\.(png|jpe?g|webp|svg)$/ig, '').replace(/\.(png|jpe?g|webp)$/ig, '').replace(/_+$/, '').replace(/\s+V\d+$/i, '').replace(/\s{2,}/g, ' ').trim()
  return base.split(/\s+/).map(w => {
    const clean = w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
    if (clean.length <= 4 && clean === clean.toUpperCase() && !VOWEL.test(clean)) return w // acronyme sans voyelle -> tel quel
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  }).join(' ')
}
const slug = (name) => name.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const JUNK = /^(digiqo|unnamed|marketing facile)/i
// Fichiers qui ne sont PAS des logos (photos, affiches d'événement) — à ne jamais publier.
// Ajouter ici les cas repérés visuellement ; la routine hebdo les ignorera durablement.
const NONLOGO = /^(\s*cousin\s*cousine|el\s*latino|fifie|ravine\s*sonore)/i
const rank = { 'image/png': 3, 'image/webp': 2, 'image/jpeg': 1, 'image/jpg': 1 }
const pickBest = (files) => [...files].sort((a, b) => (rank[b.mimeType] || 0) - (rank[a.mimeType] || 0) || (+b.size) - (+a.size))[0]

function computeNew(drive, src) {
  const names = [...src.matchAll(/name:\s*"([^"]+)"/g)].map(m => m[1])
  const fnames = [...src.matchAll(/filename:\s*"([^"]+)"/g)].map(m => m[1])
  const exist = [...names, ...fnames].map(n => ({ set: new Set(toks(n)), c: compact(n) })).filter(e => e.c)
  const existFilesUpper = new Set(fnames.map(f => f.toUpperCase()))
  const isPresent = (name) => {
    const dt = new Set(toks(name)), dc = compact(name)
    if (dc.length < 2) return true
    for (const e of exist) {
      if (e.c === dc) return true
      if (dc.length >= 5 && e.c.length >= 5 && (e.c.includes(dc) || dc.includes(e.c))) return true
      if (inter(dt, e.set) >= 1 && (subset(dt, e.set) || subset(e.set, dt)) && [...dt].some(x => x.length >= 4 && e.set.has(x))) return true
      if (dc.length >= 6 && e.c.length >= 6 && lev(dc, e.c) <= 2) return true
    }
    return false
  }
  const groups = new Map()
  for (const f of drive) { const k = compact(f.name) || f.name.toLowerCase(); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(f) }
  const usedSlugs = new Set(), records = [], skippedJunk = []
  for (const [, files] of groups) {
    if (files.some(f => JUNK.test(f.name) || NONLOGO.test(f.name))) { skippedJunk.push(files[0].name); continue }
    if (files.some(f => isPresent(f.name))) continue
    const best = pickBest(files)
    const name = titleName(best.name)
    let b = slug(name), fn = b + '-1024x1024.webp', i = 2
    while (usedSlugs.has(fn.toUpperCase()) || existFilesUpper.has(fn.toUpperCase())) { fn = `${b}-${i}-1024x1024.webp`; i++ }
    usedSlugs.add(fn.toUpperCase())
    records.push({ name, filename: fn, alt: `${name} — client de Digiqo, agence de marketing digital`, fileId: best.id, sourceName: best.name, mimeType: best.mimeType })
  }
  records.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  return { records, skippedJunk }
}

async function toWebp(buf, mime) {
  const transparent = mime.includes('png') || mime.includes('webp')
  const bg = transparent ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 1 }
  const build = (doTrim) => {
    let s = sharp(buf, { failOn: 'none' })
    if (doTrim) s = s.trim({ threshold: 12 })
    return s.resize(1024, 1024, { fit: 'contain', background: bg }).webp({ quality: 90 }).toBuffer()
  }
  try { return await build(true) } catch { return await build(false) }
}

function inject(src, records) {
  const anchor = '\n]\n\n// Fonction pour obtenir les partenaires par batch'
  const idx = src.indexOf(anchor)
  if (idx < 0) throw new Error("Point d'insertion introuvable dans partners-data.ts")
  const blocks = records.map(r => `  {\n    name: ${JSON.stringify(r.name)},\n    filename: ${JSON.stringify(r.filename)},\n    alt: ${JSON.stringify(r.alt)}\n  }`)
  return src.slice(0, idx) + ',\n' + blocks.join(',\n') + anchor
}

// ---------- main ----------
const sa = JSON.parse(readFileSync(KEY, 'utf8'))
const tok = await getToken(sa)
const drive = await listFolder(tok)
const src = readFileSync(PARTNERS, 'utf8')
const { records, skippedJunk } = computeNew(drive, src)

console.log(`Drive: ${drive.length} fichiers | non-logos écartés: ${skippedJunk.length} | NOUVEAUX clients: ${records.length}`)
if (DRY) {
  records.forEach((r, i) => console.log(`${String(i + 1).padStart(2)}. ${r.name}  ->  ${r.filename}  [${r.mimeType.replace('image/', '')}]`))
  console.log('\n(dry-run : rien écrit)')
  process.exit(0)
}
if (!records.length) { console.log('Rien de nouveau. ✔'); process.exit(0) }

let ok = 0; const failures = []
for (const r of records) {
  const dest = path.join(PUBLIC_DIR, r.filename)
  try {
    if (!existsSync(dest)) {
      const raw = await download(tok, r.fileId)
      const webp = await toWebp(raw, r.mimeType)
      writeFileSync(dest, webp)
    }
    ok++
    process.stdout.write(`\r  prêt ${ok}/${records.length}  (${r.filename})           `)
  } catch (e) { failures.push({ name: r.name, err: e.message }) }
}
console.log('')
const written = records.filter(r => existsSync(path.join(PUBLIC_DIR, r.filename)))
const updated = inject(src, written)
writeFileSync(PARTNERS, updated)
console.log(`✅ ${ok} logos convertis, ${written.length} entrées ajoutées à partners-data.ts`)
if (failures.length) { console.log(`⚠️ ${failures.length} échecs:`); failures.forEach(f => console.log(`   - ${f.name}: ${f.err}`)) }
