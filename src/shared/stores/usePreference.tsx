import { includes } from 'lodash'
import { create } from 'zustand'
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const LIST_VIEW_VALUES = ['card', 'table'] as const
export type TListView = (typeof LIST_VIEW_VALUES)[number]
export const TABLE_PAGE_SIZES = [10, 20, 30, 40, 50] as const

type PreferenceStore = {
  course: {
    default_page_size: number
    list_view: TListView
  }
  handlers: {
    course_set_table_page_size: (value: number) => void
    course_set_list_view: (value: string) => void
  }
}

export const usePreference = create<PreferenceStore>()(
  persist(
    immer((set) => ({
      course: {
        default_page_size: 10,
        list_view: 'card'
      },
      handlers: {
        course_set_list_view: (value) => {
          if (includes(LIST_VIEW_VALUES, value)) {
            set((state) => {
              state.course.list_view = value as TListView
            })
          }
        },
        course_set_table_page_size: (value) => {
          if (includes(TABLE_PAGE_SIZES, value)) {
            set((state) => {
              state.course.default_page_size = value
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
      version: 1
    }
  )
)
