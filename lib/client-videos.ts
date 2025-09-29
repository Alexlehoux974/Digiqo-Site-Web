// Client videos data for DomeGallery component
export type ClientVideo = {
  src: string;
  alt: string;
  type: 'video';
  thumbnail?: string;
  clientName: string;
  originalUrl: string; // URL Google Drive original pour référence
};

export const clientVideos: ClientVideo[] = [
  // Clients avec logos disponibles
  {
    clientName: "CÔTE SEINE",
    alt: "Vidéo publicitaire CÔTE SEINE",
    type: "video",
    thumbnail: "/partenaires/COTE-SEINE-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1p_6wV_OyDRNCKl24StPrr8zGwpryZJnd",
    originalUrl: "https://drive.google.com/file/d/1p_6wV_OyDRNCKl24StPrr8zGwpryZJnd/view?usp=drive_link"
  },
  {
    clientName: "NOMAD",
    alt: "Vidéo publicitaire NOMAD",
    type: "video",
    thumbnail: "/partenaires/MAISON-NOMADE-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1HLSabnYLDkG809K2WjyF_yYG-Xwgcdz4",
    originalUrl: "https://drive.google.com/file/d/1HLSabnYLDkG809K2WjyF_yYG-Xwgcdz4/view?usp=drive_link"
  },
  {
    clientName: "TWINS DESIGN",
    alt: "Vidéo publicitaire TWINS DESIGN",
    type: "video",
    thumbnail: "/partenaires/TWINS-DESIGN2-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1_h2B0fMIr8v7zpNkwo4bQ5R9qn5_6Wd8",
    originalUrl: "https://drive.google.com/file/d/1_h2B0fMIr8v7zpNkwo4bQ5R9qn5_6Wd8/view?usp=drive_link"
  },
  {
    clientName: "VEILLE À NÔU",
    alt: "Vidéo publicitaire VEILLE À NÔU",
    type: "video",
    thumbnail: "/partenaires/VEILLEANOU-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1sj0xI9wfUVDPoGYkLmKUI5a8EMTgsuo8",
    originalUrl: "https://drive.google.com/file/d/1sj0xI9wfUVDPoGYkLmKUI5a8EMTgsuo8/view?usp=drive_link"
  },
  {
    clientName: "C BIEN GLACÉ",
    alt: "Vidéo publicitaire C BIEN GLACÉ",
    type: "video",
    thumbnail: "/partenaires/cbienglace.webp",
    src: "https://drive.google.com/uc?export=download&id=1HTWUubsycCDAQS_JbzE5xDskVCDSZHKY",
    originalUrl: "https://drive.google.com/file/d/1HTWUubsycCDAQS_JbzE5xDskVCDSZHKY/view?usp=drive_link"
  },
  {
    clientName: "DERMA JOLIE",
    alt: "Vidéo publicitaire DERMA JOLIE",
    type: "video",
    thumbnail: "/partenaires/DERMAJOLIE-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1IOFOhP-kiHG8m8dtBv6PFmz85VG2NI8i",
    originalUrl: "https://drive.google.com/file/d/1IOFOhP-kiHG8m8dtBv6PFmz85VG2NI8i/view?usp=drive_link"
  },
  {
    clientName: "CULINARION",
    alt: "Vidéo publicitaire CULINARION",
    type: "video",
    thumbnail: "/partenaires/culinarion.webp",
    src: "https://drive.google.com/uc?export=download&id=1J8dJ9n4vUHJXg8sesO2849q1Of0Fdbkd",
    originalUrl: "https://drive.google.com/file/d/1J8dJ9n4vUHJXg8sesO2849q1Of0Fdbkd/view?usp=drive_link"
  },

  // Clients sans logos (utiliseront un placeholder ou la première frame de la vidéo)
  {
    clientName: "AGENCE CENTRALE DE L'OR",
    alt: "Vidéo publicitaire AGENCE CENTRALE DE L'OR",
    type: "video",
    thumbnail: "/partenaires/AGENCE-CENTRALE-OR-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=10GJ6ZbPZBD_HoTfKU-OkCLX_385Q4dIu",
    originalUrl: "https://drive.google.com/file/d/10GJ6ZbPZBD_HoTfKU-OkCLX_385Q4dIu/view?usp=drive_link"
  },
  {
    clientName: "ASI TECHNOLOGIE",
    alt: "Vidéo publicitaire ASI TECHNOLOGIE",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1GFu9I90DrVVLUZgBqGAQNWLnCPMvJQLH",
    originalUrl: "https://drive.google.com/file/d/1GFu9I90DrVVLUZgBqGAQNWLnCPMvJQLH/view?usp=drive_link"
  },
  {
    clientName: "BURO",
    alt: "Vidéo publicitaire BURO",
    type: "video",
    thumbnail: "/partenaires/BURO-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1KEhRKO-DkOqHALTQjkVjn5ch1VD2ykgJ",
    originalUrl: "https://drive.google.com/file/d/1KEhRKO-DkOqHALTQjkVjn5ch1VD2ykgJ/view?usp=drive_link"
  },
  {
    clientName: "EDEN DU RANDONNEUR",
    alt: "Vidéo publicitaire EDEN DU RANDONNEUR",
    type: "video",
    thumbnail: "/partenaires/EDEN-RANDONNEUR-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1I2U8IEulw96y2ljn5hnUOq1FtWoiDkIr",
    originalUrl: "https://drive.google.com/file/d/1I2U8IEulw96y2ljn5hnUOq1FtWoiDkIr/view?usp=drive_link"
  },
  {
    clientName: "GARAGE FCSA",
    alt: "Vidéo publicitaire GARAGE FCSA",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1Z0jYmJhEtP1uGcBIJk6C5CFtxkTGaxXr",
    originalUrl: "https://drive.google.com/file/d/1Z0jYmJhEtP1uGcBIJk6C5CFtxkTGaxXr/view?usp=drive_link"
  },
  {
    clientName: "GLOBAL SERVICE",
    alt: "Vidéo publicitaire GLOBAL SERVICE",
    type: "video",
    thumbnail: "/partenaires/GLOBAL-SERVICE-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1H2PT6WI5rKcZKmyglWN6P9fhPOcMmRkb",
    originalUrl: "https://drive.google.com/file/d/1H2PT6WI5rKcZKmyglWN6P9fhPOcMmRkb/view?usp=drive_link"
  },
  {
    clientName: "INTÉRIEURS PRIVÉS",
    alt: "Vidéo publicitaire INTÉRIEURS PRIVÉS",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=15qtyZs4gSIXnaY2DTn-Yl9pzn-opqv5Y",
    originalUrl: "https://drive.google.com/file/d/15qtyZs4gSIXnaY2DTn-Yl9pzn-opqv5Y/view?usp=drive_link"
  },
  {
    clientName: "LA PART DES ANGES",
    alt: "Vidéo publicitaire LA PART DES ANGES",
    type: "video",
    thumbnail: "/partenaires/LA-PART-DES-ANGES-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1t1WjH6DUiNXiMydit05VOLSaHMYD2H8x",
    originalUrl: "https://drive.google.com/file/d/1t1WjH6DUiNXiMydit05VOLSaHMYD2H8x/view?usp=drive_link"
  },
  {
    clientName: "LADRESS",
    alt: "Vidéo publicitaire LADRESS",
    type: "video",
    thumbnail: "/partenaires/LADRESS-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1QsGOlwSJ2q5d-9ugFH_okuNI0RPYXliA",
    originalUrl: "https://drive.google.com/file/d/1QsGOlwSJ2q5d-9ugFH_okuNI0RPYXliA/view?usp=drive_link"
  },
  {
    clientName: "LE GOÛT DU VIN",
    alt: "Vidéo publicitaire LE GOÛT DU VIN",
    type: "video",
    thumbnail: "/partenaires/LE-GOUT-DU-VIN-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1KXtkSwBUNFw7y-frVpXUlR5wb38ACTNg",
    originalUrl: "https://drive.google.com/file/d/1KXtkSwBUNFw7y-frVpXUlR5wb38ACTNg/view?usp=drive_link"
  },
  {
    clientName: "LELINGE.RE",
    alt: "Vidéo publicitaire LELINGE.RE",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1rf85e6bqWTayeJbquozI8lAws4npWkhu",
    originalUrl: "https://drive.google.com/file/d/1rf85e6bqWTayeJbquozI8lAws4npWkhu/view?usp=drive_link"
  },
  {
    clientName: "LES CAFÉS D'ITALIE",
    alt: "Vidéo publicitaire LES CAFÉS D'ITALIE",
    type: "video",
    thumbnail: "/partenaires/LES-CAFES-DITALIE-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1Thyud_cziAZbdZHOBXf3QrjixBeARNCn",
    originalUrl: "https://drive.google.com/file/d/1Thyud_cziAZbdZHOBXf3QrjixBeARNCn/view?usp=drive_link"
  },
  {
    clientName: "LITTLE LIBELULLE",
    alt: "Vidéo publicitaire LITTLE LIBELULLE",
    type: "video",
    thumbnail: "/partenaires/LITTLE-LIBELLULE-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1OaZvS7a5qkuSbNJ0tPVBbSCawcSPdBru",
    originalUrl: "https://drive.google.com/file/d/1OaZvS7a5qkuSbNJ0tPVBbSCawcSPdBru/view?usp=drive_link"
  },
  {
    clientName: "ONE-MARKET",
    alt: "Vidéo publicitaire ONE-MARKET",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1VphfNIVmj9fx8_XhJJauWcN-19ourrQ8",
    originalUrl: "https://drive.google.com/file/d/1VphfNIVmj9fx8_XhJJauWcN-19ourrQ8/view?usp=drive_link"
  },
  {
    clientName: "PASS-XP",
    alt: "Vidéo publicitaire PASS-XP",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1lurkFaorIzA13pzQZwmlJnQATb8aitz8",
    originalUrl: "https://drive.google.com/file/d/1lurkFaorIzA13pzQZwmlJnQATb8aitz8/view?usp=drive_link"
  },
  {
    clientName: "PÊCHE PASSION",
    alt: "Vidéo publicitaire PÊCHE PASSION",
    type: "video",
    thumbnail: "/partenaires/PECHE-PASSION-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=16kzxc85DZHY98Bnr6IbQbKy6OqSaPS-x",
    originalUrl: "https://drive.google.com/file/d/16kzxc85DZHY98Bnr6IbQbKy6OqSaPS-x/view?usp=drive_link"
  },
  {
    clientName: "POKAWA",
    alt: "Vidéo publicitaire POKAWA",
    type: "video",
    thumbnail: "/partenaires/POKAWA-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1QEEew4OX-8n6C0owgEZJsOr3utsw3JDv",
    originalUrl: "https://drive.google.com/file/d/1QEEew4OX-8n6C0owgEZJsOr3utsw3JDv/view?usp=drive_link"
  },
  {
    clientName: "SAM CONCEPT HABITAT",
    alt: "Vidéo publicitaire SAM CONCEPT HABITAT",
    type: "video",
    thumbnail: "/partenaires/SAM-CONCEPT-HABITAT-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1HU7l11ipKjiFdIZFIr5MHg3TfdC3TXNQ",
    originalUrl: "https://drive.google.com/file/d/1HU7l11ipKjiFdIZFIr5MHg3TfdC3TXNQ/view?usp=drive_link"
  },
  {
    clientName: "CAVAVIN",
    alt: "Vidéo publicitaire CAVAVIN",
    type: "video",
    thumbnail: "/partenaires/CAVAVIN-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1q6OPjDF9RlfToTr-aRGDKafscbnM89av",
    originalUrl: "https://drive.google.com/file/d/1q6OPjDF9RlfToTr-aRGDKafscbnM89av/view?usp=drive_link"
  },
  {
    clientName: "COPEAUX D'ABORD",
    alt: "Vidéo publicitaire COPEAUX D'ABORD",
    type: "video",
    thumbnail: "/partenaires/COPEAUX-DABORD-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1czrNTiSXToW9d1X7gPS6136rbSREDdpv",
    originalUrl: "https://drive.google.com/file/d/1czrNTiSXToW9d1X7gPS6136rbSREDdpv/view?usp=drive_link"
  },
  {
    clientName: "DORCEL",
    alt: "Vidéo publicitaire DORCEL",
    type: "video",
    thumbnail: "/partenaires/DORCEL-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1u_nfVf89ih-uIa2PzFnrPW4J6LNpiBw9",
    originalUrl: "https://drive.google.com/file/d/1u_nfVf89ih-uIa2PzFnrPW4J6LNpiBw9/view?usp=drive_link"
  },
  {
    clientName: "ÉMULSION 2",
    alt: "Vidéo publicitaire ÉMULSION 2",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1mTohrInmDRL8XWGjcKIjd0CUDQT6Z_YB",
    originalUrl: "https://drive.google.com/file/d/1mTohrInmDRL8XWGjcKIjd0CUDQT6Z_YB/view?usp=drive_link"
  },
  {
    clientName: "EN L'AIR PIED BOIS",
    alt: "Vidéo publicitaire EN L'AIR PIED BOIS",
    type: "video",
    thumbnail: "/partenaires/EN-LAIR-PIED-BOIS-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1Dmi5KrywlHODDnIx1NAskM42ao2eOAtw",
    originalUrl: "https://drive.google.com/file/d/1Dmi5KrywlHODDnIx1NAskM42ao2eOAtw/view?usp=drive_link"
  },
  {
    clientName: "HÉRACLES COACHING",
    alt: "Vidéo publicitaire HÉRACLES COACHING",
    type: "video",
    thumbnail: "/partenaires/HERACLES-COACHING-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1tHAthBzIaicnE1Hh2oah363VmzDb47By",
    originalUrl: "https://drive.google.com/file/d/1tHAthBzIaicnE1Hh2oah363VmzDb47By/view?usp=drive_link"
  },
  {
    clientName: "INSTITUT DESBEANCE",
    alt: "Vidéo publicitaire INSTITUT DESBEANCE",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1Oyjcr3YQea8_7buapXrTCSIfmv23yhJc",
    originalUrl: "https://drive.google.com/file/d/1Oyjcr3YQea8_7buapXrTCSIfmv23yhJc/view?usp=drive_link"
  },
  {
    clientName: "LILOO BEAUTY",
    alt: "Vidéo publicitaire LILOO BEAUTY",
    type: "video",
    thumbnail: "/partenaires/LILOO-BEAUTY-1024x1024.webp",
    src: "https://drive.google.com/uc?export=download&id=1QbKIuDdZy7DOaBaaqstEDgEiVFL5NRNv",
    originalUrl: "https://drive.google.com/file/d/1QbKIuDdZy7DOaBaaqstEDgEiVFL5NRNv/view?usp=drive_link"
  },
  {
    clientName: "PAPANG",
    alt: "Vidéo publicitaire PAPANG",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=17tdlwfnVUzoAI-89PM2b2TPl7IMVkxvw",
    originalUrl: "https://drive.google.com/file/d/17tdlwfnVUzoAI-89PM2b2TPl7IMVkxvw/view?usp=drive_link"
  },
  {
    clientName: "ULM",
    alt: "Vidéo publicitaire ULM",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=1xyqjRi8WS0LXmFYTSeb2SwAfyWjFzpOK",
    originalUrl: "https://drive.google.com/file/d/1xyqjRi8WS0LXmFYTSeb2SwAfyWjFzpOK/view?usp=drive_link"
  },
  {
    clientName: "VANILLE JEU-CONCOURS",
    alt: "Vidéo publicitaire VANILLE JEU-CONCOURS",
    type: "video",
    src: "https://drive.google.com/uc?export=download&id=10jeKKTY4GTLIINV_3dq8OjaxkVhZsNee",
    originalUrl: "https://drive.google.com/file/d/10jeKKTY4GTLIINV_3dq8OjaxkVhZsNee/view?usp=drive_link"
  }
];

// Fonction pour obtenir un échantillon de vidéos
export function getSampleVideos(count: number = 12): ClientVideo[] {
  // Prioriser les vidéos avec des thumbnails
  const videosWithThumbnails = clientVideos.filter(v => v.thumbnail);
  const videosWithoutThumbnails = clientVideos.filter(v => !v.thumbnail);

  const result: ClientVideo[] = [];

  // Ajouter d'abord les vidéos avec thumbnails
  result.push(...videosWithThumbnails.slice(0, Math.min(count, videosWithThumbnails.length)));

  // Compléter avec des vidéos sans thumbnails si nécessaire
  const remaining = count - result.length;
  if (remaining > 0) {
    result.push(...videosWithoutThumbnails.slice(0, remaining));
  }

  return result;
}

// Fonction pour obtenir toutes les vidéos
export function getAllClientVideos(): ClientVideo[] {
  return clientVideos;
}