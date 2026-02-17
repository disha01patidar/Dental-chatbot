"use client"

import { useChat, useRoomContext } from "@livekit/components-react"
import { useState, useRef, useEffect } from "react"
import { Send, X, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChatComponent() {
  const router = useRouter()
  const room = useRoomContext()
  const { chatMessages, send, isSending } = useChat()

  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages.length])

  const sendMessage = async () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput("")
    try {
      await send(text)
    } catch (err) {
      console.error("Failed to send message", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#D0EBEA] flex justify-center">
      <div className="w-full max-w-2xl flex flex-col">

        {/* HEADER */}
        <header className="flex items-center justify-between py-6 px-4">
          <h1 className="text-2xl font-semibold text-[#159a98]">
            ChatBot
          </h1>
          <button
            onClick={() => router.replace("/")}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </header>

        {/* CHAT AREA */}
        <main className="flex-1 px-4 space-y-4 overflow-auto flex flex-col">
          {chatMessages.map((msg, i) => {
            const isUser =
              msg.from?.identity === room?.localParticipant.identity

            const displayName = isUser
              ? "You"
              : "AI Assistant"

            return (
              <div
                key={i}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[75%]">

                  {/* Name */}
                  <div
                    className={`text-xs mb-1 ${
                      isUser
                        ? "text-right text-gray-600"
                        : "text-left text-gray-500"
                    }`}
                  >
                    {displayName}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#159a98] text-white rounded-br-none"
                        : "bg-[#e9f6f6] text-[#1f3d3d] rounded-bl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </main>

        {/* INPUT */}
        <footer className="px-4 py-6">
          <div className="flex items-center gap-3 bg-white border rounded-full px-4 py-3 shadow-sm">
            <button className="text-[#159a98]">
              <Plus size={20} />
            </button>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              className="flex-1 outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={isSending}
              className="w-10 h-10 rounded-full bg-[#159a98] text-white flex items-center justify-center disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </footer>

      </div>
    </div>
  )
}
