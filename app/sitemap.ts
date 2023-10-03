import { absoluteUrl } from "@/lib/utils"
import { type MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: absoluteUrl("/"),
         lastModified: new Date(),
      },
      {
         url: absoluteUrl("/sign-in"),
         lastModified: new Date(),
      },
      {
         url: absoluteUrl("/sign-up"),
         lastModified: new Date(),
      },
      {
         url: absoluteUrl("/profile"),
         lastModified: new Date(),
      },
      {
         url: absoluteUrl("/search"),
         lastModified: new Date(),
      },
      {
         url: absoluteUrl("/editor"),
         lastModified: new Date(),
      },
   ]
}
