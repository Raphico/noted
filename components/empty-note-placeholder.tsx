import { Icons } from "./icons"

interface EmptyNotePlaceholderProps {
   placeholder: string
}

const EmptyNotePlaceholder = ({ placeholder }: EmptyNotePlaceholderProps) => {
   return (
      <div className="flex flex-col items-center gap-2 text-muted">
         <Icons.note className="h-10 w-10" aria-hidden="true" />
         <p className="te">{placeholder}</p>
      </div>
   )
}

export default EmptyNotePlaceholder
