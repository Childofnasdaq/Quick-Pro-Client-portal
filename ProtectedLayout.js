"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutGrid, ShoppingCart, Key, Bot, BarChart2, HelpCircle, LogOut, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useEAStore } from "@/lib/stores/ea-store"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Purchase keys", href: "/dashboard/purchase", icon: ShoppingCart },
  { name: "Manage keys", href: "/dashboard/keys", icon: Key },
  { name: "Manage EAs", href: "/dashboard/eas", icon: Bot },
  { name: "Stats", href: "/dashboard/stats", icon: BarChart2 },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const eas = useEAStore((state) => state.eas)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isClient) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex">
          <SidebarHeader className="p-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Pro
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Mobile Header */}
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between gap-4 border-b bg-white px-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Quick Pro
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </a>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Pro
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {eas.map((ea) => (
                  <Avatar key={ea.id} className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={ea.image} alt={ea.strategyName} />
                    <AvatarFallback>{ea.strategyName[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ProtectedLayout
