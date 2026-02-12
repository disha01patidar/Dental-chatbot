"use client"

import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChatbotWidget() {
  const router = useRouter()

  return (
    <div className="fixed bottom-[15%] right-6 z-50">
      
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full bg-[#8fa97b]/30 blur-xl animate-pulse" />

      {/* Button */}
      <button
        onClick={() => router.push("/chat-text")}
        className="relative w-16 h-16 rounded-full bg-[#8fa97b] shadow-2xl flex items-center justify-center text-white
                   hover:scale-105 transition-all duration-300"
      >
        <MessageCircle size={26} />

        {/* Small label */}
        <span className="absolute -top-10 right-0 bg-white text-xs px-3 py-1 rounded-full shadow">
          Chat with AI
        </span>
      </button>
    </div>
  )
}
