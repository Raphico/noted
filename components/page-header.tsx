interface PageHeaderProps {
   title: string
   description?: string
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
   return (
      <div className="grid gap-1">
         <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
         {description && (
            <p className="text-base md:text-lg text-muted-foreground">
               {description}
            </p>
         )}
      </div>
   )
}

export default PageHeader
