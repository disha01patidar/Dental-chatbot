// "use client"

// import { Mic, Send } from "lucide-react"
// import { useRouter } from "next/navigation"

// export default function AIAssistant() {
//   const router = useRouter()

//   return (
//     <section className="max-w-5xl mx-auto px-6 mt-20 mb-24">
//       <div className="bg-[#fbf7f4] rounded-3xl p-10 text-center shadow">

//         <h2 className="text-xl font-semibold mb-8">
//           Talk to your AI assistant
//         </h2>

//         {/* VOICE BUTTON */}
//         <div className="flex justify-center mb-8">
//           <button
//             onClick={() => router.push("/chat-voice")}
//             className="w-24 h-24 rounded-full bg-[#8fa97b] text-white flex items-center justify-center shadow-lg"
//           >
//             <Mic size={32} />
//           </button>
//         </div>

//         {/* TEXT INPUT (CLICKABLE) */}
//         <div
//           onClick={() => router.push("/chat-text")}
//           className="flex items-center gap-3 bg-white rounded-full px-4 py-3 max-w-xl mx-auto shadow cursor-pointer"
//         >
//           <span className="text-gray-400 text-sm flex-1">
//             Type your message...
//           </span>

//           <div className="w-9 h-9 rounded-full bg-[#8fa97b] text-white flex items-center justify-center">
//             <Send size={16} />
//           </div>
//         </div>

//       </div>
//     </section>
//   )
// }
