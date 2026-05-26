// Block-level markdown renderer for pipeline-generated articles.
//
// Why a custom parser instead of react-markdown:
// - Inline parsing already exists in RichText (the same parser the TS
//   structured articles use). We reuse it so MD and TS articles render
//   inline text identically (**bold**, *italic*, [link](url), ^sup^).
// - We only need a handful of block types — the Writer agent produces a
//   constrained grammar: H1 (skipped, shown in ArticleHero), H2, H3,
//   paragraphs, unordered lists, blockquotes. No need for a 100 KB
//   library to handle the full CommonMark spec.
// - Zero new npm dependency (the repo deliberately ships no markdown lib).
//
// Limitations: no tables, no code fences, no images. The pipeline doesn't
// emit those today; if/when it does, extend the parser here.

import { RichText } from './RichText'

type Block =
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'h3'; id: string; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'blockquote'; text: string }

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Parse raw markdown body into a flat list of typed blocks. The H1 (if
 *  present at line 0) is stripped — the article title is rendered by
 *  ArticleHero, not duplicated in the body. */
export function parseMarkdownBody(source: string): Block[] {
  const lines = source.split('\n')
  const blocks: Block[] = []
  let i = 0

  // Skip leading H1 (title rendered by ArticleHero)
  while (i < lines.length && lines[i].trim() === '') i++
  if (i < lines.length && lines[i].startsWith('# ')) {
    i++
    while (i < lines.length && lines[i].trim() === '') i++
  }

  let paraBuf: string[] = []
  let listBuf: string[] = []
  let quoteBuf: string[] = []

  const flushPara = () => {
    if (paraBuf.length) {
      blocks.push({ kind: 'paragraph', text: paraBuf.join(' ').trim() })
      paraBuf = []
    }
  }
  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ kind: 'list', items: listBuf })
      listBuf = []
    }
  }
  const flushQuote = () => {
    if (quoteBuf.length) {
      blocks.push({ kind: 'blockquote', text: quoteBuf.join(' ').trim() })
      quoteBuf = []
    }
  }
  const flushAll = () => {
    flushPara()
    flushList()
    flushQuote()
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      flushAll()
      i++
      continue
    }

    if (line.startsWith('## ')) {
      flushAll()
      const text = line.slice(3).trim()
      blocks.push({ kind: 'h2', id: slugify(text), text })
      i++
      continue
    }
    if (line.startsWith('### ')) {
      flushAll()
      const text = line.slice(4).trim()
      blocks.push({ kind: 'h3', id: slugify(text), text })
      i++
      continue
    }
    if (line.startsWith('> ')) {
      flushPara()
      flushList()
      quoteBuf.push(line.slice(2).trim())
      i++
      continue
    }
    if (/^\s*[-*]\s+/.test(line)) {
      flushPara()
      flushQuote()
      const item = line.replace(/^\s*[-*]\s+/, '')
      listBuf.push(item)
      i++
      continue
    }
    // Plain text → paragraph (continues across consecutive non-empty lines)
    flushList()
    flushQuote()
    paraBuf.push(trimmed)
    i++
  }
  flushAll()

  return blocks
}

interface MarkdownBodyProps {
  source: string
  className?: string
}

const PROSE_PARA =
  'font-sans text-[17px] text-digiqo-black/85 leading-[1.65] mt-4'
const PROSE_H2 =
  'font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] mt-14 scroll-mt-[96px]'
const PROSE_H3 =
  'font-display font-semibold text-[22px] text-digiqo-black tracking-[-0.02em] leading-[1.3] mt-10 scroll-mt-[96px]'
const PROSE_LIST =
  'mt-4 ml-6 list-disc space-y-2 text-[17px] text-digiqo-black/85 leading-[1.6]'
const PROSE_QUOTE =
  'mt-6 pl-5 border-l-4 border-digiqo-primary/40 italic text-digiqo-black/75 text-[17px] leading-[1.55]'

export function MarkdownBody({ source, className }: MarkdownBodyProps) {
  const blocks = parseMarkdownBody(source)

  return (
    <div className={className}>
      {blocks.map((b, idx) => {
        switch (b.kind) {
          case 'h2':
            return (
              <h2 key={idx} id={b.id} className={PROSE_H2}>
                <RichText source={b.text} />
              </h2>
            )
          case 'h3':
            return (
              <h3 key={idx} id={b.id} className={PROSE_H3}>
                <RichText source={b.text} />
              </h3>
            )
          case 'paragraph':
            return (
              <p key={idx} className={PROSE_PARA}>
                <RichText source={b.text} />
              </p>
            )
          case 'list':
            return (
              <ul key={idx} className={PROSE_LIST}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <RichText source={item} />
                  </li>
                ))}
              </ul>
            )
          case 'blockquote':
            return (
              <blockquote key={idx} className={PROSE_QUOTE}>
                <RichText source={b.text} />
              </blockquote>
            )
        }
      })}
    </div>
  )
}
