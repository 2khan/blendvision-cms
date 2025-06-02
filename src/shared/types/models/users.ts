import { z } from 'zod'

import { id_schema } from '../utils/brand'

export const user_id_schema = id_schema.brand<'user_id'>()
export type TUserID = z.infer<typeof user_id_schema>

export type TUser = {
  id: TUserID
  uid: string
  email: string
  display_name: string
}
