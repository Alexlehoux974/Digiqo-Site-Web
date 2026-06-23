import { m as motion } from 'framer-motion'
import { Monitor, Search, Check } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { ANIMATION } from '@/lib/animation-constants'

export default function PlatformsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Toutes les <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">plateformes</span> couvertes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une stratégie publicitaire complète sur les réseaux sociaux et les moteurs de recherche
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SMA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-3xl p-4 sm:p-8 text-white"
          >
            <div className="flex items-center gap-2 mb-6">
              <Monitor aria-hidden="true" className="w-6 h-6 text-blue-300" />
              <h3 className="text-2xl font-bold">Réseaux Sociaux (SMA)</h3>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                <OptimizedImage src="/instagram.jpg" alt="Instagram" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                <OptimizedImage src="/facebook.jpg" alt="Facebook" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                <OptimizedImage src="/partenaires/tiktok.png" alt="TikTok" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                <OptimizedImage src="/whatsapp.png" alt="WhatsApp" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
              </div>
            </div>
            <p className="text-blue-100 mb-4">
              Facebook, Instagram, TikTok, WhatsApp
            </p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                <span>Ciblage ultra-précis par centres d'intérêt, localisation et comportements</span>
              </li>
              <li className="flex items-start gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                <span>Formats visuels engageants : créatifs publicitaires statiques, dynamiques et production vidéo</span>
              </li>
              <li className="flex items-start gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                <span>Notoriété, considération et conversion</span>
              </li>
            </ul>
          </motion.div>

          {/* SEA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-4 sm:p-8 text-white"
          >
            <div className="flex items-center gap-2 mb-6">
              <Search aria-hidden="true" className="w-6 h-6 text-green-300" />
              <h3 className="text-2xl font-bold">Moteurs de Recherche (SEA)</h3>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                <OptimizedImage src="/Google_Ads_logo.svg.png" alt="Google Ads" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
              </div>
              <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2 flex items-center justify-center">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-8 h-8" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
            <p className="text-blue-100 mb-4">
              Google Ads (Search, Display, YouTube) — campagnes Search et liens sponsorisés
            </p>
            <p className="text-blue-100 mb-4">
              Digiqo, votre agence SEA à La Réunion, pilote votre référencement payant pour vous placer en tête de Google sur vos mots-clés stratégiques.
            </p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                <span>Campagnes Search : ciblez les personnes qui recherchent activement vos services</span>
              </li>
              <li className="flex items-start gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                <span>Liens sponsorisés à forte intention d'achat, ROI mesurable</span>
              </li>
              <li className="flex items-start gap-2">
                <Check aria-hidden="true" className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                <span>Référencement payant optimisé : top des résultats Google sur vos mots-clés business</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
