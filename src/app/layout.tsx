import type { Metadata } from 'next'
import { Montserrat, Inter, Lora } from 'next/font/google'
import '@/styles/globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digiqo - Agence de Marketing Digital à La Réunion',
  description: 'Digiqo, votre partenaire digital à La Réunion. Publicité en ligne, développement web, community management, SEO, production vidéo et plus.',
  keywords: 'marketing digital, La Réunion, publicité en ligne, développement web, SEO, community management',
  openGraph: {
    title: 'Digiqo - Agence de Marketing Digital à La Réunion',
    description: 'Boostez votre présence digitale avec Digiqo',
    type: 'website',
    url: 'https://digiqo.fr',
    siteName: 'Digiqo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
