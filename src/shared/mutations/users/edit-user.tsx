import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { QKEY_USER_LIST } from '@/shared/queries/users/user-list'
import { TUser } from '@/shared/types/models/users'
import { api } from '@/shared/utils/fetch'

export type TResponse = TUser

export const EditUserSchema = z.object({
  display_name: z.string().optional(),
  password: z.string().optional()
})

export type TParams = z.infer<typeof EditUserSchema>
export type TRouteParams = { user_id: TUser['id'] }
export type TOpts = TParams & TRouteParams

export const useEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const { user_id, ...rest } = opts
      const params = EditUserSchema.parse(rest)
      const { data } = await api.put<TResponse>(
        `/admin/users/${user_id}`,
        params
      )
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_USER_LIST] })
    },
    onSuccess: () => {
      toast.success('Student has been successfully edited!')
    }
  })
}
