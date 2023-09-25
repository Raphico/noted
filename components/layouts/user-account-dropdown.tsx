"use client"

import type { User } from "next-auth"
import { signOut } from "next-auth/react"

import Link from "next/link"
import { useTheme } from "next-themes"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import UserAvatar from "../user-avatar"
import { Icons } from "../icons"

interface UserAccountDropdownProps {
   user: Pick<User, "name" | "image" | "email">
}

const UserAccountDropdown = ({ user }: UserAccountDropdownProps) => {
   const { theme, setTheme } = useTheme()

   const toggleTheme = () =>
      theme === "dark" ? setTheme("light") : setTheme("dark")

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="rounded-full">
            <UserAvatar user={user} className="h-10 w-10" />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>
               <p className="text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               <Link className="flex items-center gap-2" href="/">
                  <Icons.dashboard className="h-4 w-4" aria-hidden="true" />
                  Dashboard
               </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={toggleTheme}>
               <Icons.theme className="h-4 w-4 mr-2" aria-hidden="true" />
               Switch appearance
            </DropdownMenuItem>
            <DropdownMenuItem
               className="cursor-pointer"
               onSelect={() =>
                  signOut({ callbackUrl: `${window.location.origin}/sign-in` })
               }
            >
               <Icons.signOut className="h-4 w-4 mr-2" aria-hidden="true" />
               Sign out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default UserAccountDropdown
