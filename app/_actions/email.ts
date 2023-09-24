"use server"

import MagicLinkEmail from "@/components/emails/magic-link-email"
import { resend } from "@/lib/resend"
import { sendMagicLinkSchema } from "@/lib/validations/email"
import { z } from "zod"

export const sendMagicLink = async (
   input: z.infer<typeof sendMagicLinkSchema>
) => {
   await resend.emails.send({
      // from: "Noted <onboarding@resend.dev>",
      // to: input.email,
      // subject: "Sign in to Noted",
      // react: MagicLinkEmail({
      //    magicLink: input.magicLink,
      // }),

      from: "Noted <onboarding@resend.dev>",
      to: "raphicogit@gmail.com",
      subject: "Hello World",
      react: MagicLinkEmail({
         magicLink: input.magicLink,
      }),
   })
}
