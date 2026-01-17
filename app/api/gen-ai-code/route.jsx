import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req){
    const {prompt} = await req.json();
    
    try {
        const result = await GenAiCode.sendMessage(prompt);
        const resp = result.response.text();
        return NextResponse.json(JSON.parse(resp));
    } catch (e) {
        console.error("Gen AI Code Error:", e.message);
        
        // Return proper error response with status code
        return NextResponse.json(
            { error: e.message || "Failed to generate AI code" },
            { status: 500 }
        );
    }
}