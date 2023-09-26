interface PageHeaderProps {
   title: string
   description?: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
   return (
      <div className="grid gap-1">
         <h1 className="text-[1.7rem] font-semibold">{title}</h1>
         {description && (
            <p className="text-base text-muted-foreground">{description}</p>
         )}
      </div>
   )
}

export default PageHeader
