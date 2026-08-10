// Source de données du carrousel de créatifs de /services/creatifs.
//
// SERVER-ONLY. Ce module lit YOUTUBE_API_KEY (la clé couvre aussi Drive API) :
// il ne doit être importé que depuis un getStaticProps (Next retire
// getStaticProps et ses imports exclusifs du bundle client). Le carrousel
// n'en importe que des *types* (`import type`), effacés à la compilation.
//
// Les visuels sont listés depuis le dossier Drive « CRÉATIFS CLIENTS DIGIQO »,
// désormais source unique : ajouter un créatif = déposer le fichier dans le
// Drive, plus de PR. Aucun libellé n'est affiché sous les images, seul l'alt
// est dérivé du nom de fichier.

import { LOCAL_CREATIFS, altFromFile } from './creatifs-fallback'
import type { CreatifImage } from './creatifs-fallback'

export type { CreatifImage }

interface DriveFile {
  id?: string
  name?: string
}

// files.list sur le dossier partagé, pagination via nextPageToken.
// 17 visuels aujourd'hui → 1 page. Garde-fou à 20 pages.
async function fetchDriveFiles(folderId: string, apiKey: string): Promise<DriveFile[]> {
  const files: DriveFile[] = []
  let pageToken: string | undefined
  let pages = 0

  do {
    const url = new URL('https://www.googleapis.com/drive/v3/files')
    url.searchParams.set('q', `'${folderId}' in parents and trashed=false and mimeType contains 'image/'`)
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
 * Renvoie les créatifs du carrousel de /services/creatifs. Ne lève jamais :
 * en cas d'erreur API, de quota dépassé ou de variable d'env absente, renvoie
 * les visuels locaux et le carrousel reste identique.
 */
export async function getCreatifImages(): Promise<CreatifImage[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const folderId = process.env.DRIVE_CREATIFS_FOLDER_ID

  if (!apiKey || !folderId) {
    console.warn('[creatifs] YOUTUBE_API_KEY / DRIVE_CREATIFS_FOLDER_ID absents — visuels locaux')
    return LOCAL_CREATIFS
  }

  try {
    const files = await fetchDriveFiles(folderId, apiKey)
    const images = files
      .filter((file): file is Required<DriveFile> => !!file.id && !!file.name)
      .map((file) => ({
        // thumbnailLink de l'API expire — cette URL est stable.
        // Vignettes affichées en 144-192 px de large : w600 couvre le 2x
        // sans télécharger les 1-2 Mo des originaux.
        src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w600`,
        alt: altFromFile(file.name),
      }))

    if (images.length === 0) {
      console.warn('[creatifs] Dossier Drive vide — visuels locaux conservés')
      return LOCAL_CREATIFS
    }

    return images
  } catch (error) {
    console.error('[creatifs] Drive indisponible, visuels locaux conservés:', error)
    return LOCAL_CREATIFS
  }
}
