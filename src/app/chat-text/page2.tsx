// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Send, Plus, X } from "lucide-react"
// import { useRouter } from "next/navigation"

// type Message = {
//   text: string
//   isUser: boolean
// }

// export default function ChatTextPage() {
//   const router = useRouter()

//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState("")
//   const bottomRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const sendMessage = () => {
//     if (!input.trim()) return

//     const userMessage = input
//     setInput("")

//     // 1 user message
//     setMessages((prev) => [
//       ...prev,
//       { text: userMessage, isUser: true },
//     ])

//     // 2 bot reply (dummy for now)
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: "Thanks for your message , How can I help you further?",
//           isUser: false,
//         },
//       ])
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen bg-[#D0EBEA] flex justify-center">
//       <div className="w-full max-w-2xl flex flex-col">

//         {/* HEADER */}
//         <header className="flex items-center justify-between py-6 px-4">
//           <h1 className="text-2xl font-semibold text-[#97c4e3]">
//             ChatBot
//           </h1>
//           <button
//               onClick={() => router.replace("/")}
//               className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center cursor-pointer hover:text-black transition">
//             <X size={18} />
//           </button>
//         </header>

//         {/* CHAT AREA */}
//         <main className="flex-1 px-4 space-y-4">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-400 mt-20 text-sm">
//               Start the conversation by typing a message 
//             </div>
//           )}

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${
//                 msg.isUser ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
//                   msg.isUser
//                     ? "bg-[#8fa97b] text-white"
//                     : "bg-[#e9f6f6] text-[#1f3d3d]"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={bottomRef} />
//         </main>

//         {/* INPUT BAR */}
//         <footer className="px-4 py-6">
//           <div className="flex items-center gap-3 bg-white border rounded-full px-4 py-3 shadow-sm">
//             <button className="text-[#159a98]">
//               <Plus size={20} />
//             </button>

//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message"
//               className="flex-1 outline-none text-sm"
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />

//             <button
//               onClick={sendMessage}
//               className="w-10 h-10 rounded-full bg-[#159a98] text-white flex items-center justify-center"
//             >
//               <Send size={16} />
//             </button>
//           </div>
//         </footer>

//       </div>
//     </div>
//   )
// }


// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Send, Plus, X } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { Room, RoomEvent } from "livekit-client"
// import { getTokenApiRequest } from "@/network/Api"

// type Message = {
//   text: string
//   isUser: boolean
// }

// export default function ChatTextPage() {
//   const router = useRouter()

//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState("")
//   const [room, setRoom] = useState<Room | null>(null)
//   const bottomRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   // 🔹 Connect to LiveKit on mount
//   useEffect(() => {
//     const connectRoom = async () => {
//       try {
//         const res: any = await getTokenApiRequest()

//         const newRoom = new Room()

//         await newRoom.connect(res.Livekit_url, res.token)

//         console.log("Connected to LiveKit")

//         // Listen for agent reply
//         newRoom.on(RoomEvent.DataReceived, (payload) => {
//           const decoded = new TextDecoder().decode(payload)

//           try {
//             const parsed = JSON.parse(decoded)

//             setMessages((prev) => [
//               ...prev,
//               { text: parsed.message, isUser: false },
//             ])
//           } catch {
//             // Agar plain text aaye to fallback
//             setMessages((prev) => [
//               ...prev,
//               { text: decoded, isUser: false },
//             ])
//           }
//         })


//         setRoom(newRoom)
//       } catch (err) {
//         console.error("Connection failed:", err)
//       }
//     }

//     connectRoom()

//     return () => {
//       room?.disconnect()
//     }
//   }, [])

//   // 🔹 Send message to agent
//   const sendMessage = async () => {
//     if (!input.trim() || !room) return

//     const userMessage = input
//     setInput("")

//     // Show user message in UI
//     setMessages((prev) => [
//       ...prev,
//       { text: userMessage, isUser: true },
//     ])

//     try {
//       await room.localParticipant.publishData(
//         new TextEncoder().encode(userMessage),
//         { reliable: true }
//       )
//     } catch (err) {
//       console.error("Send error:", err)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#D0EBEA] flex justify-center">
//       <div className="w-full max-w-2xl flex flex-col">

//         {/* HEADER */}
//         <header className="flex items-center justify-between py-6 px-4">
//           <h1 className="text-2xl font-semibold text-[#97c4e3]">
//             ChatBot
//           </h1>
//           <button
//             onClick={() => router.replace("/")}
//             className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
//           >
//             <X size={18} />
//           </button>
//         </header>

//         {/* CHAT AREA */}
//         <main className="flex-1 px-4 space-y-4">
//           {messages.length === 0 && (
//             <div className="text-center text-gray-400 mt-20 text-sm">
//               Start the conversation by typing a message
//             </div>
//           )}

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${msg.isUser ? "justify-end" : "justify-start"
//                 }`}
//             >
//               <div
//                 className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm ${msg.isUser
//                     ? "bg-[#8fa97b] text-white"
//                     : "bg-[#e9f6f6] text-[#1f3d3d]"
//                   }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={bottomRef} />
//         </main>

//         {/* INPUT BAR */}
//         <footer className="px-4 py-6">
//           <div className="flex items-center gap-3 bg-white border rounded-full px-4 py-3 shadow-sm">
//             <button className="text-[#159a98]">
//               <Plus size={20} />
//             </button>

//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message"
//               className="flex-1 outline-none text-sm"
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />

//             <button
//               onClick={sendMessage}
//               className="w-10 h-10 rounded-full bg-[#159a98] text-white flex items-center justify-center"
//             >
//               <Send size={16} />
//             </button>
//           </div>
//         </footer>

//       </div>
//     </div>
//   )
// }
