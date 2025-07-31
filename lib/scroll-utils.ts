// Utility function for instant scroll to elements
export function scrollToElement(elementId: string) {
  const element = document.querySelector(elementId)
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
}

// Utility function to handle internal links with instant scroll
export function handleInternalLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith('#')) {
    e.preventDefault()
    scrollToElement(href)
  }
}