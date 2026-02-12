// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Mic, Send, Keyboard } from "lucide-react"

// type Message = {
//   text: string
//   time: string
//   isUser: boolean
// }

// export default function VoiceKeyboardChat() {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState("")
//   const [showKeyboard, setShowKeyboard] = useState(false)
//   const [listening, setListening] = useState(false)

//   const endRef = useRef<HTMLDivElement | null>(null)

//   const timeNow = () =>
//     new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })

//   // auto scroll
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   // send text
//   const sendText = () => {
//     if (!input.trim()) return

//     setMessages((prev) => [
//       ...prev,
//       { text: input, time: timeNow(), isUser: true },
//     ])
//     setInput("")
//   }

//   // simulate voice message
//   const handleVoice = () => {
//     setListening(true)

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: "Voice message received",
//           time: timeNow(),
//           isUser: true,
//         },
//       ])
//       setListening(false)
//     }, 1500)
//   }

//   return (
//     <div className="min-h-screen bg-[#8fa97b] flex justify-center items-center px-4">
//       <div className="w-full max-w-md h-[80vh] bg-transparent flex flex-col">

//         {/* CHAT MESSAGES */}
//         <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
//           {messages.map((msg, i) => (
//             <div key={i} className="flex justify-start">
//               <div className="bg-white/20 text-white px-4 py-3 rounded-2xl max-w-[80%]">
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={endRef} />
//         </div>

//         {/* INPUT AREA */}
//         <div className="p-4 space-y-3">

//           {/* TEXT INPUT (toggle) */}
//           {showKeyboard && (
//             <div className="flex items-center bg-white/20 rounded-2xl px-3 py-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message"
//                 className="flex-1 bg-transparent outline-none text-white placeholder-white/70"
//                 onKeyDown={(e) => e.key === "Enter" && sendText()}
//               />
//               <button
//                 onClick={sendText}
//                 className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white"
//               >
//                 <Send size={18} />
//               </button>
//             </div>
//           )}

//           {/* ACTION BAR */}
//           <div className="flex items-center justify-between bg-white/20 rounded-2xl px-4 py-3">

//             {/* MIC */}
//             <button
//               onClick={handleVoice}
//               className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
//                 listening ? "bg-red-500" : "bg-white/30"
//               }`}
//             >
//               <Mic size={20} />
//             </button>

//             {/* KEYBOARD TOGGLE */}
//             <button
//               onClick={() => setShowKeyboard((p) => !p)}
//               className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1fb6b2]"
//             >
//               <Keyboard size={20} />
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
