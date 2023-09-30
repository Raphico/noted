import { env } from "@/env.mjs"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import Filter from "@/components/filter"
import EmptyNotePlaceholder from "@/components/empty-note-placeholder"
import Note from "@/components/note"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Search note",
   description:
      "Find what you're looking for quickly and easily through our powerful search engine",
}

interface SearchPageProps {
   searchParams: { [key: string]: string | undefined }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
   const user = await getCurrentUser()

   if (!user) {
      redirect("/sign-in")
   }

   const notes = await db.note.findMany({
      where: {
         authorId: user.id,
         title: {
            contains: searchParams?.query || "",
         },
      },
   })

   return (
      <Shell variant="sidebar">
         <PageHeader
            title="Search"
            description="Find what you're looking for"
         />

         <Filter />

         {notes.length === 0 ? (
            <EmptyNotePlaceholder placeholder="No match" />
         ) : (
            <div className="divide-y divide-border">
               {notes.map((note) => (
                  <Note note={note} showNoteWasPinned={false} key={note.id} />
               ))}
            </div>
         )}
      </Shell>
   )
}

export default SearchPage
