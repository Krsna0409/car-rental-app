"use client"

import { Home, Calendar, Heart, User } from "lucide-react"
import { useApp, type Screen } from "@/lib/app-context"
import { cn } from "@/lib/utils"

const navItems: { icon: typeof Home; label: string; screen: Screen }[] = [
  { icon: Home, label: "Home", screen: "home" },
  { icon: Calendar, label: "Bookings", screen: "my-bookings" },
  { icon: Heart, label: "Favorites", screen: "favorites" },
  { icon: User, label: "Profile", screen: "profile" },
]

export function BottomNav() {
  const { currentScreen, setCurrentScreen } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.screen
          return (
            <button
              key={item.screen}
              onClick={() => setCurrentScreen(item.screen)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
