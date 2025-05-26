import { useQuery } from '@tanstack/react-query'

import { TUser } from '@/shared/types/models/users'
import { api } from '@/shared/utils/fetch'

export type TResponse = TUser[]

export const QKEY_USERS = 'USERS'

export const useUsers = () => {
  return useQuery({
    queryKey: [QKEY_USERS],
    queryFn: async ({ signal }) => {
      const { data } = await api.get<TResponse>('/admin/users', {
        signal
      })
      return data
    }
  })
}
