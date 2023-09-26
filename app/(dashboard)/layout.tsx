import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

import { Icons } from "@/components/icons"
import UserAccountDropdown from "@/components/layouts/user-account-dropdown"
import SiteFooter from "@/components/layouts/site-footer"
import SidebarNav from "@/components/layouts/sidebar-nav"
import { dashboardConfig } from "@/config/dashboard"

interface DashboardLayoutProps {
   children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
   const user = await getCurrentUser()

   if (!user) {
      redirect("/sign-in")
   }

   const noOfNotes = await db.note.count({
      where: {
         authorId: user?.id,
      },
   })

   return (
      <div className="flex flex-col min-h-screen space-y-6">
         <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container h-16 flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <Icons.logo className="w-8 h-8" aria-hidden="true" />
                  <p className="text-xl font-bold max-sm:hidden">Noted</p>
               </div>
               <UserAccountDropdown
                  user={user}
                  items={dashboardConfig.sidebarNav}
               />
            </div>
         </header>

         <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
            <aside className="hidden w-[200px] flex-col md:flex">
               <SidebarNav
                  items={dashboardConfig.sidebarNav}
                  noOfNotes={noOfNotes}
               />
            </aside>
            <main className="flex w-full flex-1 flex-col overflow-hidden">
               {children}
            </main>
         </div>

         <SiteFooter noOfNotes={noOfNotes} />
      </div>
   )
}

export default DashboardLayout
