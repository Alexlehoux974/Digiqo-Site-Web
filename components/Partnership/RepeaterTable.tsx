import { Plus, Trash2 } from 'lucide-react'

interface RepeaterTableProps<T extends { id: string }> {
  label: string
  entries: T[]
  onChange: (entries: T[]) => void
  renderEntry: (entry: T, index: number, update: (partial: Partial<T>) => void) => React.ReactNode
  createEmpty: () => T
  maxEntries?: number
  minEntries?: number
  error?: string
}

export default function RepeaterTable<T extends { id: string }>({
  label,
  entries,
  onChange,
  renderEntry,
  createEmpty,
  maxEntries = 10,
  minEntries = 1,
  error,
}: RepeaterTableProps<T>) {
  const addEntry = () => {
    if (entries.length < maxEntries) {
      onChange([...entries, createEmpty()])
    }
  }

  const removeEntry = (index: number) => {
    if (entries.length > minEntries) {
      onChange(entries.filter((_, i) => i !== index))
    }
  }

  const updateEntry = (index: number, partial: Partial<T>) => {
    const updated = entries.map((entry, i) =>
      i === index ? { ...entry, ...partial } : entry
    )
    onChange(updated)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-3">{label}</label>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-digiqo-accent uppercase tracking-wider">
                #{index + 1}
              </span>
              {entries.length > minEntries && (
                <button
                  type="button"
                  onClick={() => removeEntry(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            {renderEntry(entry, index, (partial) => updateEntry(index, partial))}
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {entries.length < maxEntries && (
        <button
          type="button"
          onClick={addEntry}
          className="mt-3 flex items-center gap-2 text-sm text-digiqo-accent hover:text-digiqo-accent-dark font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      )}
    </div>
  )
}
