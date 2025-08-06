import AuditForm from '@/src/components/AuditForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit Digital Gratuit | Digiqo',
  description: 'Évaluez la maturité digitale de votre entreprise avec notre audit complet. Recevez des recommandations personnalisées pour améliorer votre présence en ligne.',
  keywords: 'audit digital, diagnostic digital, évaluation digitale, stratégie digitale, La Réunion',
  openGraph: {
    title: 'Audit Digital Gratuit - Évaluez votre maturité digitale',
    description: 'Obtenez un diagnostic complet de votre présence digitale et des recommandations personnalisées.',
    type: 'website',
    url: 'https://digiqo.fr/audit',
  },
};

export default function AuditPage() {
  return <AuditForm />;
}