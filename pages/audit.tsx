import AuditForm from '@/src/components/AuditForm';
import Head from 'next/head';

export default function AuditPage() {
  return (
    <>
      <Head>
        <title>Audit Digital Gratuit | Digiqo</title>
        <meta 
          name="description" 
          content="Évaluez la maturité digitale de votre entreprise avec notre audit complet. Recevez des recommandations personnalisées pour améliorer votre présence en ligne." 
        />
        <meta 
          name="keywords" 
          content="audit digital, diagnostic digital, évaluation digitale, stratégie digitale, La Réunion" 
        />
        <meta property="og:title" content="Audit Digital Gratuit - Évaluez votre maturité digitale" />
        <meta 
          property="og:description" 
          content="Obtenez un diagnostic complet de votre présence digitale et des recommandations personnalisées." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/audit" />
      </Head>
      <AuditForm />
    </>
  );
}