"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Fuel, Users, Cog, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp, type Booking } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"

export function CarDetailsScreen() {
  const { setCurrentScreen, selectedCar, setCurrentBooking, favorites, toggleFavorite } = useApp()
  const [pickupDate, setPickupDate] = useState("")
  const [dropoffDate, setDropoffDate] = useState("")

  if (!selectedCar) {
    return null
  }

  const isFavorite = favorites.some((c) => c.id === selectedCar.id)

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0
    const pickup = new Date(pickupDate)
    const dropoff = new Date(dropoffDate)
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }

  const totalDays = calculateDays()
  const totalCost = totalDays * selectedCar.pricePerDay

  const handleBookNow = () => {
    const booking: Booking = {
      id: `BK${Date.now()}`,
      car: selectedCar,
      pickupDate,
      dropoffDate,
      totalDays,
      totalCost,
      status: "Confirmed",
    }
    setCurrentBooking(booking)
    setCurrentScreen("booking-summary")
  }

  const specs = [
    { icon: Fuel, label: "Fuel", value: selectedCar.fuelType },
    { icon: Users, label: "Seats", value: `${selectedCar.seating} Persons` },
    { icon: Cog, label: "Transmission", value: selectedCar.transmission },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-accent/5">
      {/* Header with Car Image */}
      <div className="relative animate-fade-in-scale">
        <div className="relative h-64 bg-secondary overflow-hidden">
          <Image
            src={selectedCar.image || "/placeholder.svg"}
            alt={selectedCar.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </div>

        <div className="absolute left-4 top-4 flex w-[calc(100%-32px)] items-center justify-between">
          <button
            onClick={() => setCurrentScreen("home")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-card/90 to-accent/30 backdrop-blur-sm hover:scale-110 transition-all duration-300 ease-in-out active:scale-95 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => toggleFavorite(selectedCar)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm hover:scale-110 transition-all duration-300 ease-in-out active:scale-95 shadow-lg hover:shadow-xl animate-pulse-glow",
              isFavorite ? "bg-destructive/80" : "bg-gradient-to-br from-card/90 to-accent/30"
            )}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite ? "fill-primary text-primary" : "text-foreground"
              )}
            />
          </button>
        </div>
      </div>

      {/* Car Details */}
      <div className="flex-1 rounded-t-3xl bg-background -mt-6 relative z-10 px-6 py-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedCar.name}</h1>
            <p className="text-muted-foreground">{selectedCar.model}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{formatCurrency(selectedCar.pricePerDay)}</p>
            <p className="text-sm text-muted-foreground">/day</p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Specifications</h2>
          <div className="grid grid-cols-3 gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-2xl bg-secondary p-4 text-center">
                <spec.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="font-semibold text-foreground">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Select Dates</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Pickup Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Drop-off Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-secondary p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pickup Location</p>
            <p className="font-medium text-foreground">Mumbai Car Rental Hub, India</p>
          </div>
        </div>

        {/* Price Summary */}
        {totalDays > 0 && (
          <div className="mb-6 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {formatCurrency(selectedCar.pricePerDay)} x {totalDays} days
              </span>
              <span className="text-lg font-bold text-foreground">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button
          onClick={handleBookNow}
          disabled={!pickupDate || !dropoffDate}
          className="w-full h-14 text-lg font-semibold"
        >
          Book Now
        </Button>
      </div>
    </div>
  )
}
