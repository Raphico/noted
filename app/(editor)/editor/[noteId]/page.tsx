import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { notFound, redirect } from "next/navigation"

import Editor from "@/components/Editor"
import { Shell } from "@/components/shells/shell"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Editor",
   description:
      "Effortlessly create, edit, and organize your notes with our intuitive Editor Page",
}

interface EditorPageProps {
   params: { noteId: string }
}

const EditorPage = async ({ params }: EditorPageProps) => {
   const user = await getCurrentUser()

   if (!user) {
      redirect("/sign-in")
   }

   const note = await db.note.findFirst({
      where: {
         authorId: user.id,
         id: params.noteId,
      },
   })

   if (!note) {
      notFound()
   }

   return (
      <Shell>
         <Editor
            note={{
               id: note.id,
               title: note.title,
               content: note.content,
            }}
         />
      </Shell>
   )
}

export default EditorPage
