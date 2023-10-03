import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
   return (
      <Shell variant="sidebar">
         <PageHeader
            title="Search"
            description="Find what you're looking for"
         />

         <Skeleton className="w-full h-10" />
      </Shell>
   )
}

export default Loading
