"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "../icons"
import { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import CreatePostButton from "../create-post-button"

interface SidebarNavProps {
   items: SidebarNavItem[]
   noOfNotes: number
}

const SidebarNav = ({ items, noOfNotes }: SidebarNavProps) => {
   const pathname = usePathname()

   if (!items?.length) return null

   return (
      <div className="grid w-full gap-7">
         <div className="space-y-4">
            <h3 className="text-muted-foreground">Quick links</h3>
            <div className="grid space-y-4">
               {items.map((item) => {
                  const isActive = pathname === item.href

                  const Icon = Icons[item.icon]

                  return (
                     <Link
                        href={item.href}
                        className={cn(
                           "flex items-center gap-3 rounded-md p-4 hover:bg-secondary",
                           {
                              "bg-secondary": isActive,
                           }
                        )}
                     >
                        <Icon className="h-5 w-5" />
                        {item.title}
                     </Link>
                  )
               })}
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-muted-foreground">Notes</h3>
            <CreatePostButton className="gap-3" />
         </div>

         <p className="text-sm text-muted-foreground">{noOfNotes} Notes</p>
      </div>
   )
}

export default SidebarNav
