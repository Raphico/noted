import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
   server: {
      UPLOADTHING_SECRET: z.string(),
      UPLOADTHING_APP_ID: z.string(),
      RESEND_API_KEY: z.string(),
      NEXTAUTH_URL: z.string().url(),
      NEXTAUTH_URL_INTERNAL: z.string().url(),
      NEXTAUTH_SECRET: z.string(),
      DATABASE_URL: z.string(),
      GOOGLE_CLIENT_ID: z.string(),
      GOOGLE_CLIENT_SECRET: z.string(),
      GITHUB_CLIENT_ID: z.string(),
      GITHUB_CLIENT_SECRET: z.string(),
   },
   client: {
      NEXT_PUBLIC_APP_URL: z.string().url(),
   },
   runtimeEnv: {
      UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
      UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
   },
})
