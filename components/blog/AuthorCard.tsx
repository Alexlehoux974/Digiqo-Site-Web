import Link from 'next/link'
import { Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthorAvatar } from './AuthorAvatar'
import type { ArticleAuthor } from './types'

interface AuthorCardCompactProps {
  author: ArticleAuthor
  className?: string
}

export function AuthorCardCompact({ author, className }: AuthorCardCompactProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3.5 pl-2.5 pr-[18px] py-2.5 rounded-full',
        'bg-white border border-slate-200 shadow-sm',
        className,
      )}
    >
      <AuthorAvatar initials={author.initials} alt={author.name} size="sm" />
      <div>
        <div className="font-display font-bold text-digiqo-black text-[14px] leading-tight">
          {author.name}
        </div>
        <div className="text-[12.5px] text-slate-500 mt-0.5">{author.role}</div>
      </div>
    </div>
  )
}

interface AuthorCardExtendedProps {
  author: ArticleAuthor
  className?: string
}

export function AuthorCardExtended({ author, className }: AuthorCardExtendedProps) {
  return (
    <section
      className={cn(
        'mt-14 p-8 rounded-2xl border border-slate-200',
        'bg-gradient-to-br from-white to-slate-50',
        'grid gap-7 sm:grid-cols-[120px_1fr] grid-cols-1',
        className,
      )}
    >
      <AuthorAvatar initials={author.initials} alt={author.name} size="lg" />
      <div>
        <h3 className="font-display text-xl m-0 mb-1 text-digiqo-black">{author.name}</h3>
        <p className="text-digiqo-primary font-semibold text-sm m-0 mb-3.5">{author.role}</p>
        <p className="text-[15.5px] leading-[1.65] text-slate-600 m-0 mb-3.5">{author.bio}</p>

        <div className="flex flex-wrap gap-2 mb-3.5">
          {author.expertise.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[12.5px] text-slate-700 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3.5 items-center">
          {author.linkedinUrl && (
            <a
              href={author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-700 hover:text-digiqo-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          )}
          {author.authorPath && (
            <Link
              href={author.authorPath}
              className="text-[13.5px] font-semibold text-slate-700 hover:text-digiqo-primary transition-colors"
            >
              Tous les articles d'{author.name.split(' ')[0]} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

// Person JSON-LD for article author. Pair with BlogPosting.author.
export function buildPersonSchema(author: ArticleAuthor, siteUrl = 'https://digiqo.fr') {
  return {
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role.split('·')[0]?.trim() ?? author.role,
    description: author.bio,
    url: author.authorPath ? `${siteUrl}${author.authorPath}` : `${siteUrl}/agence`,
    sameAs: author.linkedinUrl ? [author.linkedinUrl] : undefined,
    knowsAbout: author.expertise,
  }
}
