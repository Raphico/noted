"use client"

import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { debounce } from "lodash"

const Filter = () => {
   const router = useRouter()

   const handleFilter = debounce((query: string) => {
      router.push(`/search?query=${query}`, { scroll: false })
   }, 300)

   return (
      <Input
         placeholder="Search by note title"
         onChange={(e) => handleFilter(e.target.value)}
      />
   )
}

export default Filter
