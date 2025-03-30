'use client'
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [expand,setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading,setLoading] = useState(false)

  return (
    <div>
      <div className="flex h-screen">
        {/* -- sidebar -- */}
        <Sidebar expand={expand} setExpand={setExpand} />
        {/* -- sidebar -- */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 flex items-center justify-between w-full">
            <Image className="rotate-180" src={assets.menu_icon} alt="" onClick={() => (expand ? setExpand(false): setExpand(true))} />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>

          {messages.length === 0 ? (
            <>
            <div className="flex items-center gap-3">
              <Image src={assets.logo_icon} className="h-16" alt="" />
              <p className="text-2xl font-medium">Hi, I'm Deepseek.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ): (<div>
            <Message role='user' content='What is AI' />
          </div>)}

          {/* --prompt box- */}
          <PromptBox isLoading={loading} setIsLoading={setLoading} />

          <p className="text-xs absolute bottom-1 text-gray-500">AI generated for reference only</p>

        </div>
      </div>
    </div>
  );
}
