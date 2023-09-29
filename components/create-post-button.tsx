"use client"

import { useState } from "react"
import { catchError, cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Button, ButtonProps, buttonVariants } from "./ui/button"
import { createNewNoteAction } from "@/app/_actions/note"
import { useRouter } from "next/navigation"

interface CreatePostButtonProps extends ButtonProps {}

const CreatePostButton = ({
   className,
   variant,
   ...props
}: CreatePostButtonProps) => {
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleCreatePost = async () => {
      try {
         setIsLoading(true)

         const note = await createNewNoteAction()

         router.push(`/editor/${note.noteId}`)
      } catch (error) {
         catchError(error)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Button
         className={cn(buttonVariants({ variant }), className)}
         {...props}
         disabled={isLoading}
         onClick={handleCreatePost}
      >
         {isLoading ? (
            <Icons.spinner
               className="h-4 w-4 animate-spin"
               aria-hidden="true"
            />
         ) : (
            <Icons.create className="h-4 w-4" aria-hidden="true" />
         )}
         <p className="max-sm:hidden">Create post</p>
      </Button>
   )
}

export default CreatePostButton
