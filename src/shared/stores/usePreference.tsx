import { includes } from 'lodash'
import { create } from 'zustand'
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const LIST_VIEW_VALUES = ['card', 'table'] as const
export type TListView = (typeof LIST_VIEW_VALUES)[number]
export const DETAIL_VIEW_VALUES = ['preview', 'form'] as const
export type TDetailView = (typeof DETAIL_VIEW_VALUES)[number]
export const TABLE_PAGE_SIZES = [10, 20, 30, 40, 50] as const

type PreferenceStore = {
  layouts: {
    sidebar_open: boolean
  }
  course: {
    default_page_size: number
    list_view: TListView
    detail_view: TDetailView
  }
  users: {
    default_page_size: number
  }
  handlers: {
    course_set_table_page_size: (value: number) => void
    course_set_list_view: (value: string) => void
    course_set_detail_view: (value: string) => void
    users_set_table_page_size: (value: number) => void
    sidebar_toggle: () => void
  }
}

export const usePreference = create<PreferenceStore>()(
  persist(
    immer((set) => ({
      layouts: {
        sidebar_open: true
      },
      course: {
        default_page_size: 10,
        list_view: 'card',
        detail_view: 'preview'
      },
      users: {
        default_page_size: 10
      },
      handlers: {
        course_set_table_page_size: (value) => {
          if (includes(TABLE_PAGE_SIZES, value)) {
            set((state) => {
              state.course.default_page_size = value
            })
          }
        },
        course_set_list_view: (value) => {
          if (includes(LIST_VIEW_VALUES, value)) {
            set((state) => {
              state.course.list_view = value as TListView
            })
          }
        },
        course_set_detail_view: (value) => {
          if (includes(DETAIL_VIEW_VALUES, value)) {
            set((state) => {
              state.course.detail_view = value as TDetailView
            })
          }
        },
        users_set_table_page_size: (value) => {
          if (includes(TABLE_PAGE_SIZES, value)) {
            set((state) => {
              state.users.default_page_size = value
            })
          }
        },
        sidebar_toggle: () => {
          set((state) => {
            state.layouts.sidebar_open = !state.layouts.sidebar_open
          })
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
