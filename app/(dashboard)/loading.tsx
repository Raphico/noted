import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
   return (
      <Shell variant="sidebar" className="gap-4">
         <PageHeader title="All Notes" />
         <div className="divide-y divide-border">
            {Array(3)
               .fill(null)
               .map((_, i) => (
                  <div key={i} className="py-4">
                     <Skeleton className="h-14 w-full" />
                  </div>
               ))}
         </div>
      </Shell>
   )
}

export default Loading
