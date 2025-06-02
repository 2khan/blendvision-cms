import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QKEY_COURSE_LIST } from '@/shared/queries/course/course-list'
import { TCourse } from '@/shared/types/models/course'
import { api } from '@/shared/utils/fetch'

export type TParams = {
  isNew?: boolean
}

export type TRouteParams = {
  course_id: TCourse['id']
}

export type TOpts = TRouteParams & TParams

export const useSetNew = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { course_id, isNew } = opts

      if (!isNew) {
        await api.delete(`/api/orders/${course_id}/not_new`)
        return
      }

      await api.delete(`/api/orders/${course_id}/new`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_COURSE_LIST] })
    }
  })
}
