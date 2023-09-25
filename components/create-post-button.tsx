"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { Button, ButtonProps, buttonVariants } from "./ui/button"

interface CreatePostButtonProps extends ButtonProps {}

const CreatePostButton = ({
   className,
   variant,
   ...props
}: CreatePostButtonProps) => {
   const [isLoading, setIsLoading] = useState(false)

   const handleCreatePost = () => {}

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
