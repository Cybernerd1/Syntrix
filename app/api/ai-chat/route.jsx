import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// ── Gemini handler ──────────────────────────────────────────────
async function handleGemini(prompt, modelId) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelId });
  const chatSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

// ── OpenRouter handler ──────────────────────────────────────────
async function handleOpenRouter(prompt, modelId) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set");

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: modelId,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8192,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Syntrix",
      },
    }
  );

  return response.data.choices[0]?.message?.content || "";
}

// ── Route handler ───────────────────────────────────────────────
export async function POST(req) {
  const { prompt, modelId = "gemini-1.5-flash", providerKey = "gemini" } =
    await req.json();

  try {
    let result;

    if (providerKey === "openrouter") {
      result = await handleOpenRouter(prompt, modelId);
    } else {
      result = await handleGemini(prompt, modelId);
    }

    return NextResponse.json({ result });
  } catch (e) {
    console.error("AI Chat Error:", e.message);
    return NextResponse.json(
      { error: e.message || "Failed to get AI response" },
      { status: 500 }
    );
  }
}