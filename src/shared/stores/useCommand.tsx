import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TIcon } from '@/shared/types/utils/icon'

type TCommand = {
  id: string
  label: string
  hotkey: string
  icon: TIcon
  action: (...args: string[]) => void | Promise<void>
}

type CommandStore = {
  commands: Record<string, TCommand>
  palette_is_open: boolean
  handlers: {
    cmd_register: (cmd: TCommand) => void
    cmd_unregister: (cmd_id: string) => void
    cmd_trigger: (cmd_id: string, ...args: string[]) => void
    cmd_list_all: () => TCommand[]
    palette_toggle_visibility: () => void
    palette_set_visibility: (open: boolean) => void
  }
}

export const useCommand = create<CommandStore>()(
  immer((set, get) => ({
    // COMMAND STATES
    commands: {},

    // PALETTE STATES
    palette_is_open: false,

    handlers: {
      // HANDLE COMMAND STATES
      cmd_list_all: () => Object.values(get().commands),
      cmd_register: (cmd) => {
        set((state) => {
          state.commands[cmd.id] = cmd
        })
      },
      cmd_unregister: (cmd_id) => {
        set((state) => {
          delete state.commands[cmd_id]
        })
      },
      cmd_trigger: (cmd_id, ...args) => {
        const cmd = get().commands[cmd_id]

        if (!cmd) {
          console.warn(`Command "${cmd_id}" not found`)
          return
        }

        try {
          cmd.action(...args)
        } catch (e) {
          console.error(`Failed to execute command "${cmd_id}"`, e)
        } finally {
          set((state) => {
            state.palette_is_open = false
          })
        }
      },

      // HANDLE COMMAND PALETTE
      palette_toggle_visibility: () =>
        set((state) => {
          state.palette_is_open = !state.palette_is_open
        }),
      palette_set_visibility: (open) =>
        set((state) => {
          state.palette_is_open = open
        })
    }
  }))
)
