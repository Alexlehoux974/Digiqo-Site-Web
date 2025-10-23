import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Mail, MessageSquare, TrendingUp, Clock, CheckCircle, Sparkles, Target, BarChart3 } from 'lucide-react';
import { HeaderLuxury } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

interface Agent {
  id: string;
  name: string;
  icon: React.ElementType;
  image: string;
  description: string;
  features: string[];
  color: string;
}

const agents: Agent[] = [
  {
    id: 'mail',
    name: 'Agent Mail',
    icon: Mail,
    image: '/agents-ia/agent-mail.png',
    description: 'Votre assistant intelligent pour gérer vos emails professionnels',
    features: [
      'Tri automatique des emails par priorité',
      'Préparation de réponses contextuelles',
      'Récapitulatif matin et soir de votre boîte',
      'Filtrage intelligent des spams et newsletters',
      'Alertes pour les emails urgents'
    ],
    color: '#8B1431'
  },
  {
    id: 'lead',
    name: 'Agent Lead',
    icon: TrendingUp,
    image: '/agents-ia/agent-lead.png',
    description: 'Votre commercial automatisé qui travaille 24/7',
    features: [
      'Enregistrement automatique des leads dans votre CRM',
      'Contact personnalisé avec vos prospects',
      'Génération et envoi de devis professionnels',
      'Suivi automatique des opportunités',
      'Relances intelligentes et personnalisées'
    ],
    color: '#DA6530'
  },
  {
    id: 'social',
    name: 'Agent Réseaux',
    icon: MessageSquare,
    image: '/agents-ia/agent-social.png',
    description: 'Votre community manager personnel',
    features: [
      'Création de publications engageantes',
      'Publication automatique multi-plateformes',
      'Planification intelligente des posts',
      'Analyse des meilleures heures de publication',
      'Suggestions de contenu adapté à votre audience'
    ],
    color: '#199CB7'
  }
];

const benefits = [
  {
    icon: Sparkles,
    title: 'Liberté totale',
    description: 'Testez sans engagement, arrêtez quand vous voulez',
    color: 'text-digiqo-accent'
  },
  {
    icon: Target,
    title: 'Configuration sur-mesure',
    description: 'Adapté à vos besoins et processus',
    color: 'text-digiqo-secondary'
  },
  {
    icon: BarChart3,
    title: 'Résultats garantis',
    description: 'Économisez jusqu\'à 15h par semaine',
    color: 'text-digiqo-primary'
  }
];

export default function OffreAgentsIA() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    telephone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/agents-ia-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          entreprise: formData.entreprise,
          telephone: formData.telephone,
          message: formData.message
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nom: '',
          email: '',
          entreprise: '',
          telephone: '',
          message: ''
        });
        // Redirection après 2 secondes
        setTimeout(() => {
          window.location.href = '/merci';
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Offre Spéciale - 45 Jours Gratuits | Agents IA Digiqo"
        description="Testez gratuitement pendant 45 jours nos 3 agents IA qui automatisent vos emails, leads et réseaux sociaux. Offre exclusive réservée à nos clients."
      />

      <HeaderLuxury />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-56 pb-20 px-4 bg-gray-50">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-digiqo-primary/20 rounded-full blur-3xl animate-pulse-subtle" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-digiqo-accent/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-digiqo-secondary/20 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '2s' }} />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="bg-digiqo-primary text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg">
                  <Sparkles className="inline-block w-4 h-4 mr-2" />
                  Offre Exclusive - Clients Privilégiés Digiqo
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                Découvrez la Liberté
                <br />
                <span className="text-digiqo-primary">
                  De l'Automatisation IA
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                45 jours pour tester nos 3 agents IA sans engagement ni carte bancaire
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                  <Sparkles className="w-6 h-6 text-digiqo-accent" />
                  <span className="font-semibold text-gray-800">100% Sans engagement</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                  <CheckCircle className="w-6 h-6 text-digiqo-secondary" />
                  <span className="font-semibold text-gray-800">Aucune carte bancaire</span>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg">
                  <Clock className="w-6 h-6 text-digiqo-primary" />
                  <span className="font-semibold text-gray-800">45 jours d'essai</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-gray-600 text-base mb-2">
                  À l'issue de l'essai, vous restez libre de vos choix
                </p>
                <p className="text-sm text-gray-500">
                  Tarif indicatif si vous souhaitez continuer : <span className="font-semibold text-gray-700">297€/mois</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Exclusive Access Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-digiqo-primary/10"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-digiqo-accent text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Pourquoi vous ?
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-digiqo-primary">
                  Une Opportunité Unique Réservée à Nos Clients
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Si vous recevez cette offre, c'est parce que <span className="font-bold text-digiqo-primary">vous faites partie de nos clients privilégiés</span>.
                  Cette opportunité exclusive n'est pas accessible au grand public et représente notre manière de vous remercier pour votre confiance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-digiqo-primary/5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-digiqo-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-digiqo-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-digiqo-primary mb-1">Accès Prioritaire</h3>
                    <p className="text-sm text-gray-700">Vous êtes parmi les premiers à tester cette technologie avant son lancement public</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-digiqo-accent/5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-digiqo-accent/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-digiqo-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-digiqo-accent mb-1">Conditions Privilégiées</h3>
                    <p className="text-sm text-gray-700">45 jours d'essai gratuit, sans engagement - une offre réservée exclusivement à nos clients</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-digiqo-secondary/5 rounded-xl border-2 border-digiqo-secondary/20">
                <p className="text-center text-gray-700">
                  <span className="font-bold text-digiqo-secondary">Cette page n'est pas publique.</span> Elle est destinée uniquement à nos clients actuels qui bénéficient d'un accès exclusif à nos innovations.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-digiqo-primary">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-digiqo-primary">
                Vos 3 Assistants IA
              </h2>
              <p className="text-xl text-gray-700">
                Testez-les librement pendant 45 jours, sans aucun engagement
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                >
                  <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 h-full shadow-lg hover:shadow-2xl">
                    {/* 3D Agent Image */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-48 h-48 mx-auto relative"
                      >
                        {/* Colored background circle for visibility */}
                        <div className="absolute inset-0 rounded-full" style={{ backgroundColor: `${agent.color}15` }} />
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          width={192}
                          height={192}
                          className="relative z-10 drop-shadow-2xl"
                          priority
                        />
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-center text-digiqo-primary">{agent.name}</h3>
                    <p className="text-gray-700 text-center mb-6">{agent.description}</p>

                    {/* Features */}
                    <div className={`space-y-3 transition-all duration-300 ${selectedAgent === agent.id ? 'opacity-100 max-h-96' : 'opacity-70 max-h-0 overflow-hidden md:max-h-96 md:opacity-100'}`}>
                      {agent.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-digiqo-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-digiqo-primary">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-gray-700">
                Testez en toute liberté, sans contrainte
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Inscription libre',
                  description: 'Remplissez simplement le formulaire ci-dessous',
                  bgColor: 'bg-digiqo-primary'
                },
                {
                  step: '2',
                  title: 'Configuration personnalisée',
                  description: 'Nous configurons vos agents selon vos besoins spécifiques',
                  bgColor: 'bg-digiqo-accent'
                },
                {
                  step: '3',
                  title: 'Test en autonomie',
                  description: 'Utilisez vos agents pendant 45 jours, décidez ensuite librement',
                  bgColor: 'bg-digiqo-secondary'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative text-center"
                >
                  <div className="mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-full ${item.bgColor} flex items-center justify-center text-3xl font-bold text-white shadow-lg`}>
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-digiqo-primary">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-digiqo-primary rounded-3xl p-12 text-center relative overflow-hidden shadow-xl"
            >
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Testez sans risque pendant 45 jours
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Découvrez comment nos agents IA peuvent transformer votre quotidien
                </p>

                <motion.a
                  href="#inscription"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-white text-digiqo-primary px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Commencer mon essai gratuit
                </motion.a>

                <p className="text-sm text-white/80 mt-6">
                  100% sans engagement - Aucune carte bancaire - Liberté totale
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inscription Form Section */}
        <section id="inscription" className="py-20 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-digiqo-primary">
                Démarrez votre essai
              </h2>
              <p className="text-xl text-gray-700">
                Remplissez ce formulaire et nous vous contacterons sous 24h
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold mb-2 text-gray-900">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-digiqo-accent focus:ring-2 focus:ring-digiqo-accent/20 outline-none transition-all text-gray-900"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-digiqo-accent focus:ring-2 focus:ring-digiqo-accent/20 outline-none transition-all text-gray-900"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="entreprise" className="block text-sm font-semibold mb-2 text-gray-900">
                    Entreprise *
                  </label>
                  <input
                    type="text"
                    id="entreprise"
                    required
                    value={formData.entreprise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-digiqo-accent focus:ring-2 focus:ring-digiqo-accent/20 outline-none transition-all text-gray-900"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-semibold mb-2 text-gray-900">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-digiqo-accent focus:ring-2 focus:ring-digiqo-accent/20 outline-none transition-all text-gray-900"
                    placeholder="+262 692 XX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-digiqo-accent focus:ring-2 focus:ring-digiqo-accent/20 outline-none transition-all resize-none text-gray-900"
                    placeholder="Parlez-nous de vos besoins..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-xl text-center"
                  >
                    <CheckCircle className="inline-block w-5 h-5 mr-2" />
                    Merci ! Nous vous contacterons très bientôt.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl text-center"
                  >
                    Une erreur est survenue. Veuillez réessayer.
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-8 py-4 rounded-xl font-bold text-lg shadow-digiqo hover:shadow-xl transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-digiqo text-white'
                  }`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Oui, je veux mes Agents IA !'}
                </motion.button>

                <p className="text-sm text-gray-600 text-center">
                  En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe
                </p>
              </div>
            </motion.form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
