import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { QKEY_USER_LIST } from '@/shared/queries/users/user-list'
import { TUser } from '@/shared/types/models/users'
import { api } from '@/shared/utils/fetch'

export type TResponse = TUser

export type TRouteParams = {
  user_id: number
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_USER_LIST] })
    },
    onSuccess: () => {
      toast.success('Student has been successfully deleted!')
    }
  })
}
