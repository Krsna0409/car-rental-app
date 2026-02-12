"use client"

import { CheckCircle2, Calendar, MapPin, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"
import { SuccessAnimation } from "@/components/cartoon-elements"

export function BookingConfirmationScreen() {
  const { setCurrentScreen, currentBooking, setCurrentBooking, setSelectedCar } = useApp()

  if (!currentBooking) {
    return null
  }

  const { id, car, pickupDate, dropoffDate, totalDays, status } = currentBooking

  const handleGoToDashboard = () => {
    setCurrentBooking(null)
    setSelectedCar(null)
    setCurrentScreen("home")
  }

  const handleViewBookings = () => {
    setCurrentBooking(null)
    setSelectedCar(null)
    setCurrentScreen("my-bookings")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-green-50/20 to-background px-4 py-8">
      {/* Success Icon */}
      <div className="mb-8 flex flex-col items-center animate-fade-in-scale">
        <div className="mb-6 w-32 h-32">
          <SuccessAnimation />
        </div>
        <h1 className="text-4xl font-bold text-foreground animate-slide-in-down text-center mb-2">
          🎉 You're All Set!
        </h1>
        <p className="text-center text-lg text-muted-foreground animate-slide-in-up">
          Your rental adventure awaits. Check your email for confirmation details.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="mb-6 rounded-2xl border-2 border-green-200/50 bg-gradient-to-br from-card to-green-50/10 p-6 shadow-lg opacity-0 animate-slide-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
        {/* Booking ID */}
        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
          <span className="text-muted-foreground">Booking ID</span>
          <span className="font-mono font-semibold text-foreground">{id}</span>
        </div>

        {/* Status Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {status}
          </span>
        </div>

        {/* Car Info */}
        <div className="mb-4 flex items-center gap-4 rounded-xl bg-secondary p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
            <Car className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{car.name}</h3>
            <p className="text-sm text-muted-foreground">{car.model}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Pickup Date</p>
              <p className="font-medium text-foreground">
                {new Date(pickupDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Drop-off Date</p>
              <p className="font-medium text-foreground">
                {new Date(dropoffDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Pickup Location</p>
              <p className="font-medium text-foreground">Downtown Car Hub, New York</p>
            </div>
          </div>
        </div>

        {/* Duration & Total */}
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium text-foreground">{totalDays} Days</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">Total Paid</span>
            <span className="text-xl font-bold text-primary">${currentBooking.totalCost}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-3">
        <Button onClick={handleViewBookings} className="w-full h-14 text-lg font-semibold">
          View My Bookings
        </Button>
        <Button
          onClick={handleGoToDashboard}
          variant="outline"
          className="w-full h-14 text-lg font-semibold bg-transparent"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
