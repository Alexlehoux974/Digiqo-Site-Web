import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TestColors() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Test des Couleurs et Animations Intensifiées</h1>
          
          {/* Test des opacités des couleurs primaires */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Couleur Primaire (Bordeaux)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-digiqo-primary/5 rounded-lg">
                <p className="font-medium">bg-digiqo-primary/5</p>
                <p className="text-sm text-gray-600">Était 5% → Maintenant 25%</p>
              </div>
              <div className="p-6 bg-digiqo-primary/10 rounded-lg">
                <p className="font-medium">bg-digiqo-primary/10</p>
                <p className="text-sm text-gray-600">Était 10% → Maintenant 35%</p>
              </div>
              <div className="p-6 bg-digiqo-primary/30 rounded-lg">
                <p className="font-medium">bg-digiqo-primary/30</p>
                <p className="text-sm text-gray-600">Était 30% → Maintenant 55%</p>
              </div>
              <div className="p-6 bg-digiqo-primary/50 rounded-lg text-white">
                <p className="font-medium">bg-digiqo-primary/50</p>
                <p className="text-sm">Était 50% → Maintenant 75%</p>
              </div>
            </div>
          </section>

          {/* Test des opacités des couleurs secondaires */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Couleur Secondaire (Bleu)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-digiqo-secondary/5 rounded-lg">
                <p className="font-medium">bg-digiqo-secondary/5</p>
                <p className="text-sm text-gray-600">Était 5% → Maintenant 25%</p>
              </div>
              <div className="p-6 bg-digiqo-secondary/10 rounded-lg">
                <p className="font-medium">bg-digiqo-secondary/10</p>
                <p className="text-sm text-gray-600">Était 10% → Maintenant 35%</p>
              </div>
              <div className="p-6 bg-digiqo-secondary/30 rounded-lg">
                <p className="font-medium">bg-digiqo-secondary/30</p>
                <p className="text-sm text-gray-600">Était 30% → Maintenant 55%</p>
              </div>
              <div className="p-6 bg-digiqo-secondary/50 rounded-lg text-white">
                <p className="font-medium">bg-digiqo-secondary/50</p>
                <p className="text-sm">Était 50% → Maintenant 75%</p>
              </div>
            </div>
          </section>

          {/* Test des animations */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Animations Intensifiées</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-digiqo-primary to-digiqo-accent rounded-lg animate-float mb-4"></div>
                <p className="font-medium">Float Animation</p>
                <p className="text-sm text-gray-600">Amplitude: 20px → 40px</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-digiqo-secondary to-digiqo-accent rounded-lg animate-glow mb-4"></div>
                <p className="font-medium">Glow Animation</p>
                <p className="text-sm text-gray-600">Intensité doublée</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-digiqo-primary to-digiqo-secondary rounded-lg animate-pulse mb-4"></div>
                <p className="font-medium">Pulse Animation</p>
                <p className="text-sm text-gray-600">Scale: 0.95 → 1.08</p>
              </div>
            </div>
          </section>

          {/* Test des ombres et effets */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Ombres et Effets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-lg shadow-digiqo">
                <p className="font-medium mb-2">Shadow Digiqo</p>
                <p className="text-sm text-gray-600">Ombre avec couleur primaire intensifiée</p>
              </div>
              <div className="p-8 bg-white rounded-lg shadow-accent">
                <p className="font-medium mb-2">Shadow Accent</p>
                <p className="text-sm text-gray-600">Ombre avec couleur accent intensifiée</p>
              </div>
            </div>
          </section>

          {/* Boutons avec animations */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Boutons avec Animations</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white rounded-full hover:shadow-accent-lg transition-all duration-300 animate-pulse">
                Bouton Pulse
              </button>
              <button className="px-8 py-3 bg-digiqo-secondary text-white rounded-full hover:animate-bounce-soft transition-all">
                Bouton Bounce
              </button>
              <button className="px-8 py-3 border-2 border-digiqo-primary text-digiqo-primary rounded-full hover:bg-digiqo-primary/10 hover:animate-shimmer transition-all">
                Bouton Shimmer
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}