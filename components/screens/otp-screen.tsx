"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"

interface SignupData {
  fullName: string
  email: string
  phone: string
}

export function OtpScreen() {
  const { setCurrentScreen, setUser, signupData } = useApp()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize with signup data from context
  useEffect(() => {
    if (!signupData) {
      // Redirect to signup if no data
      setCurrentScreen("signup")
      return
    }
    
    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate OTP verification - accept demo code 123456
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (otpValue === "123456" && signupData) {
      // Set user data and proceed to home
      setUser({
        name: signupData.fullName,
        email: signupData.email,
        phone: signupData.phone,
      })

      setCurrentScreen("home")
    } else {
      setError("Invalid OTP. Try demo code: 123456")
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }

    setIsLoading(false)
  }

  const handleResend = () => {
    if (!canResend) return
    setResendTimer(60)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
  }

  const formatTime = (seconds: number) => {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:justify-center lg:px-8">
      <button
        onClick={() => setCurrentScreen("signup")}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-3 text-primary hover:text-primary/80 lg:absolute lg:top-6 lg:left-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm font-semibold">Back</span>
      </button>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:w-full lg:max-w-md lg:mx-auto">
        <div className="w-full">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary mx-auto mb-6">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Verify Your Account</h1>
            <p className="text-base text-muted-foreground">
              We sent a 6-digit code to your email. Enter it below to confirm your account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3 animate-slide-in-down">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="mb-8">
            <div className="mb-6 flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isLoading}
                  className="h-12 w-11 rounded-lg border-2 border-border bg-card text-center text-xl font-bold text-foreground focus:border-primary focus:outline-none transition-all duration-200 disabled:opacity-50"
                />
              ))}
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Demo: Use code <span className="font-mono font-bold text-foreground">123456</span>
            </div>
          </div>

          <Button
            onClick={handleVerify}
            disabled={isLoading || otp.join("").length !== 6}
            className="w-full h-12 text-base font-bold mb-6"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="border-t border-border pt-6">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={!canResend || isLoading}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                canResend
                  ? "bg-secondary text-foreground hover:bg-secondary/80"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {canResend ? "Resend OTP" : `Resend in ${formatTime(resendTimer)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
