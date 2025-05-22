import { useEffect, useMemo, useState } from 'react'

import { ChevronsUpDownIcon, XIcon } from 'lucide-react'

import { dx } from '@/lib/dx'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

import {
  type TFilePreview,
  getFileKey,
  toFilePreview
} from '@/shared/utils/file'

interface TProps {
  value: File[]
}

export default function ImagePreview(props: TProps) {
  const { value = [] } = props

  // const previews = useMemo(() => value.map(toFilePreview), [value])
  const [previews, setPreviews] = useState<TFilePreview[]>([])

  console.log('a')

  useEffect(() => {
    // console.log(value)
    // setPreviews([])
    // setPreviews(value.map(toFilePreview))
  }, [value])

  // useEffect(() => {
  //   console.log('mounted', previews)
  //   return () => {
  //     console.log('unmounted', previews)
  //     previews.forEach(({ preview }) => URL.revokeObjectURL(preview))
  //   }
  // }, [previews])

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button className="w-full justify-between" variant="outline">
          <span className={dx('label-02', 'font-medium')}>
            Preview{' '}
            <span className={dx('label-02', 'text-muted-foreground')}>
              ({value.length} {value.length > 1 ? 'files' : 'file'})
            </span>
          </span>

          <ChevronsUpDownIcon />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-3 gap-1.5 py-3">
          {previews.map((filePreview) => (
            <button
              type="button"
              key={getFileKey(filePreview.file)}
              className="w-full h-full aspect-square cursor-pointer relative group"
              aria-label="Remove Image"
              // onClick={removeImage(filePreview.file.name)}
            >
              <img
                src={filePreview.preview}
                alt={filePreview.file.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center bg-destructive/80 justify-center opacity-0 group-hover:opacity-100 text-destructive-foreground transition-opacity">
                <XIcon className="size-10" />
              </div>
              <span className="sr-only">Remove Image</span>
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
