import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

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
      redirect(authOptions?.pages?.signIn || "/sign-in")
   }

   const noOfNotes = await db.note.count({
      where: {
         authorId: user?.id,
      },
   })

   return (
      <div className="flex flex-col min-h-screen">
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

         <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r lg:sticky lg:block p-1">
               <div className="py-6 pr-6 lg:py-8">
                  <SidebarNav
                     items={dashboardConfig.sidebarNav}
                     noOfNotes={noOfNotes}
                  />
               </div>
            </aside>
            <main className="flex w-full flex-1 flex-col p-1 overflow-hidden">
               {children}
            </main>
         </div>

         <SiteFooter noOfNotes={noOfNotes} />
      </div>
   )
}

export default DashboardLayout
