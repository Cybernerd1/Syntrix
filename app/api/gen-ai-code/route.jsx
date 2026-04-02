import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import Prompt from "@/data/Prompt";

// ── Robust JSON extractor ────────────────────────────────────────
// Handles: code fences, surrounding text, truncated output, etc.
function extractJSON(raw) {
  if (!raw || typeof raw !== "string") throw new Error("Empty response from AI");

  let text = raw.trim();

  // 1. Strip ```json ... ``` or ``` ... ``` fences (multiline)
  text = text.replace(/^```(?:json)?\s*/im, "").replace(/\s*```\s*$/im, "").trim();

  // 2. Try direct parse first (fast path)
  try {
    return JSON.parse(text);
  } catch (_) {}

  // 3. Find the outermost { ... } block in the text
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch (_) {}
  }

  // 4. Last resort: throw with the raw snippet so the error is meaningful
  throw new Error(
    `AI returned invalid JSON. Preview (first 300 chars): ${text.slice(0, 300)}`
  );
}

// ── Gemini code gen handler ─────────────────────────────────────
async function handleGemini(prompt, modelId) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelId });
  const codeSession = model.startChat({
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
    history: [
      {
        role: "user",
        parts: [{ text: Prompt.CODE_GEN_PROMPT }],
      },
    ],
  });

  const result = await codeSession.sendMessage(prompt);
  const rawText = result.response.text();
  return extractJSON(rawText);
}

// ── OpenRouter code gen handler ─────────────────────────────────
async function handleOpenRouter(prompt, modelId) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not set");

  const systemPrompt = `${Prompt.CODE_GEN_PROMPT}\n\nCRITICAL: Your ENTIRE response must be a single valid JSON object. No markdown fences, no prose, no code blocks. Start your response with { and end with }.`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: modelId,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
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

  const content = response.data.choices[0]?.message?.content || "{}";
  return extractJSON(content);
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

    return NextResponse.json(result);
  } catch (e) {
    console.error("Gen AI Code Error:", e.message);
    return NextResponse.json(
      { error: e.message || "Failed to generate AI code" },
      { status: 500 }
    );
  }
}