// Trustpilot TrustBox widget. The bootstrap script in pages/_app.tsx scans
// for .trustpilot-widget elements after load and replaces their content
// with the live widget. Until then (and for crawlers / JS-disabled users),
// the static fallback link inside the div is what shows.
//
// Update the fallback rating when the JSON-LD aggregateRating in
// lib/seo-config.ts is updated, so SSR fallback and structured data agree.

type Variant = 'mini' | 'score' | 'carousel' | 'microcombo'

const TEMPLATE_IDS: Record<Variant, string> = {
  mini: '53aa8807dec7e10d38f59f32',
  score: '5419b637fa0340045cd0c936',
  carousel: '53aa8912dec7e10d38f59f36',
  microcombo: '5419b6ffb0d04a076446a9af',
}

const HEIGHTS: Record<Variant, string> = {
  mini: '24px',
  score: '130px',
  carousel: '240px',
  microcombo: '40px',
}

const BUSINESS_UNIT_ID =
  process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID ?? ''

const TRUSTPILOT_REVIEW_URL = 'https://fr.trustpilot.com/review/digiqo.tech'
const FALLBACK_LABEL = 'Note Trustpilot : 4,7/5 sur 30 avis ★★★★★'

interface TrustpilotWidgetProps {
  variant: Variant
  theme?: 'light' | 'dark'
  className?: string
}

export function TrustpilotWidget({
  variant,
  theme = 'light',
  className,
}: TrustpilotWidgetProps) {
  return (
    <div
      className={`trustpilot-widget${className ? ` ${className}` : ''}`}
      data-locale="fr-FR"
      data-template-id={TEMPLATE_IDS[variant]}
      data-businessunit-id={BUSINESS_UNIT_ID}
      data-style-height={HEIGHTS[variant]}
      data-style-width="100%"
      data-theme={theme}
    >
      <a
        href={TRUSTPILOT_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline"
      >
        {FALLBACK_LABEL}
      </a>
    </div>
  )
}
