"use client"

import { ArrowLeft, Bell, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"

export function NotificationsScreen() {
  const { setCurrentScreen, notifications, markNotificationAsRead } = useApp()

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-border bg-background px-4 py-4">
        <button
          onClick={() => setCurrentScreen("home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Notifications</h1>
        </div>
      </header>

      {/* Notifications List */}
      <main className="flex-1 px-4 py-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              No notifications yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-2xl border p-4 transition-all ${
                  notif.read
                    ? "border-border bg-card"
                    : "border-primary bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{notif.title}</h3>
                      {!notif.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notif.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatTime(notif.timestamp)}
                    </p>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
