import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { env } from "@/env.mjs"
import type { Metadata } from "next"

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   title: "Search note",
   description:
      "Find what you're looking for quickly and easily through our powerful search engine",
}

const SearchPage = () => {
   return (
      <Shell variant="sidebar">
         <PageHeader
            title="Search"
            description="Find what you're looking for"
         />
      </Shell>
   )
}

export default SearchPage
