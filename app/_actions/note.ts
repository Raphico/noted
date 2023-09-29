"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { noteSchema } from "@/lib/validations/note"
import { z } from "zod"

export const createNewNoteAction = async () => {
   const user = await getCurrentUser()

   if (!user) {
      throw new Error("User not found")
   }

   const note = await db.note.create({
      data: {
         title: "Untitled note",
         authorId: user.id,
      },
      select: {
         id: true,
      },
   })

   return { noteId: note.id }
}

export const updateNoteAction = async (
   inputs: z.infer<typeof noteSchema> & { noteId: string }
) => {
   await db.note.update({
      where: {
         id: inputs.noteId,
      },
      data: {
         title: inputs.title,
         content: inputs.content,
      },
   })

   return { status: "saved" }
}
