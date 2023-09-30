"use client"

import {
   Form,
   FormField,
   FormLabel,
   FormControl,
   FormMessage,
   FormItem,
} from "../ui/form"
import { Input } from "../ui/input"
import UserAvatar from "../user-avatar"
import { Button } from "../ui/button"
import { Icons } from "../icons"

import { z } from "zod"
import { userSchema } from "@/lib/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"

import { ChangeEvent, useState } from "react"

import { catchError, isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { updateUserProfileAction } from "@/app/_actions/user"

interface UserProfileProps {
   user: Pick<User, "id" | "name" | "image">
}

type Inputs = z.infer<typeof userSchema>

const UserProfile = ({ user }: UserProfileProps) => {
   const [isLoading, setIsLoading] = useState(false)
   const { startUpload } = useUploadThing("imageUploader")
   const [files, setFiles] = useState<File[]>([])

   const form = useForm<Inputs>({
      resolver: zodResolver(userSchema),
      defaultValues: {
         image: user.image || "",
         name: user.name || "",
      },
   })

   const onSubmit = async (values: Inputs) => {
      try {
         setIsLoading(true)

         const hasImageChanged = isBase64Image(values.image)

         if (hasImageChanged) {
            const imgRes = await startUpload(files)

            if (imgRes && imgRes[0].url) {
               values.image = imgRes[0].url
            }
         }

         await updateUserProfileAction({
            userId: user.id,
            name: values.name,
            image: values.image,
         })
      } catch (error) {
         catchError(error)
      } finally {
         setIsLoading(false)
      }
   }

   const handleImageChange = (
      e: ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
   ) => {
      e.preventDefault()

      const fileReader = new FileReader()

      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files[0]
         setFiles(Array.from(e.target.files))

         if (!file.type.includes("image")) return

         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || ""
            fieldChange(imageDataUrl)
         }

         fileReader.readAsDataURL(file)
      }
   }

   return (
      <Form {...form}>
         <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
               control={form.control}
               name="image"
               render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                     <FormLabel>
                        <UserAvatar
                           user={user}
                           className="h-16 w-16 rounded-full"
                        />
                     </FormLabel>
                     <FormControl>
                        <Input
                           type="file"
                           accept="image/*"
                           placeholder="Add profile photo"
                           className="w-full"
                           onChange={(e) =>
                              handleImageChange(e, field.onChange)
                           }
                        />
                     </FormControl>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Your name</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button disabled={isLoading} variant="secondary">
               {isLoading && (
                  <Icons.spinner
                     className="h-4 w-4 mr-2 animate-spin"
                     aria-hidden="true"
                  />
               )}
               Save changes
            </Button>
         </form>
      </Form>
   )
}

export default UserProfile
