import PageHeader from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
   return (
      <Shell variant="sidebar" className="max-w-lg">
         <PageHeader
            title="Settings"
            description="Customize your note-taking experience"
         />

         <div className="grid gap-4">
            <div className="flex items-center gap-4">
               <Skeleton className="w-16 h-16 rounded-full" />
               <Skeleton className="w-full h-10" />
            </div>

            <div className="space-y-2">
               <Skeleton className="h-[14px] w-10" />
               <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
         </div>
      </Shell>
   )
}

export default Loading
