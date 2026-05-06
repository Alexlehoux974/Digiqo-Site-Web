// Static link to the public Trustpilot profile (digiqo.tech).
// The Digiqo Trustpilot account is currently inaccessible (domain change),
// so we cannot embed the official live widget. This component renders a
// styled link that points at the public review page instead — Googlebot
// and LLM crawlers still get a clear, attributable rating signal.
//
// When the Trustpilot account is recovered:
//   1. Fetch the Business Unit ID from business.trustpilot.com.
//   2. Restore the official .trustpilot-widget div + bootstrap script
//      (see git history for [P0-SEO][4]).
//
// Update RATING / REVIEW_COUNT here and in lib/seo-config.ts when the
// public profile rating changes.

type Variant = 'mini' | 'score' | 'carousel' | 'microcombo'

const TRUSTPILOT_REVIEW_URL = 'https://fr.trustpilot.com/review/digiqo.tech'
const RATING = '4,7'
const REVIEW_COUNT = 30
const STARS = '★★★★★'

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
  const isDark = theme === 'dark'
  const baseClasses =
    'transition-colors duration-200 ' +
    (isDark
      ? 'text-gray-200 hover:text-white'
      : 'text-gray-700 hover:text-digiqo-primary')

  const wrapperClass = `${baseClasses}${className ? ` ${className}` : ''}`

  if (variant === 'score') {
    return (
      <a
        href={TRUSTPILOT_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${wrapperClass} flex flex-col items-center gap-1`}
        aria-label={`Note Trustpilot ${RATING} sur 5 — ${REVIEW_COUNT} avis`}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">
          {RATING}
          <span className="text-2xl md:text-3xl">/5</span>
        </span>
        <span className="text-yellow-500 text-lg md:text-xl tracking-wider">
          {STARS}
        </span>
        <span className="text-xs uppercase tracking-wider opacity-70">
          {REVIEW_COUNT} avis Trustpilot
        </span>
      </a>
    )
  }

  if (variant === 'carousel') {
    return (
      <a
        href={TRUSTPILOT_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${wrapperClass} block text-center`}
        aria-label={`Voir les ${REVIEW_COUNT} avis Trustpilot Digiqo`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-yellow-500 text-2xl tracking-wider">{STARS}</span>
          <span className="text-2xl font-bold">
            {RATING}<span className="opacity-70">/5</span>
          </span>
        </div>
        <p className="mt-2 text-sm">
          {REVIEW_COUNT} avis vérifiés sur Trustpilot
        </p>
        <p className="mt-3 text-sm underline">
          Voir tous les avis sur Trustpilot
        </p>
      </a>
    )
  }

  // mini / microcombo: compact inline format for tight spots like the footer
  return (
    <a
      href={TRUSTPILOT_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${wrapperClass} inline-flex items-center gap-2 text-sm`}
      aria-label={`Note Trustpilot ${RATING} sur 5 — ${REVIEW_COUNT} avis`}
    >
      <span className="text-yellow-500 tracking-wider">{STARS}</span>
      <span>
        Trustpilot {RATING}/5 — {REVIEW_COUNT} avis
      </span>
    </a>
  )
}
