import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

import { Shell } from "@/components/shells/shell"
import PageHeader from "@/components/page-header"
import UserProfile from "@/components/forms/user-profile"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Profile",
   description: "Personalize your profile effortlessly",
}

const ProfilePage = async () => {
   const user = await getCurrentUser()

   if (!user) {
      redirect("/sign-in")
   }

   return (
      <Shell variant="sidebar" className="max-w-lg">
         <PageHeader
            title="Profile"
            description="Update your profile and personal data here"
         />

         <UserProfile
            user={{
               id: user.id,
               name: user.name || "",
               image: user.image || "",
            }}
         />
      </Shell>
   )
}

export default ProfilePage
