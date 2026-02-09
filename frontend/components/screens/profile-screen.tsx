"use client"

import {
  User,
  Mail,
  Phone,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { useApp } from "@/lib/app-context"

const menuItems = [
  { icon: User, label: "Edit Profile", description: "Update your personal information" },
  { icon: CreditCard, label: "Payment Methods", description: "Manage your payment options" },
  { icon: Bell, label: "Notifications", description: "Configure notification settings" },
  { icon: Shield, label: "Privacy & Security", description: "Manage your account security" },
  { icon: Settings, label: "App Settings", description: "Customize your app experience" },
  { icon: HelpCircle, label: "Help & Support", description: "Get help with your account" },
]

export function ProfileScreen() {
  const { setCurrentScreen, setUser, user } = useApp()

  const handleLogout = () => {
    setUser(null)
    setCurrentScreen("login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="bg-primary px-4 pb-16 pt-8">
        <h1 className="text-xl font-semibold text-primary-foreground">Profile</h1>
      </header>

      {/* Profile Card */}
      <div className="px-4 -mt-12">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user?.name || "Guest User"}</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user?.email || "guest@example.com"}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{user?.phone || "+1 234 567 8900"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <main className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="mt-6 w-full h-14 text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Car Rental App v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
