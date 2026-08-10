// Source de données de la section « Nos réalisations vidéo » de la home.
//
// SERVER-ONLY. Ce module lit YOUTUBE_API_KEY (la clé couvre aussi Drive API) :
// il ne doit être importé que depuis un getStaticProps (Next retire
// getStaticProps et ses imports exclusifs du bundle client). Le carrousel
// n'en importe que des *types* (`import type`), effacés à la compilation.
//
// Les vidéos sont listées depuis le dossier Drive partagé des réalisations.
// Le nom affiché et la miniature viennent d'une table de correspondance bâtie
// sur l'ancienne liste codée en dur (lib/client-videos.ts + VIDEO_THUMBS) :
// un fichier connu garde exactement son libellé et sa miniature locale, un
// nouveau fichier s'affiche avec son nom dérivé et la miniature Drive.
//
// La correspondance se fait d'abord sur l'id Drive (client-videos.ts le stocke
// déjà dans `src`) — insensible aux renommages, et les noms de fichiers
// portent des typos (INSTITUTDBSEANCE, VANILE…). Le nom normalisé sert de
// secours si un fichier est réuploadé sous un nouvel id.

import { clientVideos } from './client-videos'

export interface ClientVideoItem {
  /** Libellé affiché sous le mockup iPhone. */
  clientName: string
  alt: string
  /** URL Drive au format historique — le modal en extrait l'id pour /preview. */
  src: string
  /** Miniature résolue côté serveur : WebP local si connue, sinon Drive. */
  thumb: string
}

// Miniatures locales des réalisations, indexées par libellé client.
// Historiquement définies inline dans pages/index.tsx.
const VIDEO_THUMBS: Record<string, string> = {
  "CÔTE SEINE": "/references/video-thumbs/cote-seine.webp",
  "NOMAD": "/references/video-thumbs/nomad.webp",
  "TWINS DESIGN": "/references/video-thumbs/twins-design.webp",
  "VEILLE À NÔU": "/references/video-thumbs/veille-a-nou.webp",
  "C BIEN GLACÉ": "/references/video-thumbs/c-bien-glace.webp",
  "DERMA JOLIE": "/references/video-thumbs/derma-jolie.webp",
  "CULINARION": "/references/video-thumbs/culinarion.webp",
  "AGENCE CENTRALE DE L'OR": "/references/video-thumbs/agence-centrale-or.webp",
  "ASI TECHNOLOGIE": "/references/video-thumbs/asi-technologie.webp",
  "BURO": "/references/video-thumbs/buro.webp",
  "EDEN DU RANDONNEUR": "/references/video-thumbs/eden-randonneur.webp",
  "GARAGE FCSA": "/references/video-thumbs/garage-fcsa.webp",
  "GLOBAL SERVICE": "/references/video-thumbs/global-service.webp",
  "INTÉRIEURS PRIVÉS": "/references/video-thumbs/interieurs-prives.webp",
  "LA PART DES ANGES": "/references/video-thumbs/la-part-des-anges.webp",
  "LADRESS": "/references/video-thumbs/ladress.webp",
  "LE GOÛT DU VIN": "/references/video-thumbs/le-gout-du-vin.webp",
  "LELINGE.RE": "/references/video-thumbs/lelinge.webp",
  "LES CAFÉS D'ITALIE": "/references/video-thumbs/les-cafes-ditalie.webp",
  "LITTLE LIBELULLE": "/references/video-thumbs/little-libellule.webp",
  "ONE-MARKET": "/references/video-thumbs/one-market.webp",
  "PASS-XP": "/references/video-thumbs/pass-xp.webp",
  "PÊCHE PASSION": "/references/video-thumbs/peche-passion.webp",
  "POKAWA": "/references/video-thumbs/pokawa.webp",
  "SAM CONCEPT HABITAT": "/references/video-thumbs/sam-concept-habitat.webp",
  "CAVAVIN": "/references/video-thumbs/cavavin.webp",
  "COPEAUX D'ABORD": "/references/video-thumbs/copeaux-dabord.webp",
  "DORCEL": "/references/video-thumbs/dorcel.webp",
  "ÉMULSION 2": "/references/video-thumbs/emulsion.webp",
  "EN L'AIR PIED BOIS": "/references/video-thumbs/en-lair-pied-bois.webp",
  "HÉRACLES COACHING": "/references/video-thumbs/heracles-coaching.webp",
  "INSTITUT DESBEANCE": "/references/video-thumbs/institut-desbeance.webp",
  "LILOO BEAUTY": "/references/video-thumbs/liloo-beauty.webp",
  "PAPANG": "/references/video-thumbs/papang.webp",
  "ULM": "/references/video-thumbs/ulm.webp",
  "VANILLE JEU-CONCOURS": "/references/video-thumbs/vanille-jeu-concours.webp",
}

// Clé de rapprochement nom de fichier Drive ↔ liste historique : minuscules,
// sans accents, sans ponctuation ni espaces. « Côte Seine », « COTE_SEINE.mp4 »
// et « cote-seine » collent.
function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

// « CÔTE_SEINE_V2.mp4 » → « CÔTE SEINE V2 ».
function displayNameFromFile(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

interface DriveFile {
  id?: string
  name?: string
}

interface KnownVideo {
  clientName: string
  alt: string
  thumb: string
  /** Rang dans la liste historique, pour préserver l'ordre du carrousel. */
  order: number
}

// Id Drive porté par le `src` historique (…/uc?export=download&id=<fileId>).
function fileIdFromSrc(src: string): string | undefined {
  return src.match(/[?&]id=([^&]+)/)?.[1]
}

// Tables de correspondance : un fichier Drive connu garde le libellé et la
// miniature locale d'origine. Bâties une fois au chargement.
const KNOWN_BY_ID = new Map<string, KnownVideo>()
const KNOWN_BY_NAME = new Map<string, KnownVideo>()

clientVideos.forEach((video, order) => {
  const thumb = VIDEO_THUMBS[video.clientName]
  if (!thumb) return
  const entry: KnownVideo = { clientName: video.clientName, alt: video.alt, thumb, order }
  const fileId = fileIdFromSrc(video.src)
  if (fileId) KNOWN_BY_ID.set(fileId, entry)
  KNOWN_BY_NAME.set(normalizeName(video.clientName), entry)
})

// Liste servie tant que l'API Drive n'est pas joignable (clé/dossier absents,
// quota, panne) : strictement le rendu d'avant la bascule dynamique.
const STATIC_FALLBACK: ClientVideoItem[] = clientVideos.flatMap((video) => {
  const thumb = VIDEO_THUMBS[video.clientName]
  if (!thumb) return []
  return [{ clientName: video.clientName, alt: video.alt, src: video.src, thumb }]
})

// files.list sur le dossier partagé, pagination via nextPageToken.
// ~41 vidéos aujourd'hui → 1 page. Garde-fou à 20 pages.
async function fetchDriveFiles(folderId: string, apiKey: string): Promise<DriveFile[]> {
  const files: DriveFile[] = []
  let pageToken: string | undefined
  let pages = 0

  do {
    const url = new URL('https://www.googleapis.com/drive/v3/files')
    url.searchParams.set('q', `'${folderId}' in parents and trashed=false and mimeType contains 'video/'`)
    url.searchParams.set('fields', 'nextPageToken,files(id,name)')
    url.searchParams.set('orderBy', 'name')
    url.searchParams.set('pageSize', '200')
    // Le dossier vit dans un Drive partagé.
    url.searchParams.set('supportsAllDrives', 'true')
    url.searchParams.set('includeItemsFromAllDrives', 'true')
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const response = await fetch(url.toString())
    if (!response.ok) {
      // Ne jamais laisser fuiter l'URL (elle contient la clé) dans les logs.
      throw new Error(`Drive API error: ${response.status}`)
    }

    const data = await response.json()
    if (Array.isArray(data.files)) files.push(...data.files)
    pageToken = data.nextPageToken
    pages++
  } while (pageToken && pages < 20)

  return files
}

/**
 * Renvoie les réalisations vidéo pour la home. Ne lève jamais : en cas
 * d'erreur API, de quota dépassé ou de variable d'env absente, renvoie la
 * dernière liste connue (fallback statique) et le carrousel reste identique.
 */
export async function getClientVideos(): Promise<ClientVideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const folderId = process.env.DRIVE_REALISATIONS_FOLDER_ID

  if (!apiKey || !folderId) {
    console.warn('[realisations] YOUTUBE_API_KEY / DRIVE_REALISATIONS_FOLDER_ID absents — liste statique')
    return STATIC_FALLBACK
  }

  try {
    const files = await fetchDriveFiles(folderId, apiKey)
    if (files.length === 0) {
      console.warn('[realisations] Dossier Drive vide — liste statique conservée')
      return STATIC_FALLBACK
    }

    const videos = files
      .filter((file): file is Required<DriveFile> => !!file.id && !!file.name)
      .map((file) => {
        const derived = displayNameFromFile(file.name)
        const known = KNOWN_BY_ID.get(file.id) ?? KNOWN_BY_NAME.get(normalizeName(derived))

        return {
          item: {
            clientName: known?.clientName ?? derived,
            alt: known?.alt ?? `Vidéo publicitaire ${derived}`,
            // Format historique : le modal en extrait l'id pour /preview.
            src: `https://drive.google.com/uc?export=download&id=${file.id}`,
            // thumbnailLink de l'API expire — cette URL est stable.
            thumb: known?.thumb ?? `https://drive.google.com/thumbnail?id=${file.id}&sz=w640`,
          },
          // Les vidéos connues gardent leur rang d'origine, les nouvelles
          // s'ajoutent à la suite dans l'ordre alphabétique renvoyé par Drive.
          order: known?.order ?? Number.MAX_SAFE_INTEGER,
        }
      })

    return videos
      .map((entry, index) => ({ ...entry, index }))
      .sort((a, b) => a.order - b.order || a.index - b.index)
      .map((entry) => entry.item)
  } catch (error) {
    console.error('[realisations] Drive indisponible, liste statique conservée:', error)
    return STATIC_FALLBACK
  }
}
