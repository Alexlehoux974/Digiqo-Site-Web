// Utility function to generate contact form URLs with pre-filled data
export function generateContactUrl(params: {
  service?: string
  formula?: string
  description?: string
}): string {
  const baseUrl = '/'
  const queryParams = new URLSearchParams()
  
  if (params.service) {
    queryParams.append('service', params.service)
  }
  
  if (params.formula) {
    queryParams.append('formula', params.formula)
  }
  
  if (params.description) {
    queryParams.append('description', params.description)
  }
  
  // Add a flag to indicate instant scroll
  queryParams.append('instant', 'true')
  
  const queryString = queryParams.toString()
  return `${baseUrl}${queryString ? '?' + queryString : ''}#contact`
}