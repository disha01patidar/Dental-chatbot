// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { LoginApiRequest } from "@/network/Api"


// export default function LoginPage() {
//   const router = useRouter()


//   const [mounted, setMounted] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setMounted(true)
    
//     const existingToken = localStorage.getItem("Access_Token")
//     if(existingToken){
//       router.replace("/")
//       return ;
//     }
//   }, [])

//   if (!mounted) return null

//   const handleLogin = async () => {
//     setError("")

//     if (!email.trim() || !password.trim()) {
//       setError("Please enter email and password")
//       return
//     }

//     setLoading(true)

//     try {
//       const payload = {
//         email: email.trim(),
//         password: password.trim(),
//       }
//       const response:any = await LoginApiRequest(payload)
//       console.log("response ----->", response)
      

//       //  backend returns token as string OR { token }
//       if (response?.access_token !== "") {
//         const token : string = response?.access_token
//         if (!token) {
//           throw new Error("Invalid login response")
//         }

//         localStorage.setItem("Access_Token",token )
//         router.push("/")
//       }


//     } catch (err: any) {
//       setError(
//         err?.message ||
//         "Login failed. Please check email and password."
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#D0EBEA] flex items-center justify-center px-4">
//       <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

//         <h1 className="text-2xl font-semibold text-center mb-6">
//           Login
//         </h1>

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full border rounded-full px-4 py-3 mb-4 outline-none"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full border rounded-full px-4 py-3 mb-4 outline-none"
//         />

//         {error && (
//           <p className="text-red-500 text-sm mb-3 text-center">
//             {error}
//           </p>
//         )}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-[#159a98] text-white py-3 rounded-full font-medium disabled:opacity-60"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p
//           onClick={() => router.push("/signup")}
//           className="text-sm text-center mt-4 cursor-pointer text-gray-500"
//         >
//           Create account
//         </p>

//       </div>
//     </div>
//   )
// }

// //comment



"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginApiRequest } from "@/network/Api"

export default function LoginPage() {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)

    const existingToken = localStorage.getItem("Access_Token")
    if (existingToken) {
      router.replace("/")
    }
  }, [])

  if (!mounted) return null

  const handleLogin = async () => {
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password")
      return
    }

    try {
      setLoading(true)

      const payload = {
        email: email.trim(),
        password: password.trim(),
      }

      const response: any = await LoginApiRequest(payload)
      console.log("response ----->", response)

      //  Proper token check
      if (response?.access_token) {
        localStorage.setItem("Access_Token", response.access_token)
        router.push("/")
      } else {
        setError("Invalid login response from server")
      }

    } catch (err: any) {

      // 401 error handling
      if (err?.response?.status === 401) {
        setError("Invalid email or password")
      }
      //  Timeout handling
      else if (err?.code === "ECONNABORTED") {
        setError("Server is taking too long to respond")
      }
      else {
        setError("Something went wrong. Please try again.")
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#D0EBEA] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border rounded-full px-4 py-3 mb-4 outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded-full px-4 py-3 mb-4 outline-none"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#159a98] text-white py-3 rounded-full font-medium disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={() => router.push("/signup")}
          className="text-sm text-center mt-4 cursor-pointer text-gray-500"
        >
          Create account
        </p>

      </div>
    </div>
  )
}

