import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

import Note from "@/components/note"
import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import EmptyNotePlaceholder from "@/components/empty-note-placeholder"

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

   const notes = await db.note.findMany({
      where: {
         authorId: user.id,
      },
      select: {
         id: true,
         title: true,
         pinned: true,
         createdAt: true,
      },
      orderBy: [
         {
            pinned: "desc",
         },
         {
            updatedAt: "desc",
         },
      ],
   })

   return (
      <Shell variant="sidebar" className="gap-4">
         <PageHeader title="All Notes" />

         <div>
            {notes.length !== 0 ? (
               <div className="divide-y divide-border">
                  {notes.map((note) => (
                     <Note note={note} key={note.id} />
                  ))}
               </div>
            ) : (
               <EmptyNotePlaceholder placeholder="No notes" />
            )}
         </div>
      </Shell>
   )
}

export default DashboardPage
