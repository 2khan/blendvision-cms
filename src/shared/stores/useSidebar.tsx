import { create } from 'zustand'
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data
import { persist } from 'zustand/middleware'

type SidebarStore = {
  isOpen: boolean
  handlers: {
    toggle: () => void
  }
}

export const useSidebar = create<SidebarStore>()(
  persist(
    (set, get) => ({
      isOpen: true,
      handlers: {
        toggle: () => set({ isOpen: !get().isOpen })
      }
    }),
    {
      name: 'sidebar'
    }
  )
)
