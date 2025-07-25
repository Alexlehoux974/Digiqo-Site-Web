import React from 'react';
import { Timeline } from '../ui/timeline';

const timelineData = [
  {
    title: "2020 - La Genèse",
    content: (
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-secondary bg-clip-text text-transparent">
              L'idée qui a tout changé
            </span>
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Trois passionnés du digital se rencontrent et partagent une vision commune :
            révolutionner le marketing digital à La Réunion. De cette synergie naît Digiqo,
            une agence qui place l'innovation et la performance au cœur de sa mission.
          </p>
        </div>
        
        {/* Grille 2x2 */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Rodolphe - Top Left avec accent */}
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-digiqo-primary/10 to-transparent p-1">
            <div className="relative overflow-hidden rounded-xl bg-white">
              <img 
                src="/partenaires/Rodolphe.webp" 
                alt="Rodolphe - Co-fondateur"
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-6 left-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="font-bold text-xl mb-1">Rodolphe</h4>
                  <p className="text-sm opacity-90">CEO & Visionnaire</p>
                  <div className="w-12 h-0.5 bg-digiqo-accent mt-2"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alexandre - Top Right avec glass effect */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary/20 to-digiqo-accent/10 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-sm">
              <img 
                src="/partenaires/Alexandre.webp" 
                alt="Alexandre - Co-fondateur"
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary/20 to-transparent mix-blend-overlay"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h4 className="font-bold text-xl text-white mb-1">Alexandre</h4>
                <p className="text-sm text-white/80">CTO & Innovation</p>
              </div>
            </div>
          </div>
          
          {/* Angelo - Bottom Left avec effet créatif */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-digiqo-accent to-digiqo-secondary rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-2xl bg-white">
              <img 
                src="/partenaires/Angelo.webp" 
                alt="Angelo - Co-fondateur"
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-digiqo-accent/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-bold text-xl mb-1">Angelo</h4>
                  <p className="text-sm">CMO & Stratégie</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vision Statement - Bottom Right */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 flex flex-col justify-center text-white overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/20 to-digiqo-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <div className="text-6xl font-bold mb-4 text-digiqo-accent">3</div>
              <h4 className="text-xl font-bold mb-2">Fondateurs</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Une vision commune pour transformer le paysage digital de l'océan Indien
              </p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-digiqo-accent/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022 - L'Excellence",
    content: (
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
              Certification Meta Business Partner
            </span>
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Digiqo devient la première agence de l'océan Indien certifiée Meta Business Partner.
            Une reconnaissance qui valide notre expertise et ouvre de nouvelles perspectives
            pour nos clients dans l'écosystème Meta.
          </p>
        </div>
        
        {/* Grille 2x2 */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Meta Badge - Top Left */}
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-8">
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
              <img src="/partenaires/META-1024x1024.webp" alt="Meta" className="w-24 h-24 mb-4 bg-white rounded-2xl p-3" />
              <h4 className="text-xl font-bold mb-2">Meta Certified</h4>
              <p className="text-sm opacity-90">Business Partner 2022</p>
            </div>
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Growth Metrics - Top Right */}
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="relative z-10">
              <div className="text-5xl font-bold bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent mb-2">
                +150%
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Croissance</h4>
              <p className="text-sm text-gray-600">
                Performance exceptionnelle sur l'année 2022
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-digiqo-accent/20 to-transparent rounded-tl-full"></div>
          </div>
          
          {/* Team Celebration - Bottom Left */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img 
              src="/partenaires/428642719_10225815770485084_3749116991826890590_n-970x1024.webp" 
              alt="Équipe Digiqo"
              className="w-full h-64 object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-bold text-xl mb-1">50+ Clients</h4>
                <p className="text-sm opacity-90">Trust & Excellence</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-digiqo-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Services Grid - Bottom Right */}
          <div className="relative bg-gradient-to-br from-digiqo-primary/5 to-digiqo-secondary/5 rounded-2xl p-8 overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-digiqo-primary mb-4">Services Meta</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Ads Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">WhatsApp Business</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Analytics & Pixel</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-digiqo-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2024 - L'Expansion",
    content: (
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">
              Une équipe qui grandit
            </span>
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Avec l'arrivée d'Adrien et Thomas, nous renforçons notre expertise technique et créative.
            Plus de 100 clients nous font confiance pour propulser leur croissance digitale.
          </p>
        </div>
        
        {/* Grille 2x2 */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Adrien - Top Left */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-digiqo-primary to-digiqo-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
            <div className="relative">
              <img 
                src="/partenaires/Adrien.webp" 
                alt="Adrien"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl">
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-1">Adrien</h4>
                  <p className="text-sm opacity-90 mb-2">Lead Developer</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">React Expert</span>
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">Full Stack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thomas - Top Right */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-digiqo-secondary to-digiqo-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
            <div className="relative">
              <img 
                src="/partenaires/Thomas.webp" 
                alt="Thomas"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl">
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-1">Thomas</h4>
                  <p className="text-sm opacity-90 mb-2">Creative Director</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">UI/UX</span>
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">Design System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Client Stats - Bottom Left */}
          <div className="relative bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-2xl p-8 overflow-hidden group">
            <div className="relative z-10 text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent mb-2">
                100+
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Clients actifs</h4>
              <p className="text-sm text-gray-600">
                De La Réunion et d'ailleurs
              </p>
            </div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-digiqo-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
          
          {/* Partner Logos Grid - Bottom Right */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 overflow-hidden">
            <h4 className="text-sm font-bold text-gray-700 mb-4">Nos partenaires</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                <img src="/partenaires/CCI-REUNION-1024x1024.webp" alt="CCI" className="w-full h-8 object-contain" />
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                <img src="/partenaires/HEC-1024x1024.webp" alt="HEC" className="w-full h-8 object-contain" />
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                <img src="/partenaires/FOOT-KORNER-1024x1024.webp" alt="Foot Korner" className="w-full h-8 object-contain" />
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                <img src="/partenaires/LA-BOUCHERIE-1024x1024.webp" alt="La Boucherie" className="w-full h-8 object-contain" />
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                <img src="/partenaires/BEAUVALLON-1024x1024.webp" alt="Beauvallon" className="w-full h-8 object-contain" />
              </div>
              <div className="bg-gradient-to-br from-digiqo-primary/5 to-digiqo-accent/5 rounded-lg p-3 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">+95</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2025 - L'Innovation",
    content: (
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent">
              Le futur du Marketing Digital
            </span>
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Des innovations qui transforment radicalement la manière dont les entreprises 
            investissent dans leur croissance digitale.
          </p>
        </div>
        
        {/* Grille 2x2 */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Mensualisation - Top Left */}
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-digiqo-accent/10 to-transparent p-8">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-digiqo-accent to-digiqo-primary p-3 mb-4">
                <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Mensualisation
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Payez vos campagnes publicitaires mensuellement, sans intérêts.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-digiqo-accent/10 rounded-full text-xs font-semibold text-digiqo-accent">0% intérêts</span>
                <span className="px-3 py-1 bg-digiqo-primary/10 rounded-full text-xs font-semibold text-digiqo-primary">Flexible</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-digiqo-accent/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Vidéo Pro - Top Right */}
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-digiqo-secondary/10 to-transparent p-8">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-digiqo-secondary to-digiqo-primary p-3 mb-4">
                <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Vidéo Pro Offerte
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Production professionnelle incluse dans chaque partenariat.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-digiqo-secondary/10 rounded-full text-xs font-semibold text-digiqo-secondary">4K</span>
                <span className="px-3 py-1 bg-digiqo-secondary/10 rounded-full text-xs font-semibold text-digiqo-secondary">Pro</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-digiqo-secondary/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Visuels Mensuels - Bottom Left */}
          <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-digiqo-primary/10 to-transparent p-8">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-digiqo-primary to-digiqo-accent p-3 mb-4">
                <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Visuels Renouvelés
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Créations fraîches chaque mois pour maintenir l'engagement.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-digiqo-primary/10 rounded-full text-xs font-semibold text-digiqo-primary">Design</span>
                <span className="px-3 py-1 bg-digiqo-accent/10 rounded-full text-xs font-semibold text-digiqo-accent">A/B Test</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-digiqo-primary/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Call to Action - Bottom Right */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 flex flex-col justify-center text-white overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/20 to-digiqo-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10 text-center">
              <h4 className="text-2xl font-bold mb-3">Prêt pour 2025 ?</h4>
              <p className="text-sm text-gray-300 mb-4">
                Rejoignez les leaders qui nous font confiance.
              </p>
              <button className="bg-white text-gray-900 font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform">
                Découvrir
              </button>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    ),
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="relative" id="about">
      <Timeline data={timelineData} />
    </section>
  );
};