import Head from 'next/head'
import { motion } from 'framer-motion'
import { Users, Briefcase, ArrowRight, CheckCircle, Send, Heart, Rocket, Target } from 'lucide-react'
import ServiceLayout from '../components/ServiceLayout/ServiceLayout'
import { ANIMATION } from '@/lib/animation-constants'

export default function RecrutementFreelances() {
  const benefits = [
    {
      icon: Briefcase,
      title: "Missions variées",
      description: "Travaillez sur des projets diversifiés pour des clients de tous secteurs"
    },
    {
      icon: Target,
      title: "Flexibilité totale",
      description: "Gérez votre emploi du temps selon vos disponibilités"
    },
    {
      icon: Rocket,
      title: "Rémunération attractive",
      description: "Tarifs compétitifs et paiements rapides garantis"
    },
    {
      icon: Heart,
      title: "Équipe bienveillante",
      description: "Rejoignez une équipe passionnée et collaborative"
    }
  ]

  const expertises = [
    "Développement web (React, Next.js, Node.js)",
    "Design graphique et UI/UX",
    "Community management",
    "Rédaction de contenus SEO",
    "Montage vidéo et motion design",
    "Publicité digitale (Google Ads, Meta Ads)",
    "Photographie et création visuelle",
    "Marketing d'influence",
    "Data analyse et reporting",
    "Stratégie digitale"
  ]

  return (
    <ServiceLayout>
      <Head>
        <title>Digiqo Recrute - Rejoignez notre réseau de freelances</title>
        <meta name="description" content="Digiqo recherche en permanence des freelances talentueux pour collaborer sur des projets digitaux variés. Rejoignez notre réseau de partenaires." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-digiqo-accent/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-digiqo-primary/30 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            className="inline-flex mb-8"
          >
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Users className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h1
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Digiqo <span className="text-digiqo-accent">Recrute</span>
          </motion.h1>

          <motion.p
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Rejoignez notre réseau de freelances talentueux et participez à des projets digitaux passionnants
          </motion.p>

          <motion.div
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#formulaire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-full hover:bg-digiqo-accent hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Send className="w-5 h-5" />
              Postuler maintenant
            </a>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nous recherchons <span className="text-digiqo-accent">constamment</span> des talents
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Chez Digiqo, nous croyons en la force du collectif. Notre réseau de freelances nous permet 
              d'offrir à nos clients une expertise complète et de qualité sur tous les aspects du digital.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex mb-4">
                  <div className="p-4 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-digiqo-primary">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertises recherchées */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Les expertises <span className="text-digiqo-accent">recherchées</span>
            </h2>
            <p className="text-xl text-gray-700">
              Nous recherchons des freelances dans les domaines suivants :
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {expertises.map((expertise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-digiqo-accent shrink-0" />
                <span className="text-gray-700 font-medium">{expertise}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comment <span className="text-digiqo-accent">ça marche ?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Candidature",
                description: "Remplissez le formulaire ci-dessous avec vos informations et votre portfolio"
              },
              {
                step: "2",
                title: "Validation",
                description: "Notre équipe examine votre profil et vous contacte sous 48h"
              },
              {
                step: "3",
                title: "Collaboration",
                description: "Nous vous proposons des missions adaptées à vos compétences et disponibilités"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-digiqo-primary">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%]">
                    <ArrowRight className="w-8 h-8 text-digiqo-accent/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire Section */}
      <section id="formulaire" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Rejoignez <span className="text-digiqo-accent">notre réseau</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Complétez le formulaire ci-dessous pour intégrer notre base de freelances. 
              Nous vous recontacterons dès qu'une mission correspondant à votre profil se présentera.
            </p>
          </motion.div>

          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-center">
              <p className="text-white font-semibold">Formulaire de candidature freelance</p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '150%' }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdBGwXIHJigV7ko40SQEUmhSFRsgiPFI1iNF_k3vHFCND5fBg/viewform?embedded=true"
                className="absolute top-0 left-0 w-full h-full border-0"
                loading="lazy"
              >
                Chargement…
              </iframe>
            </div>
          </motion.div>

          {/* Alternative CTA */}
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Problème avec le formulaire ? Vous pouvez également nous contacter directement :
            </p>
            <a
              href="mailto:recrutement@digiqo.fr?subject=Candidature Freelance"
              className="inline-flex items-center gap-2 text-digiqo-accent font-semibold hover:text-digiqo-primary transition-colors"
            >
              <Send className="w-5 h-5" />
              recrutement@digiqo.fr
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary to-digiqo-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à collaborer avec nous ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez une équipe dynamique et travaillez sur des projets stimulants
            </p>
            <a
              href="#formulaire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-full hover:bg-digiqo-accent hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Rocket className="w-5 h-5" />
              Postuler maintenant
            </a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}