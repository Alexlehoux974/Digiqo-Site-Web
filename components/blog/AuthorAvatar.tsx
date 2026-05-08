import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AuthorAvatarProps {
  initials: string
  imageSrc?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { box: 'w-10 h-10', text: 'text-sm' },          // 40px — used in author-compact
  md: { box: 'w-11 h-11', text: 'text-base' },        // 44px
  lg: { box: 'w-[120px] h-[120px]', text: 'text-[42px]' }, // 120px — author-bio
} as const

// Renders the photo when imageSrc is set, otherwise falls back to initials
// on a bordeaux gradient. Keeps the visual consistent before photos exist.
export function AuthorAvatar({ initials, imageSrc, alt, size = 'sm', className }: AuthorAvatarProps) {
  const { box, text } = sizeMap[size]
  const sizeStyles = size === 'lg' ? { width: 120, height: 120 } : undefined

  if (imageSrc) {
    return (
      <span
        className={cn(
          'relative rounded-full overflow-hidden border-2 border-white ring-1 ring-slate-200 shadow-sm flex-shrink-0',
          box,
          className,
        )}
        style={sizeStyles}
      >
        <Image src={imageSrc} alt={alt ?? initials} fill className="object-cover" sizes={size === 'lg' ? '120px' : '44px'} />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'rounded-full flex items-center justify-center font-display font-bold text-white border-2 border-white ring-1 ring-slate-200 flex-shrink-0',
        'bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark',
        size === 'lg' && 'shadow-digiqo-lg',
        box,
        text,
        className,
      )}
      style={sizeStyles}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
