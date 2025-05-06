import { Fragment, useEffect } from 'react'
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
import RegisterCommands from './register-commands'
import { isMac } from '@/shared/utils/hotkey'

export default function CommandPalette() {
  const palette_is_open = useCommand((s) => s.palette_is_open)
  const {
    palette_set_visibility,
    palette_toggle_visibility,
    cmd_list_all,
    cmd_trigger
  } = useCommand((s) => s.handlers)

  const commands = cmd_list_all()

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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault()
        const cmd = commands.find((cmd) => cmd.hotkey === e.key)
        if (!cmd) return
        cmd_trigger(cmd.id)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [commands, cmd_trigger])

  return (
    <Fragment>
      <CommandDialog
        open={palette_is_open}
        onOpenChange={palette_set_visibility}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {commands.map((cmd) => {
              return (
                <CommandItem key={cmd.id} onSelect={() => cmd_trigger(cmd.id)}>
                  <cmd.icon />
                  <span>{cmd.label}</span>
                  <CommandShortcut className="uppercase">
                    {isMac() ? '⌘' : 'Ctrl'}
                    {cmd.hotkey}
                  </CommandShortcut>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <RegisterCommands />
    </Fragment>
  )
}
