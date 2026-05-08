// Maps a serializable ArticleBlock to its matching React component.
//
// One switch case per block.type. RichText handles inline markdown for any
// text-bearing field. ComparisonCellData (string-based) is promoted to the
// runtime ComparisonCell (with React nodes) here so the table component
// stays unaware of the data layer.

import { BarChart } from './BarChart'
import { CallOut } from './CallOut'
import { ComparisonTable, type ComparisonCell } from './ComparisonTable'
import { DefinitionBox } from './DefinitionBox'
import { InlineQA } from './InlineQA'
import { NumberedSteps } from './NumberedSteps'
import { PullQuote } from './PullQuote'
import { RichText } from './RichText'
import { StatHero } from './StatHero'
import type { ArticleBlock, ComparisonCellData } from './types'

interface BlockRendererProps {
  block: ArticleBlock
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <RichText
          source={block.text}
          as="p"
          className="text-[17.5px] leading-[1.78] text-slate-700 mt-4 [&+_*]:mt-4"
        />
      )

    case 'h3':
      return (
        <h3
          id={block.id}
          className="font-display font-bold text-[22px] text-slate-800 mt-9 mb-2 leading-[1.3] tracking-[-0.015em]"
        >
          <RichText source={block.text} />
        </h3>
      )

    case 'list':
      return (
        <ul className="mt-4 space-y-2.5 text-[17.5px] leading-[1.7] text-slate-700">
          {block.items.map((item, idx) => (
            <li
              key={idx}
              className="relative pl-7 before:content-[''] before:absolute before:left-1 before:top-[0.7em] before:w-2 before:h-2 before:bg-digiqo-primary before:rounded-full"
            >
              <RichText source={item} />
            </li>
          ))}
        </ul>
      )

    case 'definition':
      return (
        <DefinitionBox term={block.term}>
          <RichText source={block.body} />
        </DefinitionBox>
      )

    case 'statHero':
      return (
        <StatHero
          value={block.value}
          sourceLabel={block.sourceLabel}
          sourceUrl={block.sourceUrl}
        >
          <RichText source={block.body} />
        </StatHero>
      )

    case 'barChart':
      return <BarChart title={block.title} rows={block.rows} />

    case 'inlineQA':
      return (
        <InlineQA question={block.question}>
          <RichText source={block.answer} />
        </InlineQA>
      )

    case 'callout':
      return (
        <CallOut variant={block.variant} label={block.label} statValue={block.statValue}>
          <RichText source={block.body} as="p" />
        </CallOut>
      )

    case 'comparisonTable':
      return (
        <ComparisonTable
          title={block.title}
          subtitle={block.subtitle}
          headers={block.headers}
          rows={block.rows.map(promoteRow)}
        />
      )

    case 'numberedSteps':
      return (
        <NumberedSteps
          steps={block.steps.map((step) => ({
            title: step.title,
            body: <RichText source={step.body} />,
          }))}
        />
      )

    case 'pullQuote':
      return <PullQuote attribution={block.attribution}>{block.text}</PullQuote>
  }
}

// Promote a serializable cell (string value) to its runtime form (React
// node value). The badge / verdict variants pass through unchanged because
// their `value` is already a string in both shapes.
function promoteRow(row: ComparisonCellData[]): ComparisonCell[] {
  return row.map((cell): ComparisonCell => {
    switch (cell.kind) {
      case 'text':
        return { kind: 'text', value: cell.value }
      case 'badge':
        return { kind: 'badge', value: cell.value, tone: cell.tone }
      case 'verdict':
        return { kind: 'verdict', value: cell.value, winner: cell.winner }
    }
  })
}
