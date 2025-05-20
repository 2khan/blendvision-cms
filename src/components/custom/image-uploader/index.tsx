import { MouseEventHandler, useCallback, useEffect, useState } from 'react'

import { ChevronsUpDownIcon, UploadIcon, XIcon } from 'lucide-react'
import { type DropzoneOptions, useDropzone } from 'react-dropzone'

import { dx } from '@/lib/dx'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

import { DotPattern } from '../dot-pattern'

type TProps = {
  multiple?: boolean
  value: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  accept?: DropzoneOptions['accept']
}

export default function FileUploader(props: TProps) {
  const {
    multiple = false,
    value,
    onChange,
    maxFiles = multiple ? 5 : 1,
    maxSize = 1024 * 1024 * 5,
    accept = {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    disabled
  } = props
  const [filePreviews, setFilePreviews] = useState<string[]>([])

  // Initialize files from value prop
  useEffect(() => {
    if (value && value.length > 0) {
      // setFilePreviews(value.map((file) => URL.createObjectURL(file)))
    }
  }, [value])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles)
      if (acceptedFiles.length === 0) return

      if (!multiple) {
        acceptedFiles.forEach((file) => {
          setFilePreviews([URL.createObjectURL(file)])
        })
        return
      }

      // ADD IF
      acceptedFiles.forEach((file) => {
        setFilePreviews((old) => [...old, URL.createObjectURL(file)])
      })

      onChange(acceptedFiles)
    },
    [multiple, onChange]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    multiple,
    maxFiles,
    maxSize,
    accept
  })

  // Clean up previews when component unmounts
  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview)
        console.log('revoked', preview)
      })
    }
  }, [filePreviews])

  const removeImage = useCallback(
    (preview: string) => () => {
      setFilePreviews((prev) => prev.filter((p) => p !== preview))
    },
    []
  )

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className={cn(
          'relative z-0 flex cursor-pointer bg-background flex-col items-center justify-center rounded-md overflow-hidden border border-dashed border-muted-foreground/25 transition-colors',
          'hover:border-muted-foreground/50',
          isDragActive && 'border-muted-foreground/50 bg-muted/50',
          isDragReject && 'border-destructive/50 bg-destructive/10',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        <DotPattern faded />
        <input {...getInputProps()} aria-label="Upload files" />

        {/* HEADER */}
        <div className="flex flex-col gap-2 w-full px-3 py-2">
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Upload up to {maxFiles} {maxFiles === 1 ? 'file' : 'files'}
            </p>
            <p className="text-xs text-muted-foreground">
              Max size per file: {maxSize / (1024 * 1024)}MB
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 text-center p-3 min-h-80">
          <UploadIcon
            className="size-10 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="flex flex-col space-y-1">
            <p className={dx('heading-compact-01')}>
              Drag & drop {maxFiles > 1 ? 'files' : 'file'} here
            </p>
            <p className={dx('body-compact-01', 'text-primary')}>
              or click to browse
            </p>
          </div>
        </div>

        {/* FOOTER */}

        <div className="w-full flex justify-start gap-1 px-3 py-2">
          <span className="font-medium text-xs">Accepted File Types</span>
          <Separator orientation="vertical" />
          <span className="text-xs text-muted-foreground">
            {Object.keys(accept)
              .map((key) => accept[key].join(' '))
              .join(' ')}
          </span>
        </div>

        {fileRejections.map(({ file, errors }) => (
          <div key={file.name} className="px-3 mb-2 w-full">
            <span className="text-xs font-medium">{file.name}</span>

            {errors.map((e) => (
              <p key={e.code} className="text-xs text-destructive">
                {getDropzoneErrorMessage(e.code)}
              </p>
            ))}
          </div>
        ))}
      </div>
      {filePreviews.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button className="w-full" variant="outline">
              <span className={dx('label-02', 'font-medium')}>
                Preview ({filePreviews.length})
              </span>

              <ChevronsUpDownIcon />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-3 gap-1.5 py-3">
              {filePreviews.map((preview) => (
                <button
                  type="button"
                  key={preview}
                  className="w-full h-full aspect-square cursor-pointer relative group"
                  aria-label="Remove Image"
                  onClick={removeImage(preview)}
                >
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center bg-destructive/80 justify-center opacity-0 group-hover:opacity-100 text-destructive-foreground">
                    <XIcon className="size-10" />
                  </div>
                  <span className="sr-only">Remove Image</span>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}

export const dropzoneErrorMessages: Record<string, string> = {
  'file-too-large': 'The file is too large. Please upload a smaller file.',
  'file-too-small': 'The file is too small. Please upload a larger file.',
  'too-many-files': 'Too many files selected. Please upload fewer files.',
  'file-invalid-type': 'Invalid file type. Please upload a supported format.',
  'file-not-accepted': 'This file type is not accepted.'
}

export function getDropzoneErrorMessage(code: string): string {
  return (
    dropzoneErrorMessages[code] ||
    'An unknown error occurred during file upload.'
  )
}
