import { Icons } from "./icons"

const EmptyNotePlaceholder = () => {
   return (
      <div className="flex flex-col items-center gap-2 text-muted pt-4">
         <Icons.note className="h-10 w-10" aria-hidden="true" />
         <p className="te">No notes</p>
      </div>
   )
}

export default EmptyNotePlaceholder
