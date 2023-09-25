import { type Icons } from "@/components/icons"

export interface SidebarNavItem {
   title: string
   icon: keyof typeof Icons
   href: string
}

export interface DashboardConfig {
   sidebarNav: SidebarNavItem[]
}
