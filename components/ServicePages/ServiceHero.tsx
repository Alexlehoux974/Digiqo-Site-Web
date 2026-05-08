import React from 'react'
import { LucideIcon } from 'lucide-react'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { ArrowRight, Sparkles } from 'lucide-react'

interface ServiceHeroProps {
  icon: LucideIcon
  title: {
    line1: string
    line2: string
  }
  subtitle: string
  ctaButtons?: {
    primary?: {
      text: string
      href: string
    }
    secondary?: {
      text: string
      href: string
    }
  }
  gradientFrom?: string
  gradientTo?: string
  iconColor?: string
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  icon: Icon,
  title,
  subtitle,
  ctaButtons,
  gradientFrom = 'from-digiqo-accent',
  gradientTo = 'to-amber-400',
  iconColor = 'text-digiqo-accent'
}) => {
  return (
    <section className="relative min-h-[80vh] pt-56 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary">
      {/* Animated gradient orbs */}
      <HeroGradientOrbs />
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-4 text-center">
        <div className="space-y-8">
          {/* Static icon (was springIn entry — stripped for above-the-fold TBT) */}
          <div className="inline-flex">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-3xl blur-2xl opacity-50 animate-pulse`} />
              <div className="relative bg-gradient-to-br from-digiqo-primary to-digiqo-primary/80 p-8 rounded-3xl border border-digiqo-primary/30">
                <Icon className={`w-16 h-16 ${iconColor}`} />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold">
              <span className="text-white break-all xs:break-words">{title.line1}</span>
              <br />
              <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent break-all xs:break-words pr-1`}>
                {title.line2}
              </span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto px-2 sm:px-0">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          {ctaButtons && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
              {ctaButtons.primary && (
                <a
                  href={ctaButtons.primary.href}
                  {...(ctaButtons.primary.href.startsWith('http') && !ctaButtons.primary.href.includes('digiqo') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r ${gradientFrom} ${gradientTo.replace('to-', 'to-')} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 active:scale-95`}
                >
                  {ctaButtons.primary.text}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {ctaButtons.secondary && (
                <a
                  href={ctaButtons.secondary.href}
                  {...(ctaButtons.secondary.href.startsWith('http') && !ctaButtons.secondary.href.includes('digiqo') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-digiqo-secondary/90 text-white font-bold rounded-2xl border border-digiqo-secondary/50 hover:border-digiqo-secondary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 active:scale-95"
                >
                  {ctaButtons.secondary.text}
                  <Sparkles className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}