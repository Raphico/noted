import type { Metadata } from "next"
import { env } from "@/env.mjs"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Settings",
   description: "Customize your note-taking experience",
}

const SettingsPage = () => {
   return <div>SettingsPage</div>
}

export default SettingsPage
