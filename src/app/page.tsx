"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
// import AIAssistant from "../components/AIAssistant"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("Access_Token")
    if (!token) {
      router.replace("/login")
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#f6f2ee]">
        <Navbar />
        <Hero />
       
      
      {/* <AIAssistant /> */}
    </main>
  )
}
