// Visuels locaux du carrousel de /services/creatifs (/public/visuel-client).
//
// Servis tant que l'API Drive n'est pas joignable (clé/dossier absents, quota,
// panne) : strictement le rendu d'avant la bascule dynamique, dans son ordre
// d'origine. Module de données pur — importable côté client comme serveur.

export interface CreatifImage {
  src: string
  alt: string
}

// « SweetJab_crosstraining_9x16.png » → « SweetJab crosstraining 9x16 ».
export function displayNameFromFile(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function altFromFile(fileName: string): string {
  return `Créatif publicitaire ${displayNameFromFile(fileName)}`
}

const LOCAL_FILES = [
  'story-01.webp',
  'story-02.webp',
  'story-03.webp',
  'story-04.webp',
  'story-05.webp',
  'story-06.webp',
  'story-07.webp',
  'story-08.webp',
  'visuel-9x16.webp',
  'piton-fougere-9x16.webp',
  'sweetjab-crosstraining-9x16.webp',
  'yoga-lechoka-9x16.webp',
  'paragraphe-story-01.webp',
  'alliance-nord-optique.webp',
  'allovapeur.webp',
  'el-latino-strip.webp',
  'fayarun.webp',
]

export const LOCAL_CREATIFS: CreatifImage[] = LOCAL_FILES.map((file) => ({
  src: `/visuel-client/${file}`,
  alt: altFromFile(file),
}))
