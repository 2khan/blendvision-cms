import { type AxiosProgressEvent } from 'axios'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// import { useEffect } from 'react'
// import { useLocation } from 'react-router'
// import { Fragment } from 'react/jsx-runtime'
// import { create } from 'zustand'

// import { getRouteMeta } from '@/routes/utils.routes'

// import { TMeta } from '@/shared/types/utils/meta'

export const UPLOAD_CONTEXTS = ['course_thumbnail', 'lesson_thumbnail'] as const
export type TContext = (typeof UPLOAD_CONTEXTS)[number]

export type TQueueStatus =
  | {
      status: 'initial'
    }
  | {
      status: 'uploading'
      progress: AxiosProgressEvent
    }
  | {
      status: 'done'
      progress: AxiosProgressEvent
    }
  | {
      status: 'error'
      reason: string
    }

export type TBaseState = {
  context: TContext
  file: File
  progress?: AxiosProgressEvent
}

export type TQueueState = TBaseState & TQueueStatus

type TUploadQueueState = Record<string, TQueueState>

type TUploadQueueStore = {
  upload_queue: TUploadQueueState
  handlers: {
    queue_register: (key: string, base: TBaseState) => void
    queue_set_status: (key: string, status: TQueueStatus) => void
    queue_mark_done: (key: string) => void
  }
}

const IUploadQueue: TUploadQueueState = {}

export const getQueueKey = (
  context: TContext,
  file: File,
  id?: string | number
) => [context, file.name, id].filter(Boolean).join('/')

export const useUploadQueue = create<TUploadQueueStore>()(
  immer((set) => ({
    upload_queue: IUploadQueue,
    handlers: {
      queue_register: (key, base) => {
        set((state) => {
          state.upload_queue[key] = Object.assign(
            {
              status: 'initial'
            } satisfies TQueueStatus,
            base
          )
        })
      },
      queue_set_status: (key, status) => {
        set((state) => {
          state.upload_queue[key] = Object.assign(
            state.upload_queue[key],
            status
          )
        })
      },
      queue_mark_done: (key) => {
        set((state) => {
          state.upload_queue[key] = Object.assign(state.upload_queue[key], {
            status: 'done'
          })
        })
      }
    }
  }))
)
