"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { SplashScreen } from "@/components/screens/splash-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { SignupScreen } from "@/components/screens/signup-screen"
import { OtpScreen } from "@/components/screens/otp-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { CarListingScreen } from "@/components/screens/car-listing-screen"
import { CarDetailsScreen } from "@/components/screens/car-details-screen"
import { BookingSummaryScreen } from "@/components/screens/booking-summary-screen"
import { PaymentScreen } from "@/components/screens/payment-screen"
import { BookingConfirmationScreen } from "@/components/screens/booking-confirmation-screen"
import { MyBookingsScreen } from "@/components/screens/my-bookings-screen"
import { FavoritesScreen } from "@/components/screens/favorites-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { NotificationsScreen } from "@/components/screens/notifications-screen"
import { LocationScreen } from "@/components/screens/location-screen"

function AppContent() {
  const { currentScreen } = useApp()

  const screens = {
    splash: <SplashScreen />,
    login: <LoginScreen />,
    signup: <SignupScreen />,
    otp: <OtpScreen />,
    home: <HomeScreen />,
    "car-listing": <CarListingScreen />,
    "car-details": <CarDetailsScreen />,
    "booking-summary": <BookingSummaryScreen />,
    payment: <PaymentScreen />,
    "booking-confirmation": <BookingConfirmationScreen />,
    "my-bookings": <MyBookingsScreen />,
    favorites: <FavoritesScreen />,
    profile: <ProfileScreen />,
    notifications: <NotificationsScreen />,
    location: <LocationScreen />,
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {screens[currentScreen]}
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
