"use client"

import { useState } from "react"
import { ArrowLeft, Search, SlidersHorizontal, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApp, sampleCars, type Car } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import Image from "next/image"

const categories = ["All", "SUV", "Sedan", "Hatchback"] as const

export function CarListingScreen() {
  const { setCurrentScreen, setSelectedCar, favorites, toggleFavorite } = useApp()
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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen("home")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Available Cars</h1>
        </div>

        {/* Search & Filter */}
        <div className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-11 bg-secondary border-0"
            />
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <SlidersHorizontal className="h-5 w-5 text-primary-foreground" />
          </button>
        </div>

        {/* Categories */}
        <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Car List */}
      <main className="flex-1 px-4 pb-6">
        <p className="mb-4 text-sm text-muted-foreground">{filteredCars.length} cars available</p>

        <div className="grid gap-4">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="flex overflow-hidden rounded-2xl bg-card border border-border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCarClick(car)}
            >
              <div className="relative h-32 w-32 flex-shrink-0 bg-secondary overflow-hidden">
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
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorite(car.id) ? "fill-primary text-primary" : "text-muted-foreground"
                    )}
                  />
                </button>
                {!car.available && (
                  <div className="absolute bottom-2 left-2 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-medium text-destructive-foreground">
                    Unavailable
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">{car.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(car.pricePerDay)}</p>
                      <p className="text-xs text-muted-foreground">/day</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{car.fuelType}</span>
                    <span>{car.seating} Seats</span>
                    <span>{car.transmission}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCarClick(car)}
                  disabled={!car.available}
                  className="mt-2"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
