"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignup = () => {
    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    )

    const userExists = users.some(
      (u: any) => u.email === email
    )

    if (userExists) {
      setError("Account already exists. Please login.")
      return
    }

    // save new user
    users.push({ email, password })
    localStorage.setItem("users", JSON.stringify(users))

    // redirect to login
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#f6f2ee] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-[#159a98] text-white py-3 rounded-xl font-medium"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-5 text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#159a98] cursor-pointer font-medium"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}
