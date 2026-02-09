"use client"

import { useEffect } from "react"
import { Car } from "lucide-react"
import { useApp } from "@/lib/app-context"

export function SplashScreen() {
  const { setCurrentScreen } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("login")
    }, 2500)
    return () => clearTimeout(timer)
  }, [setCurrentScreen])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-accent overflow-hidden relative">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-foreground/10 rounded-full animate-float blur-3xl" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary-foreground/5 rounded-full animate-bounce-gentle" />
      </div>

      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/20 animate-bounce-in shadow-2xl">
          <Car className="h-16 w-16 text-primary-foreground animate-float" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-black text-primary-foreground mb-3 animate-slide-in-down tracking-tight">
            Drive With Vibes
          </h1>
          <p className="text-xl text-primary-foreground/90 font-semibold animate-slide-in-up">
            Your journey starts here 🚗
          </p>
        </div>
      </div>

      <div className="absolute bottom-16 relative z-10">
        <div className="h-2 w-40 overflow-hidden rounded-full bg-primary-foreground/20 backdrop-blur-sm">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-primary-foreground via-primary-foreground/80 to-transparent" />
        </div>
        <p className="text-xs text-primary-foreground/70 text-center mt-4 animate-bounce-gentle font-medium">
          Loading your ride...
        </p>
      </div>
    </div>
  )
}
