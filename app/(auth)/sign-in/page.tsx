import type { Metadata } from "next"
import { env } from "@/env.mjs"
import Link from "next/link"

import OAuthSignIn from "@/components/auth/oauth-sign-in"
import UserAuthForm from "@/components/forms/user-auth-form"

import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Sign in",
   description: "Sign in to noted",
}

const SignInPage = () => {
   return (
      <Shell className="max-w-lg">
         <Card>
            <CardHeader className="space-y-1">
               <CardTitle className="text-2xl flex items-center gap-4">
                  <Icons.logo className="h-8 w-8" aria-hidden="true" />
                  Sign in
               </CardTitle>
               <CardDescription>
                  Choose your preferred sign in method
               </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
               <OAuthSignIn />
               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                     <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                     </span>
                  </div>
               </div>
               <UserAuthForm />
            </CardContent>

            <CardFooter>
               <div className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                     aria-label="Sign up"
                     href="/sign-up"
                     className="text-primary underline-offset-4 transition-colors hover:underline"
                  >
                     Sign up
                  </Link>
               </div>
            </CardFooter>
         </Card>
      </Shell>
   )
}

export default SignInPage
