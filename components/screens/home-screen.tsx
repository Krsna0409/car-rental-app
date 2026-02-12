"use client"

import React from "react"

import { useState } from "react"
import { MapPin, Bell, Search, ChevronRight, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { useApp, sampleCars, type Car } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"

const categories = ["All", "SUV", "Sedan", "Hatchback"] as const

export function HomeScreen() {
  const { setCurrentScreen, setSelectedCar, favorites, toggleFavorite, location, hasUnreadNotifications } = useApp()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCars = sampleCars.filter((car) => {
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCarClick = (car: Car) => {
    setSelectedCar(car)
    setCurrentScreen("car-details")
  }

  const isFavorite = (carId: string) => favorites.some((c) => c.id === carId)

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between animate-slide-in-down">
          <button 
            onClick={() => setCurrentScreen("location")}
            className="flex items-center gap-2 rounded-full hover:bg-secondary/20 px-2 py-1 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:shadow-lg transition-all duration-300 ease-in-out">
              <MapPin className="h-5 w-5 text-primary-foreground animate-float" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground text-sm">{location.city}</p>
            </div>
          </button>
          <button 
            onClick={() => setCurrentScreen("notifications")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
          >
            <Bell className="h-5 w-5 text-primary-foreground hover:text-accent transition-all duration-300 ease-in-out" />
            {hasUnreadNotifications && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary animate-pulse-glow" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-11 bg-secondary border-0"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4">
        {/* Categories */}
        <div className="mb-6 flex gap-3 overflow-x-auto py-2 scrollbar-hide">
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
                  : "bg-muted text-foreground hover:bg-secondary border-2 border-transparent hover:border-primary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Cars */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Featured Cars</h2>
            <button
              onClick={() => setCurrentScreen("car-listing")}
              className="flex items-center gap-1 text-sm font-medium text-primary"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4">
            {filteredCars.slice(0, 4).map((car, idx) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl bg-card border-2 border-border cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
                onClick={() => handleCarClick(car)}
              >
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(car)
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        isFavorite(car.id) ? "fill-primary text-primary" : "text-muted-foreground"
                      )}
                    />
                  </button>
                  {!car.available && (
                    <div className="absolute left-3 top-3 rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
                      Not Available
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">{car.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(car.pricePerDay)}</p>
                      <p className="text-xs text-muted-foreground">/day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{car.fuelType}</span>
                    <span>{car.seating} Seats</span>
                    <span>{car.transmission}</span>
                  </div>
                  <Button
                    onClick={() => handleCarClick(car)}
                    className="mt-4 w-full"
                    disabled={!car.available}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
