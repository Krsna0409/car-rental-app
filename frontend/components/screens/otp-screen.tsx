"use client"

import React from "react"

import { useState, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"

export function OtpScreen() {
  const { setCurrentScreen, setUser } = useApp()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    setUser({ name: "John Doe", email: "john@example.com", phone: "+1 234 567 8900" })
    setCurrentScreen("home")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center gap-4 px-4 py-4">
        <button
          onClick={() => setCurrentScreen("signup")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Verification</h1>
      </header>

      <div className="flex flex-1 flex-col items-center px-6 py-8">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-foreground">Enter OTP</h2>
        <p className="mb-8 text-center text-muted-foreground">
          {"We've sent a verification code to your email address"}
        </p>

        <div className="mb-8 flex gap-3">
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
              className="h-14 w-12 rounded-xl border border-border bg-card text-center text-xl font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          ))}
        </div>

        <Button onClick={handleVerify} className="w-full h-12 text-base font-semibold">
          Verify
        </Button>

        <p className="mt-6 text-muted-foreground">
          {"Didn't receive the code? "}
          <button className="font-semibold text-primary">Resend OTP</button>
        </p>

        <p className="mt-2 text-sm text-muted-foreground">Resend code in 00:30</p>
      </div>
    </div>
  )
}
