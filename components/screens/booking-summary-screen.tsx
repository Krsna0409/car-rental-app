"use client"

import { ArrowLeft, Calendar, MapPin, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"

export function BookingSummaryScreen() {
  const { setCurrentScreen, currentBooking } = useApp()

  if (!currentBooking) {
    return null
  }

  const { car, pickupDate, dropoffDate, totalDays, totalCost } = currentBooking

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4">
        <button
          onClick={() => setCurrentScreen("car-details")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Booking Summary</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        {/* Car Card */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-card border border-border">
          <div className="relative h-40 bg-secondary overflow-hidden">
            <Image
              src={car.image || "/placeholder.svg"}
              alt={car.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-foreground">{car.name}</h2>
            <p className="text-muted-foreground">{car.model}</p>
          </div>
        </div>

        {/* Rental Details */}
        <div className="mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Rental Details</h3>

          <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Pickup Date</p>
              <p className="font-semibold text-foreground">
                {new Date(pickupDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Drop-off Date</p>
              <p className="font-semibold text-foreground">
                {new Date(dropoffDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Pickup Location</p>
              <p className="font-semibold text-foreground">Mumbai Car Rental Hub, India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold text-foreground">{totalDays} Days</p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mb-6 rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Price Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Daily Rate</span>
              <span className="font-medium text-foreground">{formatCurrency(car.pricePerDay)}/day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium text-foreground">{totalDays} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatCurrency(totalCost)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="font-medium text-foreground">{formatCurrency(0)}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setCurrentScreen("payment")}
          className="w-full h-14 text-lg font-semibold"
        >
          Proceed to Payment
        </Button>
      </main>
    </div>
  )
}
