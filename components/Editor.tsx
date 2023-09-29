"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { Note } from "@prisma/client"

import type EditorJS from "@editorjs/editorjs"
import TextareaAutosize from "react-textarea-autosize"
import debounce from "lodash/debounce"

import { noteSchema } from "@/lib/validations/note"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { uploadFiles } from "@/lib/uploadthing"

import Link from "next/link"
import { Icons } from "./icons"
import { catchError } from "@/lib/utils"
import { updateNoteAction } from "@/app/_actions/note"

interface EditorProps {
   note: Pick<Note, "id" | "title" | "content">
}

type Inputs = z.infer<typeof noteSchema>

const Editor = ({ note }: EditorProps) => {
   const ref = useRef<EditorJS>()
   const form = useForm<Inputs>({
      resolver: zodResolver(noteSchema),
   })
   const [isSaving, setIsSaving] = useState(false)
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      if (typeof window !== "undefined") {
         setIsMounted(true)
      }
   }, [])

   const initializeEditor = useCallback(async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default
      const Header = (await import("@editorjs/header")).default
      const List = (await import("@editorjs/list")).default
      const ImageTool = (await import("@editorjs/image")).default
      const Code = (await import("@editorjs/code")).default
      const InlineCode = (await import("@editorjs/inline-code")).default
      const LinkTool = (await import("@editorjs/link")).default
      const Embed = (await import("@editorjs/embed")).default
      const Quote = (await import("@editorjs/quote")).default

      const body = noteSchema.parse(note)

      if (!ref.current) {
         const editor = new EditorJS({
            holder: "editor",
            onReady() {
               ref.current = editor
            },
            onChange: async () => {
               const outputData = await ref.current?.save()
               form.setValue("content", outputData?.blocks)
            },
            placeholder: "Type here to write your note...",
            inlineToolbar: true,
            data: body.content,
            tools: {
               header: Header,
               list: List,
               quote: Quote,
               code: Code,
               inlineCode: InlineCode,
               embed: Embed,
               linkTool: {
                  class: LinkTool,
                  config: {
                     endpoint: "/api/link",
                  },
               },
               image: {
                  class: ImageTool,
                  config: {
                     uploader: {
                        async uploadByFile(file: File) {
                           const [res] = await uploadFiles({
                              files: [file],
                              endpoint: "imageUploader",
                           })

                           return {
                              success: 1,
                              file: {
                                 url: res.url,
                              },
                           }
                        },
                     },
                  },
               },
            },
         })
      }
   }, [note])

   useEffect(() => {
      const init = async () => {
         await initializeEditor()
      }

      if (isMounted) {
         init()

         return () => {
            ref.current?.destroy()
            ref.current = undefined
         }
      }
   }, [isMounted, initializeEditor])

   const handleSaveNote = debounce(async (values: Inputs) => {
      try {
         setIsSaving(true)

         await updateNoteAction({
            noteId: note.id,
            title: values.title,
            content: values.content,
         })
      } catch (error) {
         catchError(error)
      } finally {
         setIsSaving(false)
      }
   }, 3000)

   useEffect(() => {
      // Ensure that the last invoked debounced function is completed when the user leaves the page or closes the browser
      window.addEventListener("beforeunload", handleSaveNote.flush)
      return () => {
         window.removeEventListener("beforeunload", handleSaveNote.flush)
      }
   }, [handleSaveNote])

   form.watch((values) => {
      handleSaveNote(values)
   })

   if (!isMounted) return null

   return (
      <form>
         <div className="grid w-full gap-8">
            <div className="flex w-full items-center justify-between">
               <Link
                  aria-label="Go back to the dashboard"
                  href="/"
                  className="flex items-center gap-2 text-primary hover:text-foreground"
               >
                  <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
                  Notes
               </Link>

               {isSaving && (
                  <Icons.spinner
                     className="h-4 w-4 animate-spin"
                     aria-label="saving note"
                  />
               )}
            </div>

            <div className="prose prose-stone mx-auto w-full md:w-[800px] dark:prose-invert">
               <TextareaAutosize
                  autoFocus
                  id="title"
                  defaultValue={note.title}
                  placeholder="Note title"
                  className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
                  {...form.register("title")}
               />
               <div id="editor" className="min-h-[450px]" />
               <p className="text-sm text-gray-500">
                  Use{" "}
                  <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                     Tab
                  </kbd>{" "}
                  to open the command menu.
               </p>
            </div>
         </div>
      </form>
   )
}

export default Editor
