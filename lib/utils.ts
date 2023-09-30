import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"
import { z } from "zod"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
   return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function isBase64Image(imageData: string): boolean {
   const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
   return base64Regex.test(imageData)
}

export function catchError(err: unknown) {
   if (err instanceof z.ZodError) {
      const errors = err.issues.map((issue) => {
         return issue.message
      })
      return toast(errors.join("\n"))
   } else if (err instanceof Error) {
      return toast(err.message)
   } else {
      return toast("Something went wrong, please try again later.")
   }
}

export function formatDate(inputDate: string) {
   const date = new Date(inputDate)
   if (isNaN(date.getTime())) {
      return "Invalid Date"
   }
   return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
   })
}
