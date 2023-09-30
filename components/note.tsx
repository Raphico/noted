import { Note } from "@prisma/client"
import Link from "next/link"
import NotesActionMenu from "./notes-action-menu"
import { formatDate } from "@/lib/utils"
import { Icons } from "./icons"

interface NoteProps {
   note: Pick<Note, "id" | "title" | "pinned" | "createdAt">
   showNoteWasPinned?: boolean
}

const Note = ({ note, showNoteWasPinned = true }: NoteProps) => {
   return (
      <div className="flex items-center justify-between py-4">
         <div className="flex items-center gap-4">
            {note.pinned && showNoteWasPinned && (
               <Icons.pin className="h-4 w-4" aria-label="pinned note" />
            )}
            <Link
               className="space-y-1 hover:underline"
               href={`/editor/${note.id}`}
            >
               <p className="font-bold overflow-hidden overflow-ellipsis line-clamp-1">
                  {note.title}
               </p>
               <p className="text-muted-foreground">
                  {formatDate(note.createdAt.toDateString())}
               </p>
            </Link>
         </div>
         <NotesActionMenu note={{ id: note.id, pinned: note.pinned }} />
      </div>
   )
}

export default Note
