"use client"

import { Chat, LiveKitRoom } from "@livekit/components-react"
import "@livekit/components-styles"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getTokenApiRequest } from "@/network/Api"

export default function Page() {
  const router = useRouter()

  const [token, setToken] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchToken = async () => {
    try {
      //  Check login token first
      const accessToken = localStorage.getItem("Access_Token")

      if (!accessToken) {
        console.log("No login token found")
        router.replace("/login")
        return
      }

      //  Call backend for LiveKit token
      const res: any = await getTokenApiRequest()

      console.log("LiveKit Token Response:", res)

      if (!res?.token) {
        throw new Error("LiveKit token not found")
      }

      setToken(res)

    } catch (err: any) {
      console.error("Token error:", err)
      setError(err?.message || "Failed to get LiveKit token")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchToken()
  }, [])

  //  Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  //  Error UI
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  //  Safety check
  if (!token) {
    return null
  }

  return (
    <LiveKitRoom
      className="h-screen"
      token={token.token}
      serverUrl={token.livekit_url}
      connect={true}
      data-lk-theme="default"
      onConnected={() => console.log("Connected to LiveKit")}
      onDisconnected={() => console.log("Disconnected")}
    >
      <Chat className="h-screen" />
    </LiveKitRoom>
  )
}
