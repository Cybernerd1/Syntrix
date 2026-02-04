import { GoogleGenerativeAI } from "@google/generative-ai";
import Prompt from "@/data/Prompt";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error(" NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables!");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Model for general chat
const chatModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Chat session for general conversations
export const chatSession = chatModel.startChat({
  generationConfig,
  history: [],
});

// Model for code generation
const codeGenModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Chat session for code generation
export const GenAiCode = codeGenModel.startChat({
  generationConfig: codeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [{ text: Prompt.CODE_GEN_PROMPT }],
    },
  ],
});
