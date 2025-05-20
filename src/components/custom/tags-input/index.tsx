import { useState } from 'react'

import { HelpCircleIcon, XIcon } from 'lucide-react'

import { dx } from '@/lib/dx'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { Kbd } from '../kbd'

interface TTagsInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  maxTags?: number
}

export function TagsInput({
  value = [],
  onChange,
  placeholder = 'Add tags (press Enter to add)',
  disabled = false,
  maxTags
}: TTagsInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedValue = inputValue.trim()

    if (e.key === 'Enter' && trimmedValue !== '') {
      e.preventDefault()

      // Check if we've reached the maximum number of tags
      if (maxTags !== undefined && value.length >= maxTags) {
        return
      }

      // Check if tag already exists
      if (!value.includes(trimmedValue)) {
        onChange([...value, trimmedValue])
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="flex flex-col gap-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className={dx('label-01')}
              onClick={() => !disabled && removeTag(tag)}
              size="xs"
              disabled={disabled}
            >
              {tag}
              <XIcon className="size-3" />
            </Button>
          ))}
        </div>
      )}

      <div className="relative flex items-center">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={
            disabled || (maxTags !== undefined && value.length >= maxTags)
          }
          className="pr-6"
        />

        <Tooltip>
          <TooltipTrigger className="" asChild>
            <HelpCircleIcon className="absolute right-2" />
          </TooltipTrigger>
          {/* FIXME: HACK! Using 12rem as arbitrary value */}
          <TooltipContent className="max-w-[12rem]" align="end">
            <p className={dx('label-01', 'font-medium')}>Adding a Tag</p>

            <p className={dx('label-01', 'mb-3')}>
              Type a value and press <Kbd size="sm">Enter</Kbd> to add it as a
              tag.
            </p>

            <p className={dx('label-01', 'font-medium')}>Removing a Tag</p>

            <p className={dx('label-01')}>
              To delete a tag, either click the tag itself or press{' '}
              <Kbd size="sm">Backspace</Kbd> when the input field is empty.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
