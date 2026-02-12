import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fredoka } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: 'Drive With Vibes - Car Rental App',
  description: 'Rent your perfect car with style! Easy booking, affordable prices, and a whole lot of fun.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1a3a52',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-fredoka: ${fredoka.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`} style={{ fontFamily: fredoka.style.fontFamily }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
