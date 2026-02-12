"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Screen =
  | "splash"
  | "login"
  | "signup"
  | "otp"
  | "home"
  | "car-listing"
  | "car-details"
  | "booking-summary"
  | "payment"
  | "booking-confirmation"
  | "my-bookings"
  | "favorites"
  | "profile"
  | "notifications"
  | "location"

export interface Car {
  id: string
  name: string
  brand: string
  model: string
  image: string
  pricePerDay: number
  fuelType: string
  seating: number
  transmission: string
  category: "SUV" | "Sedan" | "Hatchback"
  available: boolean
}

export interface Booking {
  id: string
  car: Car
  pickupDate: string
  dropoffDate: string
  totalDays: number
  totalCost: number
  status: "Confirmed" | "Completed" | "Cancelled"
}

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface LocationData {
  city: string
  state: string
  country: string
}

export interface SignupData {
  fullName: string
  email: string
  phone: string
}

interface AppContextType {
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  selectedCar: Car | null
  setSelectedCar: (car: Car | null) => void
  currentBooking: Booking | null
  setCurrentBooking: (booking: Booking | null) => void
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  favorites: Car[]
  toggleFavorite: (car: Car) => void
  user: { name: string; email: string; phone: string } | null
  setUser: (user: { name: string; email: string; phone: string } | null) => void
  location: LocationData
  setLocation: (location: LocationData) => void
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationAsRead: (id: string) => void
  hasUnreadNotifications: boolean
  signupData: SignupData | null
  setSignupData: (data: SignupData | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const sampleCars: Car[] = [
  {
    id: "1",
    name: "Toyota Fortuner",
    brand: "Toyota",
    model: "Fortuner 2024",
    image: "/cars/fortuner.jpg",
    pricePerDay: 5500,
    fuelType: "Diesel",
    seating: 7,
    transmission: "Automatic",
    category: "SUV",
    available: true,
  },
  {
    id: "2",
    name: "Honda City",
    brand: "Honda",
    model: "City ZX 2024",
    image: "/cars/city.jpg",
    pricePerDay: 2800,
    fuelType: "Petrol",
    seating: 5,
    transmission: "CVT",
    category: "Sedan",
    available: true,
  },
  {
    id: "3",
    name: "Hyundai i20",
    brand: "Hyundai",
    model: "i20 Asta 2024",
    image: "/cars/i20.jpg",
    pricePerDay: 1800,
    fuelType: "Petrol",
    seating: 5,
    transmission: "Manual",
    category: "Hatchback",
    available: true,
  },
  {
    id: "4",
    name: "Mahindra XUV700",
    brand: "Mahindra",
    model: "XUV700 AX7 2024",
    image: "/cars/xuv700.jpg",
    pricePerDay: 4800,
    fuelType: "Diesel",
    seating: 7,
    transmission: "Automatic",
    category: "SUV",
    available: false,
  },
  {
    id: "5",
    name: "Maruti Swift",
    brand: "Maruti Suzuki",
    model: "Swift ZXi 2024",
    image: "/cars/swift.jpg",
    pricePerDay: 1500,
    fuelType: "Petrol",
    seating: 5,
    transmission: "Manual",
    category: "Hatchback",
    available: true,
  },
  {
    id: "6",
    name: "BMW 3 Series",
    brand: "BMW",
    model: "320d 2024",
    image: "/cars/bmw3.jpg",
    pricePerDay: 8500,
    fuelType: "Diesel",
    seating: 5,
    transmission: "Automatic",
    category: "Sedan",
    available: true,
  },
  {
    id: "7",
    name: "Hyundai Creta",
    brand: "Hyundai",
    model: "Creta SX Plus 2024",
    image: "/cars/creta.jpg",
    pricePerDay: 3200,
    fuelType: "Petrol",
    seating: 5,
    transmission: "Automatic",
    category: "SUV",
    available: true,
  },
  {
    id: "8",
    name: "Kia Seltos",
    brand: "Kia",
    model: "Seltos HTX Plus 2024",
    image: "/cars/seltos.jpg",
    pricePerDay: 3400,
    fuelType: "Diesel",
    seating: 5,
    transmission: "Manual",
    category: "SUV",
    available: true,
  },
  {
    id: "9",
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    model: "Innova Crysta 2024",
    image: "/cars/innova.jpg",
    pricePerDay: 4200,
    fuelType: "Diesel",
    seating: 7,
    transmission: "Manual",
    category: "SUV",
    available: true,
  },
  {
    id: "10",
    name: "Hyundai Venue",
    brand: "Hyundai",
    model: "Venue SX 2024",
    image: "/cars/venue.jpg",
    pricePerDay: 2200,
    fuelType: "Petrol",
    seating: 5,
    transmission: "Manual",
    category: "Hatchback",
    available: true,
  },
  {
    id: "11",
    name: "Mahindra Thar",
    brand: "Mahindra",
    model: "Thar Roxx XT 2024",
    image: "/cars/thar.jpg",
    pricePerDay: 4500,
    fuelType: "Petrol",
    seating: 5,
    transmission: "Automatic",
    category: "SUV",
    available: true,
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<Car[]>([])
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null)
  const [signupData, setSignupData] = useState<SignupData | null>(null)
  const [location, setLocation] = useState<LocationData>({
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
  })
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome!",
      message: "Welcome to our Car Rental App. Start your journey today!",
      timestamp: new Date().toISOString(),
      read: false,
    },
  ])

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev])
  }

  const toggleFavorite = (car: Car) => {
    setFavorites((prev) => {
      const exists = prev.find((c) => c.id === car.id)
      if (exists) {
        return prev.filter((c) => c.id !== car.id)
      }
      return [...prev, car]
    })
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    )
  }

  const hasUnreadNotifications = notifications.some((notif) => !notif.read)

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedCar,
        setSelectedCar,
        currentBooking,
        setCurrentBooking,
        bookings,
        addBooking,
        favorites,
        toggleFavorite,
        user,
        setUser,
        signupData,
        setSignupData,
        location,
        setLocation,
        notifications,
        addNotification,
        markNotificationAsRead,
        hasUnreadNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
