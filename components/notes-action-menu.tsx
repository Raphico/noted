"use client"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "./ui/button"
import { Icons } from "./icons"

import { catchError, cn } from "@/lib/utils"
import Link from "next/link"
import { Note } from "@prisma/client"
import { deleteNoteAction, pinNoteAction } from "@/app/_actions/note"

interface NotesOperationProps {
   note: Pick<Note, "id" | "pinned">
}

const NotesOperation = ({ note }: NotesOperationProps) => {
   const handlePinNote = async () => {
      try {
         await pinNoteAction({ id: note.id, pinned: note.pinned })
      } catch (error) {
         catchError(error)
      }
   }

   const handleDeleteNote = async () => {
      try {
         await deleteNoteAction({ id: note.id })
      } catch (error) {
         catchError(error)
      }
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
         >
            <Icons.more
               className="w-4 h-4 text-primary"
               aria-label="note actions menu"
            />
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem>
               <Link aria-label="Edit note" href={`/editor/${note.id}`}>
                  Edit
               </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handlePinNote}>
               {note.pinned ? "Unpin note" : "Pin note"}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleDeleteNote}>
               Delete Note
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default NotesOperation
