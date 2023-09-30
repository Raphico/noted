"use server"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { noteSchema } from "@/lib/validations/note"
import { revalidatePath } from "next/cache"
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

   revalidatePath("/")

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

export const pinNoteAction = async (inputs: {
   id: string
   pinned: boolean
}) => {
   await db.note.update({
      where: {
         id: inputs.id,
      },
      data: {
         pinned: !inputs.pinned,
      },
   })

   revalidatePath("/")
}

export const deleteNoteAction = async (inputs: { id: string }) => {
   await db.note.delete({
      where: {
         id: inputs.id,
      },
   })

   revalidatePath("/")
}
