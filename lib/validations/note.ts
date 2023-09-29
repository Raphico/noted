import { z } from "zod"

export const noteSchema = z.object({
   title: z.string().optional(),
   content: z.any().optional(),
})
