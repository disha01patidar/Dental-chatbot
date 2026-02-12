"use client"

import { Chat, LiveKitRoom } from "@livekit/components-react"
import "@livekit/components-styles"
import { useEffect, useState } from "react"
import { getTokenApiRequest } from "@/network/Api"

export default function Page() {

  const [token, setToken] = useState<any>()
  const [loading, setLoading] = useState(true)

  const fetchToken = async () => {
    try {
      const res: any = await getTokenApiRequest()

      console.log("LiveKit Token Response:", res)

      if (!res?.token) {
        throw new Error("LiveKit token not found")
      }

      setToken(res)

    } catch (err) {

      console.error("Token error:", err)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchToken()
  }, [])


  //  Don’t mount LiveKitRoom until token is readyoof
  if (loading) {
    return null
  }


  return (
    <LiveKitRoom
    className="h-screen"
      key={token.participant_id}
      token={token?.token}
      serverUrl={token?.livekit_url}

      // room={token?.room_name}
      connect={true}
      data-lk-theme="default"
    >
      <Chat className="h-screen" />
    </LiveKitRoom>

  )
}
