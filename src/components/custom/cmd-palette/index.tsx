import { useEffect } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  CommandShortcut
} from '@/components/ui/command'
import { useCommand } from '@/shared/stores/useCommand'
import { UploadIcon } from 'lucide-react'

export default function CommandPalette() {
  const palette_is_open = useCommand((s) => s.palette_is_open)
  const { palette_set_visibility, palette_toggle_visibility } = useCommand(
    (s) => s.handlers
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        palette_toggle_visibility()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [palette_toggle_visibility])

  return (
    <CommandDialog open={palette_is_open} onOpenChange={palette_set_visibility}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <UploadIcon />
            <span>Upload Course</span>
            <CommandShortcut>⌘U</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
