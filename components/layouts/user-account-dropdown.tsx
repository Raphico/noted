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
import { SidebarNavItem } from "@/types"

interface UserAccountDropdownProps {
   user: Pick<User, "name" | "image" | "email">
   items: SidebarNavItem[]
}

const UserAccountDropdown = ({ user, items }: UserAccountDropdownProps) => {
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
            {items.map((item) => {
               const Icon = Icons[item.icon]
               return (
                  <DropdownMenuItem>
                     <Link href={item.href} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {item.title}
                     </Link>
                  </DropdownMenuItem>
               )
            })}
            <DropdownMenuItem onSelect={toggleTheme}>
               <Icons.theme className="h-4 w-4 mr-2" aria-hidden="true" />
               Switch appearance
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
               className="cursor-pointer text-muted-foreground"
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
