"use client"

import { useRouter } from "next/navigation"
import Lottie from "lottie-react"
import chatbotAnimation from "../assets/lotties/chatbot-hero.json"

export default function Hero() {
  const router = useRouter()

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            AI chatbots <br />
            come alive with <br />
            conversation!
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Chat with your AI assistant in real time. Ask questions, get instant
            responses, and build smarter conversations with ease.
          </p>

          <button
            onClick={() => router.push("/chat-text")}
            className="mt-10 inline-flex items-center justify-center
                       bg-[#1fb6b2] hover:bg-[#159a98]
                       text-white text-lg font-medium
                       px-8 py-4 rounded-full shadow-lg transition"
          >
            Chatbot
          </button>
        </div>

        {/* RIGHT ILLUSTRATION / LOTTIE */}
        <div className="flex justify-center">
          <div className="w-[220px] sm:w-[380px] lg:w-[380px]">
            <Lottie
              animationData={chatbotAnimation}
              loop
              autoplay
            />
          </div>
        </div>

      </div>
    </section>
  )
}
