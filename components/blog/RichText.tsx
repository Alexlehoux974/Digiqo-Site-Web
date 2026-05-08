// Tiny markdown subset → JSX renderer.
//
// Parses string source into an array of typed inline nodes, then converts
// each node to a React element via React.createElement. Never injects HTML
// strings, so no XSS surface even if `source` came from an untrusted CMS.
//
// Supported syntax:
//   **bold**           → <strong>
//   *italic*           → <em>
//   [text](url)        → <a> (rel="nofollow noopener" auto-injected for
//                         absolute http(s) URLs; internal paths stay clean)
//   ^sup^              → <sup>
//   <em>...</em>       → <em> (literal HTML — only this single tag; used
//                         in section titles for "Quand <em>ne pas</em>")
//   \n\n               → paragraph break (only when `as` resolves to <p>)
//
// Unrecognized characters are rendered as plain text (no fallback to
// dangerous HTML interpretation).

import { Fragment, createElement } from 'react'
import type { ReactNode } from 'react'

type InlineNode =
  | { kind: 'text'; value: string }
  | { kind: 'strong'; children: InlineNode[] }
  | { kind: 'em'; children: InlineNode[] }
  | { kind: 'sup'; children: InlineNode[] }
  | { kind: 'link'; href: string; children: InlineNode[] }

interface RichTextProps {
  source: string
  /** Wrapper element. Defaults to span. Pass 'p' for paragraph wrappers
   *  (which also enables \n\n → multiple <p> support). */
  as?: 'span' | 'p' | 'div'
  className?: string
  /** Extra Tailwind classes for inline links (matches digiqo-primary style by default). */
  linkClassName?: string
}

const DEFAULT_LINK_CLASS =
  'text-digiqo-primary font-medium underline decoration-digiqo-primary underline-offset-2 hover:text-digiqo-accent hover:decoration-digiqo-accent'

export function RichText({ source, as = 'span', className, linkClassName }: RichTextProps) {
  const linkCls = linkClassName ?? DEFAULT_LINK_CLASS

  // For <p>, support paragraph breaks via \n\n splitting.
  if (as === 'p') {
    const paragraphs = source.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean)
    if (paragraphs.length === 0) return null
    if (paragraphs.length === 1) {
      return (
        <p className={className}>
          {renderInline(parseInline(paragraphs[0]), linkCls)}
        </p>
      )
    }
    return (
      <>
        {paragraphs.map((para, idx) => (
          <p key={idx} className={className}>
            {renderInline(parseInline(para), linkCls)}
          </p>
        ))}
      </>
    )
  }

  return createElement(
    as,
    { className },
    renderInline(parseInline(source), linkCls),
  )
}

// ─── Parser ────────────────────────────────────────────────────────────────
// State-machine token parser. Walks the string char by char, recognizes
// delimiters, and produces a node tree. Markdown delimiters are matched
// non-greedy and respect each-other (no nested ** within ** because we
// don't need that level of expressiveness).

export function parseInline(source: string): InlineNode[] {
  const nodes: InlineNode[] = []
  let i = 0
  const len = source.length
  let textBuffer = ''

  const flushText = () => {
    if (textBuffer) {
      nodes.push({ kind: 'text', value: textBuffer })
      textBuffer = ''
    }
  }

  while (i < len) {
    // Markdown link [text](url) — must come before bold/italic so the
    // brackets don't get eaten as plain text.
    if (source[i] === '[') {
      const end = findClosingBracketLink(source, i)
      if (end) {
        flushText()
        nodes.push({
          kind: 'link',
          href: end.href,
          children: parseInline(end.text),
        })
        i = end.afterIndex
        continue
      }
    }

    // Bold **...**
    if (source[i] === '*' && source[i + 1] === '*') {
      const close = source.indexOf('**', i + 2)
      if (close !== -1) {
        flushText()
        nodes.push({ kind: 'strong', children: parseInline(source.slice(i + 2, close)) })
        i = close + 2
        continue
      }
    }

    // Italic *...*  (single * not adjacent to another *)
    if (source[i] === '*' && source[i + 1] !== '*' && source[i - 1] !== '*') {
      const close = findSingleAsterisk(source, i + 1)
      if (close !== -1) {
        flushText()
        nodes.push({ kind: 'em', children: parseInline(source.slice(i + 1, close)) })
        i = close + 1
        continue
      }
    }

    // Sup ^...^
    if (source[i] === '^') {
      const close = source.indexOf('^', i + 1)
      if (close !== -1 && close > i + 1) {
        flushText()
        nodes.push({ kind: 'sup', children: parseInline(source.slice(i + 1, close)) })
        i = close + 1
        continue
      }
    }

    // Literal <em>...</em> tag (only this tag, only for title emphasis).
    if (source.startsWith('<em>', i)) {
      const close = source.indexOf('</em>', i + 4)
      if (close !== -1) {
        flushText()
        nodes.push({ kind: 'em', children: parseInline(source.slice(i + 4, close)) })
        i = close + 5
        continue
      }
    }

    textBuffer += source[i]
    i += 1
  }

  flushText()
  return nodes
}

function findClosingBracketLink(
  source: string,
  start: number,
): { text: string; href: string; afterIndex: number } | null {
  // Match [text](url) — text may contain nested brackets minimally;
  // url cannot contain unescaped `)`.
  let i = start + 1
  let depth = 1
  while (i < source.length && depth > 0) {
    const c = source[i]
    if (c === '[') depth += 1
    else if (c === ']') depth -= 1
    if (depth > 0) i += 1
  }
  if (depth !== 0) return null
  if (source[i + 1] !== '(') return null
  const text = source.slice(start + 1, i)
  const urlEnd = source.indexOf(')', i + 2)
  if (urlEnd === -1) return null
  const href = source.slice(i + 2, urlEnd)
  return { text, href, afterIndex: urlEnd + 1 }
}

function findSingleAsterisk(source: string, from: number): number {
  // Skip ** boundaries and find a single * that is not part of **.
  for (let i = from; i < source.length; i += 1) {
    if (source[i] === '*' && source[i + 1] !== '*' && source[i - 1] !== '*') return i
  }
  return -1
}

// ─── Renderer ──────────────────────────────────────────────────────────────

function renderInline(nodes: InlineNode[], linkCls: string): ReactNode {
  return nodes.map((node, idx) => renderNode(node, idx, linkCls))
}

function renderNode(node: InlineNode, key: number, linkCls: string): ReactNode {
  switch (node.kind) {
    case 'text':
      return node.value
    case 'strong':
      return (
        <strong key={key} className="font-semibold text-digiqo-black">
          {renderInline(node.children, linkCls)}
        </strong>
      )
    case 'em':
      return <em key={key}>{renderInline(node.children, linkCls)}</em>
    case 'sup':
      return <sup key={key}>{renderInline(node.children, linkCls)}</sup>
    case 'link': {
      const isExternal = /^https?:\/\//i.test(node.href)
      if (isExternal) {
        return (
          <a
            key={key}
            href={node.href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={linkCls}
          >
            {renderInline(node.children, linkCls)}
          </a>
        )
      }
      return (
        <a key={key} href={node.href} className={linkCls}>
          {renderInline(node.children, linkCls)}
        </a>
      )
    }
    default:
      return <Fragment key={key} />
  }
}

// ─── Plain text extractor ──────────────────────────────────────────────────
// Used by buildArticleSchemas to produce JSON-LD plain text from markdown
// strings (FAQPage acceptedAnswer.text requires plain text, no markdown).

export function stripMarkdown(source: string): string {
  const nodes = parseInline(source)
  return flattenNodes(nodes).replace(/\s+/g, ' ').trim()
}

function flattenNodes(nodes: InlineNode[]): string {
  return nodes
    .map((node) => {
      switch (node.kind) {
        case 'text':
          return node.value
        case 'strong':
        case 'em':
        case 'sup':
        case 'link':
          return flattenNodes(node.children)
        default:
          return ''
      }
    })
    .join('')
}
