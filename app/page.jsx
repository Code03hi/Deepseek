'use client'
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [expand,setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading,setLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containRef = useRef(null)

  useEffect(() => {
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(() => {
    if(containRef.current){
      containRef.current.scrollTo({
        top: containRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  },[messages])

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
          ): (<div ref={containRef} className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto">
            <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChat.name}</p>
            {messages.map((msg,index) => (
              <Message role={msg.role} key={index} content={msg.content} />
            ))}
            {
              isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3">
                  <Image src={assets.logo_icon} alt="logo" className="h-9 w-9 p-1 border border-white/15 rounded-full" />
                  <div className="loader flex justify-center items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  </div>
                </div>
              )
            }
          </div>)}

          {/* --prompt box- */}
          <PromptBox isLoading={loading} setIsLoading={setLoading} />

          <p className="text-xs absolute bottom-1 text-gray-500">AI generated for reference only</p>

        </div>
      </div>
    </div>
  );
}
