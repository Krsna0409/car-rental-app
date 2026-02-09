"use client"

import React from "react"

import { useState } from "react"
import { Car, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/app-context"
import { validateLogin, type ValidationError } from "@/lib/validation"

export function LoginScreen() {
  const { setCurrentScreen, setUser } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    const validationErrors = validateLogin(email, password)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setErrors([])
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setUser({ name: "Road Warrior", email, phone: "+91 98765 43210" })
    setCurrentScreen("home")
    setIsLoading(false)
  }

  const getFieldError = (fieldName: string) => errors.find(e => e.field === fieldName)?.message

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-accent/10 to-background lg:justify-center lg:px-8 overflow-hidden">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:w-full lg:max-w-md lg:mx-auto">
        <div className="w-full animate-fade-in-scale">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent animate-bounce-in shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer">
              <Car className="h-10 w-10 text-primary-foreground animate-float" />
            </div>
            <div className="text-center animate-slide-in-up">
              <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Rev Your Engines!</h1>
              <p className="text-base text-muted-foreground">Sign in to your road trip headquarters</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2 opacity-0 animate-slide-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors(errors.filter(e => e.field !== "email"))
                  }}
                  disabled={isLoading}
                  className={`h-12 pl-12 text-base relative transition-all duration-300 ease-in-out border-2 ${
                    getFieldError("email") ? "border-destructive bg-destructive/5 animate-shake" : "border-transparent hover:border-primary/20"
                  }`}
                />
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary transition-all duration-300 ease-in-out" />
              </div>
              {getFieldError("email") && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-slide-in-down">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("email")}
                </div>
              )}
            </div>

            <div className="space-y-2 opacity-0 animate-slide-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors(errors.filter(e => e.field !== "password"))
                  }}
                  disabled={isLoading}
                  className={`h-12 pl-12 pr-12 text-base relative transition-all duration-300 ease-in-out border-2 ${
                    getFieldError("password") ? "border-destructive bg-destructive/5 animate-shake" : "border-transparent hover:border-primary/20"
                  }`}
                />
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary transition-all duration-300 ease-in-out" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary hover:scale-125 transition-all duration-300 ease-in-out"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {getFieldError("password") && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-slide-in-down">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("password")}
                </div>
              )}
            </div>

            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="w-full h-12 text-base font-bold mt-6 opacity-0 animate-slide-in-up bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground relative overflow-hidden group shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-in-out"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="animate-spin-slow">⚙️</span>
                    Firing up engines...
                  </>
                ) : (
                  <>
                    <span className="group-hover:scale-110 transition-transform">🏁</span>
                    Login & Drive
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border opacity-0 animate-slide-in-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <p className="text-center text-muted-foreground">
              {`Fresh to the road? `}
              <button 
                onClick={() => setCurrentScreen("signup")} 
                disabled={isLoading}
                className="font-bold text-primary hover:text-primary/80 hover:scale-105 transition-all duration-300 ease-in-out inline-block"
              >
                Create your account
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 animate-bounce-gentle">
            🚗 No actual passwords were harmed in the making of this demo 🚗
          </p>
        </div>
      </div>
    </div>
  )
}
