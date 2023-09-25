import type { Metadata } from "next"
import { env } from "@/env.mjs"

import "@/styles/globals.css"

import { cn } from "@/lib/utils"
import { fontMono, fontSans } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
   },
   description: siteConfig.description,
   keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "Radix UI",
   ],
   authors: {
      name: "Raphico",
   },
   creator: "Raphico",
   themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
   ],
   openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
   },
   icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
   },
}

interface RootLayoutProps {
   children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
   return (
      <html lang="en">
         <head />
         <body
            className={cn(
               "min-h-screen bg-background font-sans antialiased",
               fontMono.variable,
               fontSans.variable
            )}
         >
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               {children}
            </ThemeProvider>
            <Toaster />
         </body>
      </html>
   )
}

export default RootLayout
