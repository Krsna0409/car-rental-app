"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, Wallet, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"

type PaymentMethod = "card" | "upi" | "wallet"

const paymentMethods = [
  { id: "card" as PaymentMethod, label: "Credit/Debit Card", icon: CreditCard },
  { id: "upi" as PaymentMethod, label: "UPI Payment", icon: Smartphone },
  { id: "wallet" as PaymentMethod, label: "Digital Wallet", icon: Wallet },
]

export function PaymentScreen() {
  const { setCurrentScreen, currentBooking, addBooking } = useApp()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  if (!currentBooking) {
    return null
  }

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      addBooking(currentBooking)
      setCurrentScreen("booking-confirmation")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4">
        <button
          onClick={() => setCurrentScreen("booking-summary")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Payment</h1>
      </header>

      <main className="flex-1 px-4 pb-6">
        {/* Amount */}
        <div className="mb-6 rounded-2xl bg-primary p-6 text-center">
          <p className="text-sm text-primary-foreground/80">Total Amount</p>
          <p className="text-4xl font-bold text-primary-foreground">{formatCurrency(currentBooking.totalCost)}</p>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border-2 p-4 transition-colors",
                  selectedMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    selectedMethod === method.id ? "bg-primary" : "bg-secondary"
                  )}
                >
                  <method.icon
                    className={cn(
                      "h-6 w-6",
                      selectedMethod === method.id ? "text-primary-foreground" : "text-foreground"
                    )}
                  />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">{method.label}</span>
                {selectedMethod === method.id && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Card Details */}
        {selectedMethod === "card" && (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Card Details</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Cardholder Name</label>
              <Input
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">CVV</label>
                <Input
                  type="password"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "upi" && (
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">UPI ID</h3>
            <Input placeholder="yourname@upi" className="h-12" />
          </div>
        )}

        {selectedMethod === "wallet" && (
          <div className="mb-6 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Select Wallet</h3>
            {["PayPal", "Apple Pay", "Google Pay"].map((wallet) => (
              <button
                key={wallet}
                className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Wallet className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground">{wallet}</span>
              </button>
            ))}
          </div>
        )}

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-14 text-lg font-semibold"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Processing...
            </span>
          ) : (
            `Pay $${currentBooking.totalCost}`
          )}
        </Button>
      </main>
    </div>
  )
}
