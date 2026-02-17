"use client"

import { getTokenApiRequest } from "@/network/Api"
import ChatComponent from "./chat"
import { LiveKitRoom } from "@livekit/components-react"
import "@livekit/components-styles"
import { useState, useEffect } from "react"

export default function ChatPage() {
  const [token, setToken] = useState<string>("")
  const [wsUrl, setWsUrl] = useState<string>("")

  useEffect(() => {
    // TODO: Replace with your backend endpoint that returns a LiveKit token + wsUrl
    async function fetchToken() {
      const res :any= await getTokenApiRequest()
      console.log(res)
      setToken(res.token)
      setWsUrl(res.Livekit_url)
    }
    fetchToken()
  }, [])
  
  if (!token || !wsUrl) {
    return <div>Connecting to LiveKit…</div>
  }

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={true}
      // Optional: customize layout or styles here
    >
      <ChatComponent />
    </LiveKitRoom>
  )
}
