import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const shellVariants = cva("grid items-start gap-8 pb-8 pt-6 md:py-8", {
   variants: {
      variant: {
         default: "container",
         sidebar: "",
      },
   },
   defaultVariants: {
      variant: "default",
   },
})

interface ShellProps
   extends React.HTMLAttributes<HTMLDivElement>,
      VariantProps<typeof shellVariants> {
   as?: React.ElementType
}

const Shell = ({
   className,
   as: Comp = "section",
   variant,
   ...props
}: ShellProps) => {
   return (
      <Comp className={cn(shellVariants({ variant }), className)} {...props} />
   )
}

export { Shell, shellVariants }
