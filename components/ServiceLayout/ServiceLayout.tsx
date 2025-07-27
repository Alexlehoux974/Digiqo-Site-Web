import { ReactNode } from 'react'
import { HeaderLuxury } from '../Header'
import { Footer } from '../Footer'

interface ServiceLayoutProps {
  children: ReactNode
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <>
      <HeaderLuxury />

      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>

  )
}