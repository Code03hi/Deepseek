const { default: connectDB } = require("@/config/db");
const { default: Chat } = require("@/models/chat");
const { getAuth } = require("@clerk/nextjs/dist/types/server");
const { NextResponse } = require("next/server");

export async function GET(req) {
    try {
        const {userId} = getAuth(req)

        if(!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated"
            })
        }

        await connectDB()
        const data = await Chat.find({userId})

        return NextResponse.json({success: true,data})
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}