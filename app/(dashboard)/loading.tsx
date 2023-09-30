import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
   return (
      <Shell variant="sidebar" className="gap-4">
         <PageHeader title="All Notes" />
         <div className="grid gap- divide-y divide-border">
            {Array(3)
               .fill(null)
               .map((_, i) => (
                  <div key={i} className="py-4">
                     <div className="space-y-3">
                        <Skeleton className="h-5 w-2/5" />
                        <Skeleton className="h-4 w-4/5" />
                     </div>
                  </div>
               ))}
         </div>
      </Shell>
   )
}

export default Loading
