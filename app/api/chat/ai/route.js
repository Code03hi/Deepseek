// Please install OpenAI SDK first: `npm install openai`
import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST() {

    try {
        const { userId } = getAuth()
        const { chatId, prompt } = await req.json()

        if (!userId) {
            return NextResponse.json({ message: "User not authenticated", success: false })
        }

        await connectDB()
        const data = await Chat.findOne({ userId, _id: chatId })
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamps: Date.now()
        }

        data.messages.push(userPrompt)


        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true
        });

        const message = completion.choices[0].message
        message.timestamps = Date.now()
        data.messages.push(message)
        data.save()

        return NextResponse.json({ data: message, success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }

}

main();