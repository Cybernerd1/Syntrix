import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Lazy initialization to prevent build-time errors
let genAI = null;
let model = null;

const getModel = () => {
  if (!model) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    // Only initialize if we have an API key (prevents build-time errors)
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set");
      return null;
    }
    
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
  }
  return model;
};

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Export functions that lazily initialize the chat sessions
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
    generationConfig: CodeGenerationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: '```json\n{\n  "projectTitle": "Project Title Example"\n}\n```',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "status": "Success",\n  "message": "JSON block is complete."\n}\n```',
          },
        ],
      },
    ],
  });
};

// Legacy exports for backward compatibility (will be initialized on first use)
export const chatSession = {
  sendMessage: async (message) => {
    const session = getChatSession();
    return session.sendMessage(message);
  }
};

export const GenAiCode = {
  sendMessage: async (message) => {
    const session = getGenAiCode();
    return session.sendMessage(message);
  }
};
