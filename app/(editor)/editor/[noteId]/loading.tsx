import { Shell } from "@/components/shells/shell"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
   return (
      <Shell>
         <Skeleton className="h-[38px] w-[90px]" />
         <div className="mx-auto w-full md:w-[800px] space-y-6">
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[20px] w-2/3" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
         </div>
      </Shell>
   )
}

export default Loading
