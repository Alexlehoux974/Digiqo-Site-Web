import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function useInstantScroll() {
  const router = useRouter()
  
  useEffect(() => {
    // Function to handle instant scroll
    const handleInstantScroll = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const isInstant = urlParams.get('instant') === 'true'
      const hash = window.location.hash
      
      if (isInstant && hash) {
        // Wait for DOM to be ready
        setTimeout(() => {
          const element = document.querySelector(hash)
          if (element) {
            // Save current scroll behavior
            const htmlElement = document.documentElement
            const originalScrollBehavior = htmlElement.style.scrollBehavior
            
            // Set instant scroll
            htmlElement.style.scrollBehavior = 'auto'
            
            // Scroll to element instantly
            element.scrollIntoView({ behavior: 'auto', block: 'start' })
            
            // Restore original scroll behavior after a short delay
            setTimeout(() => {
              htmlElement.style.scrollBehavior = originalScrollBehavior
            }, 100)
          }
        }, 0)
      }
    }
    
    // Handle initial load
    handleInstantScroll()
    
    // Handle route changes
    router.events.on('routeChangeComplete', handleInstantScroll)
    
    return () => {
      router.events.off('routeChangeComplete', handleInstantScroll)
    }
  }, [router])
}