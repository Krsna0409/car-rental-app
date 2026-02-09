"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/app-context"

const indianCities = [
  { city: "Mumbai", state: "Maharashtra", country: "India" },
  { city: "Delhi", state: "Delhi", country: "India" },
  { city: "Bangalore", state: "Karnataka", country: "India" },
  { city: "Hyderabad", state: "Telangana", country: "India" },
  { city: "Chennai", state: "Tamil Nadu", country: "India" },
  { city: "Kolkata", state: "West Bengal", country: "India" },
  { city: "Pune", state: "Maharashtra", country: "India" },
  { city: "Ahmedabad", state: "Gujarat", country: "India" },
  { city: "Jaipur", state: "Rajasthan", country: "India" },
  { city: "Lucknow", state: "Uttar Pradesh", country: "India" },
  { city: "Kochi", state: "Kerala", country: "India" },
  { city: "Chandigarh", state: "Chandigarh", country: "India" },
]

export function LocationScreen() {
  const { setCurrentScreen, location, setLocation } = useApp()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCities = indianCities.filter((loc) =>
    loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.state.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectLocation = (newLocation: typeof location) => {
    setLocation(newLocation)
    setCurrentScreen("home")
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
          <h1 className="text-xl font-semibold text-foreground">Select Location</h1>
          <p className="text-sm text-muted-foreground">Current: {location.city}</p>
        </div>
      </header>

      {/* Search */}
      <div className="border-b border-border px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-11 bg-secondary border-0"
          />
        </div>
      </div>

      {/* Cities List */}
      <main className="flex-1 px-4 py-4">
        <div className="space-y-2">
          {filteredCities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 text-center text-muted-foreground">
                No cities found. Try another search.
              </p>
            </div>
          ) : (
            filteredCities.map((loc) => (
              <button
                key={`${loc.city}-${loc.state}`}
                onClick={() => handleSelectLocation(loc)}
                className={`w-full rounded-2xl border p-4 text-left transition-all ${
                  location.city === loc.city
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{loc.city}</h3>
                    <p className="text-sm text-muted-foreground">{loc.state}</p>
                  </div>
                  {location.city === loc.city && (
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
