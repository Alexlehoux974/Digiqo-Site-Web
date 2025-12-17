
import Head from 'next/head';
import { HeaderLuxury } from '../components/Header';
import { Footer } from '../components/Footer';
import WebQuoteForm from '../src/components/WebQuoteForm';

export default function DevisSiteWebPage() {
  return (
    <>
      <Head>
        <title>Demande de devis site web - Digiqo</title>
        <meta
          name="description"
          content="Obtenez votre devis personnalisé pour la création de votre site web. Répondez à quelques questions pour nous aider à comprendre vos besoins."
        />
      </Head>

      <HeaderLuxury />

      <main className="min-h-screen pt-40 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Demande de devis pour votre site web
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prenez quelques minutes pour nous décrire votre projet.
              Nous vous recontacterons rapidement avec une proposition adaptée à vos besoins.
            </p>
          </div>

          <WebQuoteForm />
        </div>
      </main>

      <Footer />
    </>
  );
}