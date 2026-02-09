"use client"

import { useState } from "react"
import { Calendar, Car, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { useApp, type Booking } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"

const tabs = ["Current", "Completed", "Cancelled"] as const

export function MyBookingsScreen() {
  const { setCurrentScreen, bookings } = useApp()
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Current")

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "Current") return booking.status === "Confirmed"
    if (activeTab === "Completed") return booking.status === "Completed"
    if (activeTab === "Cancelled") return booking.status === "Cancelled"
    return true
  })

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700"
      case "Completed":
        return "bg-blue-100 text-blue-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>

        {/* Tabs */}
        <div className="mt-4 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-full py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4">
        {filteredBookings.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">No bookings yet</h2>
            <p className="text-center text-muted-foreground">
              {activeTab === "Current"
                ? "You don't have any active bookings"
                : activeTab === "Completed"
                  ? "You haven't completed any bookings yet"
                  : "No cancelled bookings"}
            </p>
            {activeTab === "Current" && (
              <Button onClick={() => setCurrentScreen("home")} className="mt-6">
                Browse Cars
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex items-center justify-between bg-secondary px-4 py-3">
                  <span className="font-mono text-sm text-muted-foreground">#{booking.id}</span>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      getStatusColor(booking.status)
                    )}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
                      <Image
                        src={booking.car.image || "/placeholder.svg"}
                        alt={booking.car.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{booking.car.name}</h3>
                      <p className="text-sm text-muted-foreground">{booking.car.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(booking.totalCost)}</p>
                      <p className="text-xs text-muted-foreground">{booking.totalDays} days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(booking.dropoffDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {booking.status === "Confirmed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full text-destructive border-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
