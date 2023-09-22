import { env } from "@/env.mjs"
import { type MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = env.NEXT_PUBLIC_APP_URL

   return [
      {
         url: baseUrl,
         lastModified: new Date(),
      },
      {
         url: baseUrl + "/login",
         lastModified: new Date(),
      },
   ]
}
