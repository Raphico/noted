"use client"

import { useState } from "react"

import { Icons } from "../icons"
import { Button } from "../ui/button"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

const oauthProviders = [
   {
      name: "Google",
      strategy: "google",
      icon: "google",
   },
   {
      name: "Github",
      strategy: "github",
      icon: "github",
   },
] satisfies {
   name: string
   strategy: string
   icon: keyof typeof Icons
}[]

const OAuthSignIn = () => {
   const [isLoading, setIsLoading] = useState<string | null>(null)
   const searchParams = useSearchParams()

   return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
         {oauthProviders.map((provider) => {
            const Icon = Icons[provider.icon]

            return (
               <Button
                  aria-label={`Sign in with ${provider.strategy}`}
                  key={provider.name}
                  variant="outline"
                  className="w-full bg-background sm:w-auto"
                  onClick={() => {
                     setIsLoading(provider.strategy)
                     signIn(provider.strategy, {
                        callbackUrl: searchParams?.get("from") || "/",
                     })
                  }}
                  disabled={isLoading !== null}
               >
                  {isLoading === provider.strategy ? (
                     <Icons.spinner
                        className="h-4 w-4 mr-2 animate-spin"
                        aria-hidden="true"
                     />
                  ) : (
                     <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                  )}
                  {provider.name}
               </Button>
            )
         })}
      </div>
   )
}

export default OAuthSignIn
