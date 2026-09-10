import type { Influencer } from './types'

// ──────────────────────────────────────────────
// FICHES CRÉATEURS — source de vérité actuelle.
// Extrait tel quel de pages/createurs.tsx (aucune donnée modifiée).
// Les fiches `pending` ne sont pas affichées (accord créatrice en attente).
// ──────────────────────────────────────────────

type CreatorSeed = Omit<Influencer, 'slug' | 'firstName' | 'city' | 'niveau' | 'categorie' | 'genre'>

const SEEDS: CreatorSeed[] = [
  {
    name: 'Ophélie Le Houx',
    handle: '@op_lehoux',
    photo: '/assets/createurs/ophelie-lehoux.jpg',
    location: 'La Réunion — Paris',
    niches: ['Cheveux bouclés', 'Curly hair', 'Hygiène', 'Sport'],
    bio: 'Créatrice de contenu spécialisée dans les cheveux bouclés (curly hair). Son authenticité et son énergie captivent une communauté engagée entre La Réunion et Paris.',
    instagram: {
      url: 'https://www.instagram.com/op_lehoux/',
      followers: '16,4K',
      engagement: '2,4%',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@op_lehoux',
      followers: '7,4K',
      engagement: '0,8%',
    },
    contentTypes: ['Reels', 'Stories', 'Posts', 'UGC'],
    featured: true,
  },
  {
    name: 'Maé Jeanne-Rose',
    handle: '@mae.jr974',
    photo: '/assets/createurs/mae-jeanne-rose.jpg',
    location: 'La Réunion — Lyon',
    niches: ['Lifestyle', 'Voyage', 'Mode', 'Beauté', 'Sport', 'Activités touristiques', 'Podcast'],
    bio: 'Créatrice de contenu spécialisée dans la valorisation de la culture réunionnaise, qui a su fédérer une communauté de plus de 113 000 abonnés (TikTok + Instagram) depuis janvier 2024 à travers des contenus immersifs autour des traditions, de la gastronomie, des paysages et du mode de vie sur l\u2019île de la Réunion.',
    instagram: {
      url: 'https://www.instagram.com/mae.jr974/',
      followers: '40,6K',
      engagement: '10,4%',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@mae.jr974',
      followers: '77,8K',
      engagement: '3,4%',
    },
    contentTypes: ['Reels', 'Posts', 'Stories', 'UGC'],
    featured: true,
  },
  {
    // ⏳ En attente de l'accord de la créatrice — pending: true → non affiché.
    // Pour publier : retirer `pending: true` et compléter les chiffres ci-dessous.
    name: 'Kerry',
    handle: '@adventuresofkerry',
    photo: '/assets/createurs/kerry.jpg',
    location: 'À définir',
    niches: ['Voyage', 'Lifestyle'],
    bio: 'À définir',
    instagram: {
      url: 'https://www.instagram.com/adventuresofkerry/',
      followers: '13,7K',
      engagement: '5,1%',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@kerrymomojou',
      followers: '21,5K',
      engagement: '2,6%',
    },
    contentTypes: ['Reels', 'Posts'],
    pending: true,
  },

  // ──────────────────────────────────────────────
  // Vague 1 — appel à créateurs sept. 2026 (source : Airtable « Créateurs de contenu »)
  // Consentement de publication reçu par mail pour les 4 profils ci-dessous.
  // pending: true tant que les chiffres « À définir » ne sont pas complétés.
  // ──────────────────────────────────────────────
  {
    name: 'Orlane',
    handle: '@orlanila_',
    photo: '/assets/createurs/orlane-orlanila.jpg',
    location: 'La Réunion — toute l’île',
    niches: ['Lifestyle', 'Voyage', 'Food', 'Activités touristiques', 'Musique'],
    bio: 'Orlanila crée du contenu naturel, esthétique et immersif et transforme chaque produit, lieu ou service en une expérience visuelle qui attire l’attention tout en alliant créativité et stratégie de communication.',
    instagram: {
      url: 'https://www.instagram.com/orlanila_/',
      followers: '1,1K',
      engagement: '3,3%',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@orlanila_off',
      followers: '1,2K',
      engagement: '8,7%',
    },
    contentTypes: ['UGC', 'Reels', 'Posts', 'TikTok'],
  },
  {
    name: 'Alexandra',
    handle: '@alexxandra.corp',
    photo: '/assets/createurs/alexandra-corp.jpg',
    location: 'La Réunion — Le Tampon (Sud)',
    niches: ['Lifestyle', 'Mode', 'Beauté', 'Food'],
    bio: 'Créatrice de contenu lifestyle, mode, beauté et food à travers son entreprise Alexxandra Corp. Un univers authentique, spontané et créatif, avec l’envie de créer des contenus qui connectent les marques à leur audience.',
    instagram: {
      url: 'https://www.instagram.com/alexxandra.corp/',
      followers: '1,6K',
      engagement: 'À définir',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@alexxandra.corp',
      followers: '11,8K',
      engagement: '10,1%',
    },
    contentTypes: ['UGC', 'TikTok', 'Reels', 'Posts'],
  },
  {
    name: 'Maureen Aboukir',
    handle: '@madeby_maureen',
    photo: '/assets/createurs/maureen-aboukir.jpg',
    location: 'La Réunion — Saint-Louis (Sud)',
    niches: ['Lifestyle', 'Famille'],
    bio: 'Créatrice UGC de 26 ans basée à La Réunion. Elle crée du contenu authentique, solaire et naturel autour du lifestyle et de la famille : des contenus qui ressemblent à de vraies recommandations et qui donnent envie de découvrir la marque.',
    instagram: {
      url: 'https://www.instagram.com/madeby_maureen/',
      followers: '375',
      engagement: '10,7%',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@madeby_maureen',
      followers: '460',
      engagement: '11,7%',
    },
    contentTypes: ['UGC', 'Reels', 'TikTok', 'Posts'],
  },
  {
    name: 'Sherine Adouko',
    handle: '@ss.rn97',
    photo: '/assets/createurs/sherine-adouko.jpg',
    location: 'La Réunion — Saint-Pierre (Sud)',
    niches: ['Beauté', 'Mode', 'Lifestyle', 'Voyage'],
    bio: 'Créatrice de contenu basée à La Réunion, passionnée par la beauté, la mode et le lifestyle. Elle crée du contenu naturel, esthétique et authentique : face cam, unboxing, tests produits, Reels et TikTok.',
    instagram: {
      url: 'https://www.instagram.com/ss.rn97/',
      followers: '3,2K',
      engagement: 'À définir',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@ss.rn97',
      followers: '14,2K',
      engagement: '26,3%',
    },
    contentTypes: ['UGC', 'TikTok', 'Reels'],
  },
]

// Le filet de sécurité ignore niveau et catégorie — ils sont calculés par n8n
// dans Airtable, pas dans le repo : il retombe sur les valeurs les plus neutres
// et dérive slug, prénom et ville de ce qu'il a déjà sous la main.
export const CREATORS: Influencer[] = SEEDS.map((seed) => ({
  ...seed,
  slug: seed.handle.replace(/^@+/, '').toLowerCase(),
  firstName: seed.name.split(' ')[0],
  city: seed.location.split('—')[0].trim(),
  niveau: 'nouveau',
  categorie: 'ugc',
  genre: 'inconnu',
}))
