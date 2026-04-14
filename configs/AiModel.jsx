import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Prompt from "@/data/Prompt";

// ── Lazy singleton ──────────────────────────────────────────────
let genAI = null;
let model = null;

const getModel = () => {
  if (!model) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in environment variables!");
      return null;
    }

    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  }
  return model;
};

// ── Generation configs ──────────────────────────────────────────
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// ── Factory helpers ─────────────────────────────────────────────
export const getChatSession = () => {
  const currentModel = getModel();
  if (!currentModel) {
    throw new Error("Gemini API key is not configured");
  }
  return currentModel.startChat({
    generationConfig,
    history: [],
  });
};

export const getGenAiCode = () => {
  const currentModel = getModel();
  if (!currentModel) {
    throw new Error("Gemini API key is not configured");
  }
  return currentModel.startChat({
    generationConfig: codeGenerationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: Prompt.CODE_GEN_PROMPT }],
      },
    ],
  });
};

// ── Legacy proxy exports (backward-compatible) ─────────────────
export const chatSession = {
  sendMessage: async (message) => {
    const session = getChatSession();
    return session.sendMessage(message);
  },
};

export const GenAiCode = {
  sendMessage: async (message) => {
    const session = getGenAiCode();
    return session.sendMessage(message);
  },
};
