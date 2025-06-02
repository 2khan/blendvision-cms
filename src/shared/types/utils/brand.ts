import { z } from 'zod'

export const id_schema = z.union([z.string(), z.number()])
export type ID = z.infer<typeof id_schema>
