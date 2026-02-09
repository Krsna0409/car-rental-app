"use client"

import { useState } from "react"
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/app-context"
import { validateRegistration, validatePassword, type ValidationError } from "@/lib/validation"

export function SignupScreen() {
  const { setCurrentScreen } = useApp()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{ valid: boolean; errors: string[] }>({ valid: false, errors: [] })

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }))
    const strength = validatePassword(value)
    setPasswordStrength(strength)
    setErrors(errors.filter(e => e.field !== "password"))
  }

  const handleSignup = async () => {
    const validationErrors = validateRegistration(formData)
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setErrors([])
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCurrentScreen("otp")
    setIsLoading(false)
  }

  const getFieldError = (fieldName: string) => errors.find(e => e.field === fieldName)?.message

  return (
    <div className="flex min-h-screen flex-col bg-background lg:justify-center lg:px-8">
      <button
        onClick={() => setCurrentScreen("login")}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-3 text-primary hover:text-primary/80 lg:absolute lg:top-6 lg:left-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm font-semibold">Back</span>
      </button>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:w-full lg:max-w-md lg:mx-auto">
        <div className="w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">Get Behind the Wheel</h1>
            <p className="text-base text-muted-foreground">Join the caravan of responsible drivers</p>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="What's your real name, champ?"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value })
                    setErrors(errors.filter(e => e.field !== "fullName"))
                  }}
                  disabled={isLoading}
                  className={`h-12 pl-12 text-base ${getFieldError("fullName") ? "border-destructive bg-destructive/5" : ""}`}
                />
              </div>
              {getFieldError("fullName") && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("fullName")}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    setErrors(errors.filter(e => e.field !== "email"))
                  }}
                  disabled={isLoading}
                  className={`h-12 pl-12 text-base ${getFieldError("email") ? "border-destructive bg-destructive/5" : ""}`}
                />
              </div>
              {getFieldError("email") && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("email")}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Phone Number (10 digits)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value })
                    setErrors(errors.filter(e => e.field !== "phone"))
                  }}
                  disabled={isLoading}
                  maxLength={15}
                  className={`h-12 pl-12 text-base ${getFieldError("phone") ? "border-destructive bg-destructive/5" : ""}`}
                />
              </div>
              {getFieldError("phone") && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("phone")}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Password (Min 8 chars)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Make it spicy! (8+ chars, mix it up)"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  disabled={isLoading}
                  className={`h-12 pl-12 pr-12 text-base ${getFieldError("password") ? "border-destructive bg-destructive/5" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="rounded-lg border border-border bg-secondary/30 p-3 space-y-2">
                  <p className="text-xs font-semibold text-foreground">Password Checklist:</p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-foreground" : "text-muted-foreground"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 ${formData.password.length >= 8 ? "text-green-600" : ""}`} />
                      At least 8 characters
                    </div>
                    <div className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-foreground" : "text-muted-foreground"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 ${/[A-Z]/.test(formData.password) ? "text-green-600" : ""}`} />
                      One uppercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? "text-foreground" : "text-muted-foreground"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 ${/[a-z]/.test(formData.password) ? "text-green-600" : ""}`} />
                      One lowercase letter
                    </div>
                    <div className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? "text-foreground" : "text-muted-foreground"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 ${/[0-9]/.test(formData.password) ? "text-green-600" : ""}`} />
                      One number
                    </div>
                    <div className={`flex items-center gap-2 ${/[!@#$%^&*]/.test(formData.password) ? "text-foreground" : "text-muted-foreground"}`}>
                      <CheckCircle2 className={`h-3.5 w-3.5 ${/[!@#$%^&*]/.test(formData.password) ? "text-green-600" : ""}`} />
                      One special character (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}
              
              {getFieldError("password") && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("password")}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Type it again (we're paranoid)"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    setErrors(errors.filter(e => e.field !== "confirmPassword"))
                  }}
                  disabled={isLoading}
                  className={`h-12 pl-12 pr-12 text-base ${getFieldError("confirmPassword") ? "border-destructive bg-destructive/5" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {getFieldError("confirmPassword") && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {getFieldError("confirmPassword")}
                </div>
              )}
            </div>

            <Button 
              onClick={handleSignup} 
              disabled={isLoading || !passwordStrength.valid}
              className="w-full h-12 text-base font-bold mt-6"
            >
              {isLoading ? "Checking your credentials..." : "Let's Go!"}
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              {`Already a member of the convoy? `}
              <button 
                onClick={() => setCurrentScreen("login")} 
                disabled={isLoading}
                className="font-bold text-primary hover:text-primary/80 transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            We promise not to spam you. (That's what your inbox is for!)
          </p>
        </div>
      </div>
    </div>
  )
}
