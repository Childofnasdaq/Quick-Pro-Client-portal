'use client'

import { useState } from "react"
import Link from "next/link"
import { AuthForms } from "@/components/auth-forms"
import { CandlestickIcon } from "@/components/candlestick-icon"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Quick Pro
        </Link>
        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-flex gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm text-white">
            SIMPLE · SECURE · FREE
          </div>
          
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Automate your trades with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Pro
            </span>
          </h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                size="lg" 
                className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Let&apos;s Start
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Welcome to Quick Pro</SheetTitle>
                <SheetDescription>
                  Login or create an account to get started
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <AuthForms />
              </div>
            </SheetContent>
          </Sheet>

          <div className="mx-auto mt-12 max-w-sm rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-8">
            <CandlestickIcon className="mx-auto h-32 w-full" />
          </div>

          <section className="mx-auto mt-24 max-w-2xl">
            <h2 className="text-3xl font-bold">Nice Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Experience the power of automated trading with our cutting-edge platform. 
              Our innovative software leverages advanced algorithms to analyze market trends 
              and execute trades with precision. With a remarkable success rate, the AI 
              calculates optimal entry and exit points, ensuring you can make informed 
              decisions for guaranteed profits. Real-time analytics deliver instant insights 
              based on market conditions, while historical data helps you spot winning patterns. 
              The user-friendly interface makes automation a breeze, and customizable alerts 
              ensure you never miss a key opportunity. Connect with a community of traders to 
              share strategies and elevate your trading game with our AI-Powered Trading Tool!
            </p>
          </section>
        </div>
      </main>

      <footer className="mt-12 border-t py-8 text-center text-sm text-gray-500">
        <div className="mb-4 flex justify-center gap-4">
          <Link href="#" className="hover:text-primary">
            Twitter
          </Link>
          <Link href="#" className="hover:text-primary">
            LinkedIn
          </Link>
          <Link href="#" className="hover:text-primary">
            GitHub
          </Link>
        </div>
        <p>Copyright © Quick Pro {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
