import { Brand } from '../utils/brand'

type TUserID = Brand<string | number, 'user_id'>

export type TUser = {
  id: TUserID
  uid: string
  email: string
  display_name: string
}
