"use client"

import { Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import { useApp, type Car } from "@/lib/app-context"

export function FavoritesScreen() {
  const { setCurrentScreen, setSelectedCar, favorites, toggleFavorite } = useApp()

  const handleCarClick = (car: Car) => {
    setSelectedCar(car)
    setCurrentScreen("car-details")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
        <p className="text-muted-foreground">{favorites.length} saved cars</p>
      </header>

      <main className="flex-1 px-4">
        {favorites.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">No favorites yet</h2>
            <p className="text-center text-muted-foreground">
              Start adding cars to your favorites to see them here
            </p>
            <Button onClick={() => setCurrentScreen("home")} className="mt-6">
              Browse Cars
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {favorites.map((car) => (
              <div
                key={car.id}
                className="flex overflow-hidden rounded-2xl bg-card border border-border"
              >
                <div className="relative h-32 w-32 flex-shrink-0 bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-muted-foreground/20">
                      {car.brand.charAt(0)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">{car.category}</p>
                    <p className="mt-1 font-bold text-primary">
                      ${car.pricePerDay}<span className="text-xs font-normal text-muted-foreground">/day</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleCarClick(car)}
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFavorite(car)}
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
