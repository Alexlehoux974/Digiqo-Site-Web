import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { DEMANDE_PATHNAME } from '@/lib/createurs/demande'
import { INSCRIPTION_PATHNAME } from '@/lib/createurs/inscription'

// ──────────────────────────────────────────────
// FAQ /createurs — deux volets côte à côte : entreprises et créateurs.
//
// Accordéon natif <details>/<summary> : accessible au clavier, sans state
// React ni animation de hauteur, donc zéro layout shift et fonctionnel sans JS.
// Les deux volets sont rendus en entier (pas d'onglets) : rien n'est masqué
// aux moteurs de recherche.
//
// `CREATORS_FAQ` est exporté pour que pages/createurs.tsx construise le JSON-LD
// FAQPage à partir de la même source — les réponses sont donc du texte brut,
// et les liens internes sont posés au rendu à partir de `links`.
// ──────────────────────────────────────────────

export interface CreatorsFaqLink {
  /** Fragment de la réponse à transformer en lien (première occurrence). */
  label: string
  href: string
}

export interface CreatorsFaqItem {
  question: string
  /** Texte brut, sans balise : repris tel quel dans le JSON-LD. */
  answer: string
  links?: CreatorsFaqLink[]
}

export interface CreatorsFaqPanel {
  title: string
  items: CreatorsFaqItem[]
}

export const CREATORS_FAQ: CreatorsFaqPanel[] = [
  {
    title: 'Vous êtes une entreprise',
    items: [
      {
        question: 'Comment trouver le bon créateur pour ma marque ?',
        answer:
          "Décrivez votre besoin en 2 minutes via le formulaire (objectif, format, budget, échéance). Digiqo présélectionne les profils adaptés parmi les créateurs de l'annuaire et vous propose une sélection avec un devis clair sous 48 h ouvrées. Vous pouvez aussi parcourir l'annuaire, filtrer par plateforme, niche, zone ou engagement, et ajouter vos favoris à votre demande.",
        links: [
          { label: 'via le formulaire', href: DEMANDE_PATHNAME },
          { label: "parcourir l'annuaire", href: '#createurs' },
        ],
      },
      {
        question: 'Les chiffres affichés sont-ils fiables ?',
        answer:
          "Oui. Les abonnés et les taux d'engagement Instagram et YouTube sont calculés par Digiqo à partir des API officielles des plateformes (likes et commentaires des derniers contenus rapportés au nombre d'abonnés), à l'inscription puis actualisés automatiquement chaque mois. Rien n'est déclaratif. Quand une donnée n'est pas mesurable (compte trop petit, statistiques masquées), elle n'est pas affichée plutôt qu'estimée.",
      },
      {
        question: 'Que signifient les niveaux Top, Confirmé et Nouveau ?',
        answer:
          "Ils classent les créateurs selon leur audience et leur engagement mesurés : Top pour les profils à forte audience ou très fort engagement, Confirmé pour les créateurs établis ou dont le portfolio a été validé par Digiqo, Nouveau pour les profils récents ou en cours de qualification. Le niveau est recalculé automatiquement avec les chiffres.",
      },
      {
        question: 'Combien ça coûte ?',
        answer:
          "Chaque collaboration fait l'objet d'un devis, établi selon le créateur, le format (Reel, TikTok, story, photo, vidéo UGC…), le nombre de contenus et les droits d'utilisation. Vous validez avant tout engagement. Il n'y a pas d'abonnement ni de frais pour consulter l'annuaire ou déposer une demande.",
        links: [{ label: 'déposer une demande', href: DEMANDE_PATHNAME }],
      },
      {
        question: 'Qui gère la relation avec le créateur ?',
        answer:
          "Digiqo. Brief, planning, validation des contenus, livraison et facturation passent par un seul interlocuteur. Vous n'avez pas à négocier ni à relancer : vous validez le devis, puis les contenus.",
      },
    ],
  },
  {
    title: 'Vous êtes créateur de contenu',
    items: [
      {
        question: 'Comment rejoindre le réseau ?',
        answer:
          "Inscrivez-vous en 5 minutes via le formulaire : coordonnées, réseaux, thématiques, types de contenu, une photo et une bio. Digiqo calcule vos statistiques, valide votre fiche et la publie sur l'annuaire. C'est gratuit et sans engagement.",
        links: [{ label: 'via le formulaire', href: INSCRIPTION_PATHNAME }],
      },
      {
        question: "Faut-il un nombre minimum d'abonnés ?",
        answer:
          "Non. Nous accueillons les créateurs UGC comme les influenceurs, quelle que soit la taille de leur communauté. Ce qui compte, c'est la qualité du contenu et l'engagement réel. Les fiches sont validées manuellement avant publication.",
      },
      {
        question: 'Comment mes chiffres sont-ils calculés et mis à jour ?',
        answer:
          "Via les API officielles d'Instagram et de YouTube, à l'inscription puis chaque mois, sans rien avoir à faire. Un compte Instagram Créateur ou Professionnel est nécessaire pour le calcul automatique ; si vos likes sont masqués, nous vous demandons simplement deux captures de vos Insights.",
      },
      {
        question: 'Comment se passe une collaboration ?',
        answer:
          "Quand une demande correspond à votre profil, Digiqo vous contacte avec le brief, le format et la rémunération proposée. Vous restez libre d'accepter ou non. Une fois le devis validé par l'entreprise, Digiqo coordonne le planning, la validation des contenus et le paiement.",
      },
      {
        question: 'Que puis-je faire de ma fiche ?',
        answer:
          "Chaque créateur a sa propre page (digiqo.fr/createurs/votre-pseudo) à partager en bio ou en story : plus elle circule, plus vous avez de chances d'être sollicité. Vous pouvez demander une modification ou la suppression de votre fiche à tout moment en répondant à nos mails.",
      },
    ],
  },
]

const LINK_CLASS =
  'font-semibold text-gray-900 underline decoration-gray-300 underline-offset-2 transition-colors hover:decoration-gray-900'

// Les liens vers /createurs/demande restent de vrais `<a>` : sur cette page ils
// sont interceptés par CreatorRequestLauncher (panneau latéral desktop).
// L'ancre #createurs aussi. Le reste passe par <Link> pour la navigation client.
const FaqLink = ({ href, children }: { href: string; children: ReactNode }) =>
  href.startsWith('/') && href !== DEMANDE_PATHNAME ? (
    <Link href={href} className={LINK_CLASS}>
      {children}
    </Link>
  ) : (
    <a href={href} className={LINK_CLASS}>
      {children}
    </a>
  )

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Réponse brute → texte identique, avec la première occurrence de chaque label liée. */
const renderAnswer = ({ answer, links }: CreatorsFaqItem): ReactNode => {
  if (!links?.length) return answer
  const hrefByLabel = new Map(links.map((link) => [link.label, link.href]))
  const parts = answer.split(new RegExp(`(${links.map((l) => escapeRegExp(l.label)).join('|')})`))
  const linked = new Set<string>()

  return parts.map((part, index) => {
    const href = hrefByLabel.get(part)
    if (!href || linked.has(part)) return part
    linked.add(part)
    return (
      <FaqLink key={index} href={href}>
        {part}
      </FaqLink>
    )
  })
}

export const CreatorsFaq = () => (
  <section id="faq" className="bg-white py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">Questions fréquentes</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-gray-600">
        Comment fonctionne le Réseau Créateurs Digiqo, côté entreprises et côté créateurs.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {CREATORS_FAQ.map((panel) => (
          <div key={panel.title}>
            <h3 className="text-lg font-bold text-gray-900">{panel.title}</h3>

            <div className="mt-4 space-y-3">
              {panel.items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-gray-200 bg-white transition-colors open:border-gray-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-[15px] font-bold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-gray-600">{renderAnswer(item)}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <p className="text-[15px] font-semibold text-gray-900">Une autre question ?</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={DEMANDE_PATHNAME}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            Décrire mon besoin
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href={INSCRIPTION_PATHNAME}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-gray-800 transition-colors hover:border-[#111111] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            Rejoindre le réseau
          </Link>
        </div>
      </div>
    </div>
  </section>
)
