import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"

import { db } from "./db"
import { env } from "@/env.mjs"
import { resend } from "./resend"
import MagicLinkEmail from "@/components/emails/magic-link-email"

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(db),
   session: {
      strategy: "jwt",
   },
   pages: {
      signIn: "/sign-in",
   },
   providers: [
      GoogleProvider({
         clientId: env.GOOGLE_CLIENT_ID,
         clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
      GithubProvider({
         clientId: env.GOOGLE_CLIENT_ID,
         clientSecret: env.GITHUB_CLIENT_SECRET,
      }),
      EmailProvider({
         sendVerificationRequest: async ({ identifier, url }) => {
            try {
               await resend.emails.send({
                  from: ``,
                  to: identifier,
                  subject: "Your Magic Link for Signing In to Noted",
                  react: MagicLinkEmail({
                     magicLink: url,
                  }),
               })
            } catch (error) {
               if (error instanceof Error) throw new Error(error.message)
            }
         },
      }),
   ],
   callbacks: {
      async session({ token, session }) {
         if (token) {
            session.user.id = token.id
            session.user.email = token.email
            session.user.name = token.name
            session.user.image = token.picture
         }

         return session
      },
      async jwt({ token, user }) {
         const dbUser = await db.user.findFirst({
            where: {
               email: token.email,
            },
         })

         if (!dbUser) {
            if (user) {
               token.id = user?.id
            }

            return token
         }

         return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
         }
      },
   },
}
