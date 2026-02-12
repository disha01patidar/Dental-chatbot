type ChatBubbleProps = {
  text: string
  time: string
  isUser?: boolean
}

export default function ChatBubble({
  text,
  time,
  isUser = true,
}: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[70%]">
        
        {/* MESSAGE BUBBLE */}
        <div
          className={`inline-block px-4 py-2 rounded-xl text-sm break-words ${
            isUser
              ? "bg-[#8fa97b] text-white"
              : "bg-[#f3eee9] text-[#3b2f2f]"
          }`}
        >
          {text}
        </div>

        {/* TIME */}
        <div
          className={`text-xs text-gray-400 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {time}
        </div>

      </div>
    </div>
  )
}
