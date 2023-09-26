import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Home",
   description: "Welcome to noted",
}

const DashboardPage = async () => {
   const user = await getCurrentUser()
   if (!user) {
      redirect("/sign-in")
   }

   return (
      <Shell variant="sidebar">
         <PageHeader title="All Notes" />
      </Shell>
   )
}

export default DashboardPage
