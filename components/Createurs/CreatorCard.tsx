import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m as motion } from 'framer-motion'
import { ArrowUpRight, Camera, MapPin, Instagram, Youtube, Zap, MessageCircle } from 'lucide-react'
import { TikTokIcon } from './TikTokIcon'
import { PlatformRow } from './PlatformRow'
import { CategoryPill, LevelBadge, levelBorder } from './CreatorBadges'
import type { Influencer } from '@/lib/createurs/types'
import { getAvgEngagement, getAvgEngagementValue, getNicheColor, hasPlatform } from '@/lib/createurs/helpers'
import { demandeHref } from '@/lib/createurs/demande'
import { fichePath } from '@/lib/createurs/fiche'

const MAX_NICHES = 3

interface CreatorCardProps {
  influencer: Influencer
  index: number
  onOpen: (influencer: Influencer) => void
}

export const CreatorCard = ({ influencer, index, onOpen }: CreatorCardProps) => {
  const [imageError, setImageError] = useState(false)
  const extraNiches = influencer.niches.length - MAX_NICHES
  const avg = getAvgEngagementValue(influencer)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28, delay: Math.min(index, 8) * 0.03 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${levelBorder(influencer.niveau)}`}
    >
      {/* Toute la fiche ouvre le panneau de détail, sauf le CTA (z-20 plus bas). */}
      <button
        type="button"
        onClick={() => onOpen(influencer)}
        className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#111111]"
      >
        <span className="sr-only">Voir le profil de {influencer.name}</span>
      </button>

      {/* Badge de niveau, au-dessus de l'overlay de clic pour rester lisible. */}
      {influencer.niveau !== 'nouveau' && (
        <div className="pointer-events-none absolute left-3 top-3 z-20">
          <LevelBadge niveau={influencer.niveau} className="shadow-sm" />
        </div>
      )}

      {/* Photo carrée */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {!imageError ? (
          <Image
            src={influencer.photo}
            alt={influencer.name}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <Camera className="h-8 w-8 text-gray-300" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="truncate text-[15px] font-bold leading-tight text-gray-900">{influencer.name}</h3>
          <p className="truncate text-xs text-gray-500">{influencer.handle}</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{influencer.location}</span>
        </div>

        {/* La catégorie ouvre la rangée : c'est la nature du profil, les niches
            en sont le détail. */}
        <div className="flex flex-wrap gap-1.5">
          <CategoryPill categorie={influencer.categorie} compact />
          {influencer.niches.slice(0, MAX_NICHES).map((niche) => (
            <span
              key={niche}
              className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold text-white ${getNicheColor(niche)}`}
            >
              {niche}
            </span>
          ))}
          {extraNiches > 0 && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
              +{extraNiches}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-3">
          {hasPlatform(influencer, 'instagram') && (
            <PlatformRow icon={<Instagram className="h-4 w-4" />} label="Instagram" stats={influencer.instagram} />
          )}
          {hasPlatform(influencer, 'tiktok') && (
            <PlatformRow icon={<TikTokIcon className="h-4 w-4" />} label="TikTok" stats={influencer.tiktok} />
          )}
          {influencer.youtube && hasPlatform(influencer, 'youtube') && (
            <PlatformRow icon={<Youtube className="h-4 w-4" />} label="YouTube" stats={influencer.youtube} />
          )}
        </div>

        {avg !== null && (
          <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-gray-500">
              <Zap className="h-3 w-3 text-amber-400" aria-hidden="true" />
              Engagement moyen
            </span>
            <span className="text-sm font-extrabold text-gray-900">{getAvgEngagement(influencer)}</span>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-1.5">
          <a
            href={demandeHref([influencer.handle])}
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-[13px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Engager ce créateur
          </a>
          {/* Le clic sur la carte ouvre le panneau — c'est le parcours principal.
              Ce lien existe pour l'URL partageable, et pour les moteurs. */}
          <Link
            href={fichePath(influencer.slug)}
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            Voir la fiche
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
