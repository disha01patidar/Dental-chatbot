"use client"

import { useState } from "react"

type Props = {
  onSend: (text: string) => void
}

export default function ChatInput({ onSend }: Props) {
  const [message, setMessage] = useState("")

  const send = () => {
    if (!message.trim()) return
    onSend(message)
    setMessage("")
  }

  return (
    <div className="bg-white px-4 py-3 flex gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 text-sm"
      />
      <button
        onClick={send}
        className="text-[#f4c430] font-semibold"
      >
        Send
      </button>
    </div>
  )
}
