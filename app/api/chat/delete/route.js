const { default: connectDB } = require("@/config/db");
const { default: Chat } = require("@/models/chat");
const { getAuth } = require("@clerk/nextjs/dist/types/server");
const { NextResponse } = require("next/server");

export async function POST(req) {
    try {
        const { userId } = getAuth()
        const { chatId } = await req.json()

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated"
            })
        }

        await connectDB()
        await Chat.deleteOne({ _id: chatId,userId})

        return NextResponse.json({ success: true, message: "Chat Deleted" })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}