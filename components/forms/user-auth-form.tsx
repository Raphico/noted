"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Icons } from "../icons"
import { toast } from "sonner"

import { zodResolver } from "@hookform/resolvers/zod"
import { emailSchema } from "@/lib/validations/email"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"

import { z } from "zod"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

type Inputs = z.infer<typeof emailSchema>

const UserAuthForm = () => {
   const [isLoading, setIsLoading] = useState(false)
   const searchParams = useSearchParams()

   const form = useForm<Inputs>({
      resolver: zodResolver(emailSchema),
      defaultValues: {
         email: "",
      },
   })

   const onSubmit = async (values: Inputs) => {
      setIsLoading(true)

      const res = await signIn("email", {
         email: values.email.toLowerCase(),
         callbackUrl: searchParams?.get("from") || "/dashboard",
         redirect: false,
      })

      setIsLoading(false)

      if (!res?.ok) {
         return toast.error("Sign in request failed. Try again!")
      }

      return toast.message("Check your email", {
         description:
            "We sent you a login link. Be sure to check your spam too.",
      })
   }

   return (
      <Form {...form}>
         <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input placeholder="example@gamil.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button disabled={isLoading} aria-label="sign in with email">
               {isLoading && (
                  <Icons.spinner
                     className="h-4 w-4 mr-2 animate-spin"
                     aria-hidden="true"
                  />
               )}
               continue
            </Button>
         </form>
      </Form>
   )
}

export default UserAuthForm
