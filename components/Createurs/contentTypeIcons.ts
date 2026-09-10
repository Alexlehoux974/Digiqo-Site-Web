import {
  Camera, Clapperboard, Image as ImageIcon, Mic, PenLine, Play, Video, Zap,
} from 'lucide-react'

// Icône par format de contenu, partagée entre le panneau détail et la fiche
// publique : les deux doivent parler le même langage visuel.
// Un format inconnu retombe sur `Camera` côté appelant plutôt que de disparaître.
export const contentTypeIcons: Record<string, typeof Play> = {
  'Reels': Video,
  'Stories': Play,
  'Posts': ImageIcon,
  'UGC': Camera,
  'Lives': Zap,
  'TikTok': Video,
  // Formats issus du vocabulaire Airtable (formulaire d'inscription).
  'Vidéo longue': Video,
  'Face cam': Camera,
  'Micro-trottoir': Mic,
  'Vlog': Video,
  'Montage vidéo': Clapperboard,
  'Rédaction': PenLine,
  'Visuels / Graphisme': ImageIcon,
}
