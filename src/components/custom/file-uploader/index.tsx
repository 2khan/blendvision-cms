import { useCallback } from 'react'

import { uniqBy } from 'lodash'
import { UploadIcon } from 'lucide-react'
import {
  type DropzoneOptions,
  FileRejection,
  useDropzone
} from 'react-dropzone'
import { toast } from 'sonner'

import { dx } from '@/lib/dx'
import { cn } from '@/lib/utils'

import { Separator } from '@/components/ui/separator'

import { flattenExtensions, getFileKey } from '@/shared/utils/file'

import { DotPattern } from '../dot-pattern'

type TProps = {
  multiple?: boolean
  value: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  accept?: DropzoneOptions['accept']
  initialPreviews?: string[]
}

export default function FileUploader(props: TProps) {
  const {
    multiple = false,
    value = [],
    onChange,
    maxFiles = multiple ? 5 : 1,
    maxSize = 1024 * 1024 * 5,
    accept = {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    disabled
  } = props

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) =>
      onChange(uniqBy(value.concat(acceptedFiles), getFileKey)),
    [value, onChange]
  )

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((e) => {
        toast.error(file.name, {
          description: getDropzoneErrorMessage(e.code)
        })
      })
    })
  }, [])

  // const removeImage = useCallback(
  //   (fileName: string) => () =>
  //     onChange(value.filter((file) => file.name !== fileName)),
  //   [value, onChange]
  // )

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      multiple,
      maxFiles,
      maxSize,
      accept
    })

  return (
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
          {flattenExtensions(accept)}
        </span>
      </div>
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
