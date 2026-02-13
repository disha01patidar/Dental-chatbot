"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("Access_Token")
    console.log(token)
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("Access_Token")
   
    setIsLoggedIn(false)
    // router.push("/login")
  }
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#D0EBEA]/70 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: BRAND */}
        <div className="text-2xl font-semibold text-[#2b2b2b]">
          ToothFairy
        </div>

        {/* CENTER: MENU */}
        <div className="hidden md:flex items-center gap-6 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full text-sm text-gray-700 shadow-sm">
          <NavItem text="About" />
          <NavItem text="Services" />
          <NavItem text="Locations" />
          <NavItem text="Features" />
          <NavItem text="Doctors" />
        </div>

        
        <div className="flex items-center gap-3">

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-[#1f1f1f] text-white text-sm"
            >
              Logout
            </button>
          ) : (
         
          <button 
          onClick={() => router.push("/login")}
          className="px-5 py-2 rounded-full border border-black/20 text-sm">
            Sign in
          </button>
          )}
        </div>

      </div>
    </nav>
  )
}

function NavItem({ text }: { text: string }) {
  return (
    <span className="cursor-pointer hover:text-black transition">
      {text}
    </span>
  )
}
