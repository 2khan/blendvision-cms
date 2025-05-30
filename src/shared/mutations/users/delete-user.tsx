import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  QKEY_USER_LIST,
  TResponse as TUserListResponse
} from '@/shared/queries/users/user-list'
import { TUser } from '@/shared/types/models/users'
import { api } from '@/shared/utils/fetch'

export type TResponse = TUser

export type TRouteParams = {
  user_id: string | number
}

export type TOpts = TRouteParams

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { user_id } = opts
      const { data } = await api.delete<TResponse>(`/admin/users/${user_id}`)
      return data
    },
    onMutate: async ({ user_id }) => {
      await queryClient.cancelQueries({ queryKey: [QKEY_USER_LIST] })

      // 0. Get current data
      const current = queryClient.getQueryData<TUserListResponse>([
        QKEY_USER_LIST
      ])

      // 1. Set new data
      queryClient.setQueryData<TUserListResponse>([QKEY_USER_LIST], (old) =>
        old?.filter((c) => c.id !== user_id)
      )

      return { current }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_USER_LIST] })
    },
    onSuccess: () => {
      toast.success('Student has been successfully deleted!')
    },
    onError: (_, __, context) => {
      // 2. If there's an error, fallback to current
      queryClient.setQueryData([QKEY_USER_LIST], context?.current)
    }
  })
}
