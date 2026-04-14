"use client";
import React, { createContext, useState, useContext } from "react";

export const AVAILABLE_MODELS = [
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    icon: "✦",
    description: "Fast & efficient Google model",
    color: "#4285F4",
    provider_key: "gemini",
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "Google",
    icon: "✦",
    description: "Latest Google model, more capable",
    color: "#34A853",
    provider_key: "gemini",
  },
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    icon: "◆",
    description: "Fast & affordable via OpenRouter",
    color: "#10A37F",
    provider_key: "openrouter",
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    icon: "◆",
    description: "Most capable OpenAI model via OpenRouter",
    color: "#10A37F",
    provider_key: "openrouter",
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    icon: "◇",
    description: "Powerful reasoning via OpenRouter",
    color: "#D97706",
    provider_key: "openrouter",
  },
];

export const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[2]);

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) throw new Error("useModel must be used within a ModelProvider");
  return context;
};
