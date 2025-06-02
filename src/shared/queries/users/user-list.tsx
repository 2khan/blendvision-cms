import { useQuery } from '@tanstack/react-query'

import type { TUser } from '@/shared/types/models/users'
import { api } from '@/shared/utils/fetch'

export type TResponse = TUser[]

export const QKEY_USER_LIST = 'USER_LIST'

export const useUsers = () => {
  return useQuery({
    queryKey: [QKEY_USER_LIST],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<TResponse>('/admin/users', {
        signal
      })
      return data
    }
  })
}
