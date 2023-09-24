"use client"

import { signOut } from "next-auth/react"
import { Icons } from "../icons"
import { Button } from "../ui/button"

const SignOutBtn = () => {
   return (
      <Button
         onClick={() =>
            signOut({ callbackUrl: `${window.location.origin}/login` })
         }
      >
         <Icons.signOut className="h-4 w-4 mr-2" aria-hidden="true" />
         Sign out
      </Button>
   )
}

export default SignOutBtn
