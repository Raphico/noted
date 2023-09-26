import { z } from "zod"

export const userSchema = z.object({
   image: z.string().url().nonempty(),
   name: z
      .string()
      .min(3, {
         message: "name must be at least 3 characters long",
      })
      .max(30, {
         message: "name is too long",
      }),
})
