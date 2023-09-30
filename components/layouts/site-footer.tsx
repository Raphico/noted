import CreatePostButton from "../create-post-button"
import { Shell } from "../shells/shell"

interface SiteFooterProps {
   noOfNotes: number
}

const SiteFooter = async ({ noOfNotes }: SiteFooterProps) => {
   return (
      <footer className="fixed bottom-0 z-10 w-full bg-background border-t h-16 lg:hidden flex items-center">
         <Shell as="div" className="flex items-center justify-between">
            <p className="text-sm">{noOfNotes} Notes</p>
            <CreatePostButton variant="ghost" className="md:gap-3" />
         </Shell>
      </footer>
   )
}

export default SiteFooter
