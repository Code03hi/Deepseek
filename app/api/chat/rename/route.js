const { default: connectDB } = require("@/config/db");
const { default: Chat } = require("@/models/chat");
const { getAuth } = require("@clerk/nextjs/dist/types/server");
const { NextResponse } = require("next/server");

export async function POST(req) {
    try {
        const {userId} = getAuth()

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated"
            })
        }

        
        const {chatId,name} = await req.json()
        await connectDB()
        await Chat.findOneAndUpdate({_id: chatId,userId},{name})

        return NextResponse.json({ success: true, message: "Chat Renamed" })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}