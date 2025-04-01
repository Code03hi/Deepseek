const { default: connectDB } = require("@/config/db");
const { default: Chat } = require("@/models/chat");
const { getAuth } = require("@clerk/nextjs/dist/types/server");
const { NextResponse } = require("next/server");

export async function POST(req) {
    try {
        const {userId} = getAuth(req)

        if(!userId) {
            return NextResponse.json({message: "User not authenticated",success: false})
        }

        // Prepare the chat data to be saved in the database
        const chatData = {
            userId,
            messages: [],
            chatName: "New Chat",
        }

        await connectDB()
        await Chat.create(chatData)

        return NextResponse.json({success: true,message: "Chat created"})
        
    } catch (error) {
        return NextResponse.json({success: false,error: error.message})
    }
}