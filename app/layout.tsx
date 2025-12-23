import type React from "react"
import type { Metadata } from "next"
import { Inter, Newsreader, Geist_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Google API Hub | Integration Guides & Setup",
  description: "Comprehensive guides for integrating Google Workspace, Analytics, and Cloud Platform APIs",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${newsreader.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
