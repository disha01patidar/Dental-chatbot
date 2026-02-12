"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token")

  //   if (!token) {
  //     router.replace("/login")
  //     setLoading(false)

  //   } else {
  //     setLoading(false)
  //   }
  // }, [router])

  // if (loading) return null

  return <>{children}</>
}
