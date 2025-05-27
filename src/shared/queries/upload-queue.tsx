import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import {
  TContext,
  UPLOAD_CONTEXTS,
  getQueueKey,
  useUploadQueue
} from '@/shared/stores/useUploadQueue'
import { api } from '@/shared/utils/fetch'

export const QKEY_UPLOAD_QUEUE = 'UPLOAD_QUEUE'

export type TPresignedURLPayload = {
  filename: string
  content_type: string
}

export type TPresignedURLResponse = {
  presigned_url: string
  original: string
  thumbnail: string
}

export type TMutationOpts = {
  id?: string | number
  context: TContext
  file: File
}

export const useUpload = () => {
  const { queue_register, queue_set_status, queue_mark_done } = useUploadQueue(
    (s) => s.handlers
  )

  return useMutation({
    mutationFn: async (opts: TMutationOpts) => {
      const { context, file, id } = opts

      if (!UPLOAD_CONTEXTS.includes(context)) {
        throw new Error('Must provide a valid context')
      }

      // 0. Prepare Queue
      const key = getQueueKey(context, file, id)

      queue_register(key, {
        context,
        file
      })

      // 1. Get Presigned URI
      const { data } = await api.post<TPresignedURLResponse>(
        '/admin/presigned_url',
        {
          filename: file.name,
          content_type: file.type
        } satisfies TPresignedURLPayload
      )

      // 2. Upload to bucket
      await axios.put(data.presigned_url, file, {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (progress) => {
          // 4. Update Queue (Uploading)
          queue_set_status(key, {
            status: 'uploading',
            progress
          })
        }
      })

      return data
    },
    onSuccess: (_, opts) => {
      const { context, file, id } = opts

      const key = getQueueKey(context, file, id)

      // 5. Update Queue (Done)
      queue_mark_done(key)
    },
    onError: (e, opts) => {
      const { context, file, id } = opts
      const key = getQueueKey(context, file, id)

      // 5. Update Queue (Error)
      queue_set_status(key, {
        status: 'error',
        reason: e.message
      })
    }
  })
}
