// Test script to check available Gemini models
// Run with: node test-gemini-models.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ NEXT_PUBLIC_GEMINI_API_KEY is not set!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log("🔍 Checking available models with your API key...\n");
    
    const models = [
      "gemini-1.5-pro",
      "gemini-1.5-flash",
      "gemini-pro",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest"
    ];

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`✅ ${modelName} - WORKS`);
      } catch (error) {
        console.log(`❌ ${modelName} - ${error.message.split('\n')[0]}`);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
