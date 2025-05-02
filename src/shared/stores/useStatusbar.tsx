import { create } from 'zustand'

type StatusbarStore = {
  title?: string
  description?: string
  setTitle: (opts: { title?: string; description?: string }) => void
}

export const useStatusbar = create<StatusbarStore>((set) => ({
  setTitle: ({ title, description }) =>
    set({
      title,
      description
    })
}))
