import { useCallback, useRef } from 'react'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import type { FileAttachment } from '@/lib/partnership-types'

interface FileUploadFieldProps {
  label: string
  accept: string
  maxSizeMB: number
  multiple?: boolean
  files: FileAttachment[]
  onChange: (files: FileAttachment[]) => void
  helpText?: string
  required?: boolean
  error?: string
}

export default function FileUploadField({
  label,
  accept,
  maxSizeMB,
  multiple = false,
  files,
  onChange,
  helpText,
  required,
  error,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return

    const newFiles: FileAttachment[] = []
    const errors: string[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]

      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name} dépasse ${maxSizeMB} Mo`)
        continue
      }

      try {
        const base64 = await readFileAsBase64(file)
        newFiles.push({
          name: file.name,
          type: file.type,
          size: file.size,
          base64,
        })
      } catch {
        errors.push(`Erreur de lecture : ${file.name}`)
      }
    }

    if (errors.length > 0) {
      alert(errors.join('\n'))
    }

    if (multiple) {
      onChange([...files, ...newFiles])
    } else {
      onChange(newFiles.slice(0, 1))
    }

    if (inputRef.current) inputRef.current.value = ''
  }, [files, multiple, maxSizeMB, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
  }

  const isImage = (type: string) => type.startsWith('image/')

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
          transition-all duration-200 hover:border-digiqo-accent/50 hover:bg-digiqo-accent/5
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50'}
        `}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">
          <span className="font-medium text-digiqo-accent">Cliquez pour choisir</span> ou glissez-déposez
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {accept.replace(/\./g, '').toUpperCase()} — max {maxSizeMB} Mo
          {multiple && ' par fichier'}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200"
            >
              {isImage(file.type) ? (
                <ImageIcon className="w-5 h-5 text-digiqo-accent flex-shrink-0" />
              ) : (
                <FileText className="w-5 h-5 text-digiqo-primary flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(index) }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
