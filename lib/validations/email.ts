import { z } from "zod"

export const emailSchema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
})

export const sendMagicLinkSchema = z.object({
   email: emailSchema.shape.email,
   magicLink: z.string().url(),
})
