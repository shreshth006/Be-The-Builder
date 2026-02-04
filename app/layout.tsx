import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ACM-VIT Messenger",
  description: "A Frutiger Aero / Y2K style messenger app for ACM-VIT",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
