import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

import { Icons } from "@/components/icons"
import UserAccountDropdown from "@/components/layouts/user-account-dropdown"

interface DashboardLayoutProps {
   children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
   const user = await getCurrentUser()

   if (!user) {
      redirect("/sign-in")
   }

   return (
      <div className="flex flex-col min-h-screen space-y-6">
         <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container h-16 flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <Icons.logo className="w-8 h-8" aria-hidden="true" />
                  <p className="text-xl font-bold max-sm:hidden">Noted</p>
               </div>
               <UserAccountDropdown user={user} />
            </div>
         </header>
         {children}
      </div>
   )
}

export default DashboardLayout
