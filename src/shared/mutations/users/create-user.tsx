import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { QKEY_USER_LIST } from '@/shared/queries/users/user-list'
import { TUser } from '@/shared/types/models/users'
import { api } from '@/shared/utils/fetch'

export type TResponse = TUser

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
    password_confirm: z.string(),
    display_name: z.string().min(1)
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Please make sure both passwords match.',
    path: ['password_confirm']
  })

export type TParams = z.infer<typeof CreateUserSchema>

export type TOpts = TParams

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (opts: TOpts) => {
      const payload = CreateUserSchema.parse(opts)
      const { data } = await api.post<TResponse>('/admin/users', payload)
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKEY_USER_LIST] })
    },
    onSuccess: () => {
      toast.success('User has been successfully created!')
    }
  })
}
