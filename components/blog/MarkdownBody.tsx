// Block-level markdown renderer for pipeline-generated articles.
//
// Phase 5 extension: parses custom directives `:::name[label]{attrs}\n...\n:::`
// emitted by the Visual Enricher agent (WF5.5) and maps them to the existing
// Sprint 2 rich components (TldrBox, QuickAnswer, BarChart, etc.). Inline
// markdown (bold/italic/link/sup) is delegated to RichText as before.

import type { ReactNode } from 'react'
import { BarChart, type BarChartRow } from './BarChart'
import { BlogCTA } from './BlogCTA'
import { CallOut } from './CallOut'
import { ComparisonTable, type ComparisonCell } from './ComparisonTable'
import { DefinitionBox } from './DefinitionBox'
import { FAQ } from './FAQ'
import { InlineQA } from './InlineQA'
import { NumberedSteps } from './NumberedSteps'
import { PullQuote } from './PullQuote'
import { QuickAnswer } from './QuickAnswer'
import { RichText } from './RichText'
import { SourcesBlock } from './SourcesBlock'
import { StatHero } from './StatHero'
import { TldrBox } from './TldrBox'
import type { CalloutVariant, FAQItem, SourceRef } from './types'

// ─── Block model ─────────────────────────────────────────────────────────

type PlainBlock =
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'h3'; id: string; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'blockquote'; text: string }

interface DirectiveBlock {
  kind: 'directive'
  name: string
  label?: string
  attrs: Record<string, string>
  body: string[]
}

type Block = PlainBlock | DirectiveBlock

// ─── Directive regex ─────────────────────────────────────────────────────

const DIRECTIVE_OPEN = /^:::([a-z][a-z0-9-]*)(?:\[(.+?)\])?(?:\{(.*?)\})?\s*$/
const DIRECTIVE_CLOSE = /^:::\s*$/

function parseAttrs(s: string): Record<string, string> {
  const result: Record<string, string> = {}
  if (!s) return result
  const re = /([a-z][a-z0-9-]*)=(?:"([^"]*)"|([^\s"}]+))/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(s)) !== null) {
    result[m[1]] = m[2] !== undefined ? m[2] : m[3]
  }
  return result
}

// ─── Slugifier (for H2/H3 anchor ids) ────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// ─── Top-level parser ────────────────────────────────────────────────────

/** Parse raw markdown body into a flat list of typed blocks. The H1 (if
 *  present at line 0) is stripped — the article title is rendered by
 *  ArticleHero, not duplicated in the body. */
export function parseMarkdownBody(source: string): Block[] {
  const lines = source.split('\n')
  const blocks: Block[] = []
  let i = 0

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

    const dirMatch = trimmed.match(DIRECTIVE_OPEN)
    if (dirMatch) {
      flushAll()
      const [, name, label, attrsStr] = dirMatch
      const attrs = parseAttrs(attrsStr ?? '')
      i++
      const body: string[] = []
      while (i < lines.length && !DIRECTIVE_CLOSE.test(lines[i].trim())) {
        body.push(lines[i])
        i++
      }
      if (i < lines.length) i++
      blocks.push({ kind: 'directive', name, label, attrs, body })
      continue
    }

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
      listBuf.push(line.replace(/^\s*[-*]\s+/, ''))
      i++
      continue
    }
    flushList()
    flushQuote()
    paraBuf.push(trimmed)
    i++
  }
  flushAll()

  return blocks
}

// ─── Directive body parsers ──────────────────────────────────────────────

function parseKeyedLists(body: string[]): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  let currentKey: string | null = null
  for (const raw of body) {
    const line = raw.replace(/\s+$/, '')
    if (line.trim() === '') continue
    const headerMatch = line.match(/^([a-z][a-z0-9-]*):\s*$/i)
    if (headerMatch) {
      currentKey = headerMatch[1]
      result[currentKey] = []
      continue
    }
    const itemMatch = line.match(/^\s*-\s+(.*)$/)
    if (itemMatch && currentKey) {
      result[currentKey].push(itemMatch[1].trim())
    }
  }
  return result
}

function parseSimpleKv(body: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  let currentKey: string | null = null
  for (const raw of body) {
    const line = raw.replace(/\s+$/, '')
    const kvMatch = line.match(/^([a-z][a-z0-9-]*):\s*(.*)$/i)
    if (kvMatch) {
      currentKey = kvMatch[1]
      result[currentKey] = kvMatch[2]
      continue
    }
    if (currentKey && line.trim() !== '') {
      result[currentKey] = (result[currentKey] + ' ' + line.trim()).trim()
    }
  }
  return result
}

function parseFaqList(body: string[]): FAQItem[] {
  const items: FAQItem[] = []
  let current: { question: string; answer: string } | null = null
  let activeKey: 'question' | 'answer' | null = null
  for (const raw of body) {
    const line = raw.replace(/\s+$/, '')
    if (line.trim() === '') continue
    const qStart = line.match(/^-\s+q:\s*(.*)$/i)
    if (qStart) {
      if (current) items.push(current)
      current = { question: qStart[1].trim(), answer: '' }
      activeKey = 'question'
      continue
    }
    const aStart = line.match(/^\s+a:\s*(.*)$/i)
    if (aStart && current) {
      current.answer = aStart[1].trim()
      activeKey = 'answer'
      continue
    }
    if (current && activeKey) {
      const text = line.trim()
      if (activeKey === 'question') current.question = (current.question + ' ' + text).trim()
      else current.answer = (current.answer + ' ' + text).trim()
    }
  }
  if (current) items.push(current)
  return items
}

function parseSourcesList(body: string[]): SourceRef[] {
  const items: SourceRef[] = []
  let current: Partial<SourceRef> | null = null
  for (const raw of body) {
    const line = raw.replace(/\s+$/, '')
    if (line.trim() === '') continue
    const newItemMatch = line.match(/^-\s+([a-z][a-z0-9-]*):\s*(.*)$/i)
    const contMatch = line.match(/^\s+([a-z][a-z0-9-]*):\s*(.*)$/i)
    if (newItemMatch) {
      if (current && current.label) items.push(current as SourceRef)
      const [, key, value] = newItemMatch
      current = {}
      assignSourceField(current, key, value)
      continue
    }
    if (contMatch && current) {
      const [, key, value] = contMatch
      assignSourceField(current, key, value)
    }
  }
  if (current && current.label) items.push(current as SourceRef)
  return items
}

function assignSourceField(target: Partial<SourceRef>, key: string, value: string) {
  switch (key) {
    case 'label':
      target.label = value.trim()
      break
    case 'url':
      target.url = value.trim()
      break
    case 'description':
      target.description = value.trim()
      break
    case 'primary':
      target.primary = value.trim().toLowerCase() === 'true'
      break
  }
}

function parseTableRows(body: string[]): string[][] {
  const rows: string[][] = []
  for (const raw of body) {
    const line = raw.trim()
    if (!line.startsWith('|')) continue
    if (/^\|\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line)) continue
    const cells = line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())
    rows.push(cells)
  }
  return rows
}

function parseNumberedSteps(body: string[]): { title: string; body: string }[] {
  const steps: { title: string; body: string }[] = []
  let current: { title: string; body: string } | null = null
  for (const raw of body) {
    const line = raw.replace(/\s+$/, '')
    if (line.trim() === '') {
      continue
    }
    const stepMatch = line.match(/^\d+\.\s+(?:\*\*(.+?)\*\*|(.+))$/)
    if (stepMatch) {
      if (current) steps.push(current)
      const title = (stepMatch[1] ?? stepMatch[2] ?? '').trim()
      current = { title, body: '' }
      continue
    }
    if (current) {
      const trimmedContent = line.replace(/^\s+/, '')
      current.body = current.body
        ? current.body + ' ' + trimmedContent
        : trimmedContent
    }
  }
  if (current) steps.push(current)
  return steps
}

function parseComparisonCell(raw: string): ComparisonCell {
  const trimmed = raw.trim()
  const verdictMatch = trimmed.match(/^verdict-(left|right|tie):\s*(.+)$/)
  if (verdictMatch) {
    return { kind: 'verdict', value: verdictMatch[2].trim(), winner: verdictMatch[1] as 'left' | 'right' | 'tie' }
  }
  const badgeMatch = trimmed.match(/^badge-(good|mid|bad):\s*(.+)$/)
  if (badgeMatch) {
    return { kind: 'badge', value: badgeMatch[2].trim(), tone: badgeMatch[1] as 'good' | 'mid' | 'bad' }
  }
  const textMatch = trimmed.match(/^text:\s*(.+)$/)
  const value = textMatch ? textMatch[1].trim() : trimmed
  return { kind: 'text', value }
}

function parseCtaLink(raw: string): { label: string; href: string } | null {
  if (!raw) return null
  const match = raw.match(/^(.+?)\s*->\s*(.+)$/)
  if (!match) return null
  return { label: match[1].trim(), href: match[2].trim() }
}

// ─── Markdown body component ─────────────────────────────────────────────

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

interface MarkdownBodyProps {
  source: string
  className?: string
}

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
          case 'directive':
            return renderDirective(b, idx)
        }
      })}
    </div>
  )
}

// ─── Directive renderer dispatcher ───────────────────────────────────────

function renderDirective(d: DirectiveBlock, idx: number): ReactNode {
  switch (d.name) {
    case 'tldr':
      return <TldrDirective key={idx} body={d.body} />
    case 'quick-answer':
      return <QuickAnswerDirective key={idx} body={d.body} attrs={d.attrs} />
    case 'faq':
      return <FaqDirective key={idx} body={d.body} />
    case 'sources':
      return <SourcesDirective key={idx} body={d.body} />
    case 'cta':
      return <CtaDirective key={idx} body={d.body} attrs={d.attrs} />
    case 'definition':
      return <DefinitionDirective key={idx} label={d.label ?? ''} body={d.body} />
    case 'stat-hero':
      return <StatHeroDirective key={idx} attrs={d.attrs} body={d.body} />
    case 'bar-chart':
      return <BarChartDirective key={idx} attrs={d.attrs} body={d.body} />
    case 'comparison-table':
      return <ComparisonTableDirective key={idx} attrs={d.attrs} body={d.body} />
    case 'numbered-steps':
      return <NumberedStepsDirective key={idx} body={d.body} />
    case 'callout':
      return <CalloutDirective key={idx} attrs={d.attrs} body={d.body} />
    case 'pull-quote':
      return <PullQuoteDirective key={idx} attrs={d.attrs} body={d.body} />
    case 'inline-qa':
      return <InlineQADirective key={idx} attrs={d.attrs} body={d.body} />
    default:
      return (
        <div key={idx}>
          <div dangerouslySetInnerHTML={{ __html: `<!-- unknown directive: ${d.name} -->` }} />
          {d.body
            .filter((l) => l.trim() !== '')
            .map((line, i) => (
              <p key={i} className={PROSE_PARA}>
                <RichText source={line.trim()} />
              </p>
            ))}
        </div>
      )
  }
}

// ─── Directive components ────────────────────────────────────────────────

function TldrDirective({ body }: { body: string[] }) {
  const data = parseKeyedLists(body)
  const forWhom = data['for-whom'] ?? data['forWhom'] ?? []
  const whatYouLearn = data['what-you-learn'] ?? data['whatYouLearn'] ?? []
  if (forWhom.length === 0 && whatYouLearn.length === 0) return null
  return (
    <div className="mt-8">
      <TldrBox forWhom={forWhom} whatYouLearn={whatYouLearn} />
    </div>
  )
}

function QuickAnswerDirective({
  body,
  attrs,
}: {
  body: string[]
  attrs: Record<string, string>
}) {
  let question = ''
  const answerLines: string[] = []
  let foundQuestion = false
  for (const line of body) {
    if (!foundQuestion) {
      const m = line.match(/^question:\s*(.+)$/i)
      if (m) {
        question = m[1].trim()
        foundQuestion = true
        continue
      }
    }
    answerLines.push(line)
  }
  const answer = answerLines.join('\n').trim()
  const wordCount = answer.split(/\s+/).filter((w) => w.length > 0).length
  if (!question || !answer) return null
  return (
    <div className="mt-8">
      <QuickAnswer
        question={question}
        answer={answer}
        wordCount={wordCount}
        targetQuery={attrs['target-query'] ?? attrs['targetQuery'] ?? ''}
      />
    </div>
  )
}

function FaqDirective({ body }: { body: string[] }) {
  const items = parseFaqList(body)
  if (items.length === 0) return null
  return (
    <FAQ
      title="Questions fréquentes"
      subtitle="Les questions qu'on nous pose le plus en consultation."
      items={items}
    />
  )
}

function SourcesDirective({ body }: { body: string[] }) {
  const sources = parseSourcesList(body)
  if (sources.length === 0) return null
  return <SourcesBlock sources={sources} />
}

function CtaDirective({
  body,
  attrs,
}: {
  body: string[]
  attrs: Record<string, string>
}) {
  const kv = parseSimpleKv(body)
  const primary = parseCtaLink(kv['primary'] ?? '')
  const secondary = parseCtaLink(kv['secondary'] ?? '')
  if (!primary) return null
  return (
    <BlogCTA
      eyebrow={attrs['eyebrow'] ?? kv['eyebrow'] ?? 'Audit gratuit'}
      heading={kv['heading'] ?? ''}
      body={kv['body'] ?? ''}
      primary={primary}
      secondary={secondary ?? undefined}
    />
  )
}

function DefinitionDirective({ label, body }: { label: string; body: string[] }) {
  const text = body.join('\n').trim()
  return (
    <DefinitionBox term={label}>
      <RichText source={text} />
    </DefinitionBox>
  )
}

function StatHeroDirective({
  attrs,
  body,
}: {
  attrs: Record<string, string>
  body: string[]
}) {
  const value = attrs['value'] ?? ''
  const sourceLabel = attrs['source-label'] ?? attrs['sourceLabel'] ?? ''
  const sourceUrl = attrs['source-url'] ?? attrs['sourceUrl']
  const text = body.join('\n').trim()
  if (!value) return null
  return (
    <StatHero value={value} sourceLabel={sourceLabel} sourceUrl={sourceUrl}>
      <RichText source={text} />
    </StatHero>
  )
}

function BarChartDirective({
  attrs,
  body,
}: {
  attrs: Record<string, string>
  body: string[]
}) {
  const rawRows = parseTableRows(body)
  if (rawRows.length < 2) return null
  const dataRows = rawRows.slice(1)
  const rows: BarChartRow[] = dataRows
    .map((cells): BarChartRow | null => {
      if (cells.length < 3) return null
      const [label, widthPctStr, valueLabel] = cells
      const widthPct = parseFloat(widthPctStr)
      if (!label || Number.isNaN(widthPct) || !valueLabel) return null
      return { label, widthPct, valueLabel }
    })
    .filter((r): r is BarChartRow => r !== null)
  if (rows.length === 0) return null
  return <BarChart title={attrs['title'] ?? ''} rows={rows} />
}

function ComparisonTableDirective({
  attrs,
  body,
}: {
  attrs: Record<string, string>
  body: string[]
}) {
  const rawRows = parseTableRows(body)
  if (rawRows.length < 2) return null
  const headers = rawRows[0]
  const dataRows = rawRows.slice(1).map((row) => row.map(parseComparisonCell))
  return (
    <ComparisonTable
      title={attrs['title'] ?? ''}
      subtitle={attrs['subtitle']}
      headers={headers}
      rows={dataRows}
    />
  )
}

function NumberedStepsDirective({ body }: { body: string[] }) {
  const steps = parseNumberedSteps(body)
  if (steps.length === 0) return null
  return (
    <NumberedSteps
      steps={steps.map((s) => ({
        title: s.title,
        body: <RichText source={s.body} />,
      }))}
    />
  )
}

function CalloutDirective({
  attrs,
  body,
}: {
  attrs: Record<string, string>
  body: string[]
}) {
  const variant = (attrs['variant'] ?? 'anecdote') as CalloutVariant
  const label = attrs['label'] ?? ''
  const statValue = attrs['stat-value'] ?? attrs['statValue']
  const text = body.join('\n').trim()
  return (
    <CallOut variant={variant} label={label} statValue={statValue}>
      <RichText source={text} as="p" />
    </CallOut>
  )
}

function PullQuoteDirective({
  attrs,
  body,
}: {
  attrs: Record<string, string>
  body: string[]
}) {
  const attribution = attrs['attribution']
  const text = body.join('\n').trim()
  return <PullQuote attribution={attribution}>{text}</PullQuote>
}

function InlineQADirective({
  attrs,
  body,
}: {
  attrs: Record<string, string>
  body: string[]
}) {
  const question = attrs['question'] ?? ''
  const text = body.join('\n').trim()
  if (!question) return null
  return (
    <InlineQA question={question}>
      <RichText source={text} />
    </InlineQA>
  )
}
