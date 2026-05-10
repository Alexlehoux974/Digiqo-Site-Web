import { m as motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'

// Exported so the main page can build the FAQPage JSON-LD without
// duplicating the data.
export const faqs = [
  {
    question: 'Comment fonctionne la publicité en ligne ?',
    answer: "La publicité en ligne fonctionne sur un système d'enchères : vous payez quand quelqu'un interagit avec votre annonce (clic, vue, engagement). Nous créons des campagnes ciblées sur les réseaux sociaux (Facebook, Instagram, TikTok) et Google Ads pour atteindre vos clients potentiels à La Réunion.",
  },
  {
    question: 'Quelle plateforme choisir pour mon entreprise à La Réunion ?',
    answer: "Le choix dépend de votre activité et de vos objectifs. Les réseaux sociaux (META, TikTok) sont idéaux pour la notoriété et l'engagement visuel. Google Ads cible les personnes qui recherchent activement vos services. Notre formule EXPANSION combine les deux pour une stratégie multicanal complète. Lors de notre audit, nous analysons votre marché réunionnais pour vous recommander la meilleure approche.",
  },
  {
    question: 'Quelle est la différence entre SMA et SEA ?',
    answer: "Le SMA (Social Media Advertising) désigne la publicité sur les réseaux sociaux : Facebook, Instagram, TikTok. Il permet de cibler des audiences par centres d'intérêt et comportements. Le SEA (Search Engine Advertising) désigne la publicité sur Google. Il cible les personnes qui recherchent activement vos produits ou services. Les deux sont complémentaires pour une stratégie digitale efficace à La Réunion.",
  },
  {
    question: 'Pourquoi faire appel à une agence plutôt que gérer seul ?',
    answer: 'La gestion publicitaire demande expertise technique, temps et optimisation constante. Nous maîtrisons les stratégies avancées sur toutes les plateformes, évitons les erreurs coûteuses et optimisons continuellement vos campagnes pour de meilleurs résultats. Notre connaissance du marché réunionnais est un atout supplémentaire.',
  },
  {
    question: 'Comment suivre les performances de mes campagnes ?',
    answer: 'Nous fournissons un accès aux plateformes publicitaires pour suivre vos campagnes en temps réel. Vous recevez également des rapports mensuels détaillés avec analyse des performances, nombre de clics, conversions et recommandations d\'amélioration via votre espace collaboratif dédié.',
  },
  {
    question: 'Combien de temps avant de voir des résultats ?',
    answer: "Les premiers résultats sont visibles dès les premières semaines : impressions, clics et trafic. Pour les conversions et leads qualifiés, comptez 1 à 3 mois d'optimisation selon votre secteur d'activité à La Réunion. Notre approche data-driven permet d'ajuster les campagnes en continu pour améliorer les performances.",
  },
  {
    question: 'La publicité en ligne convient-elle à mon entreprise ?',
    answer: "La publicité en ligne est efficace pour la plupart des secteurs à La Réunion : e-commerce, services locaux, B2B, restauration, immobilier, santé... Lors de notre consultation gratuite, nous analysons votre marché, la concurrence locale et déterminons ensemble la meilleure stratégie pour atteindre vos objectifs commerciaux.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Questions
            <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> Fréquentes</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur la publicité en ligne à La Réunion
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-4 text-digiqo-primary flex items-start gap-3">
                <TrendingUp aria-hidden="true" className="w-6 h-6 text-digiqo-accent shrink-0 mt-0.5" />
                {faq.question}
              </h3>
              <p className="text-gray-600 pl-9">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
