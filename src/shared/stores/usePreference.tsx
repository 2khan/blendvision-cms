import { create } from 'zustand'
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { includes } from 'lodash'

export const LIST_VIEW_VALUES = ['card', 'table'] as const
export type TListView = (typeof LIST_VIEW_VALUES)[number]
export const TABLE_PAGE_SIZES = [10, 20, 30, 40, 50] as const
export type TTablePageSize = (typeof TABLE_PAGE_SIZES)[number]

type PreferenceStore = {
  table: {
    default_page_size: TTablePageSize
  }
  course: {
    list_view: TListView
  }
  handlers: {
    table_set_default_page_size: (value: TTablePageSize) => void
    course_set_list_view: (value: string) => void
  }
}

export const usePreference = create<PreferenceStore>()(
  persist(
    immer((set) => ({
      table: {
        default_page_size: 10
      },
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
        },
        table_set_default_page_size: (value) => {
          if (includes(TABLE_PAGE_SIZES, value)) {
            set((state) => {
              state.table.default_page_size = value as TTablePageSize
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
