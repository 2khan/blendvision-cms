import { create } from 'zustand'
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { includes } from 'lodash'

export type TListView = 'card' | 'table'
export const LIST_VIEW_VALUES: readonly TListView[] = ['card', 'table']

type PreferenceStore = {
  course: {
    list_view: TListView
  }
  handlers: {
    course_set_list_view: (value: string) => void
  }
}

export const usePreference = create<PreferenceStore>()(
  persist(
    immer((set) => ({
      course: {
        list_view: 'card'
      },
      handlers: {
        course_set_list_view: (value) => {
          if (includes(LIST_VIEW_VALUES, value)) {
            set((state) => {
              state.course.list_view = value as TListView
            })
          }
        }
      }
    })),
    {
      name: 'preference',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['handlers'].includes(key))
        ),
      version: 0
    }
  )
)
