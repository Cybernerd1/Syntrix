"use client";
import React, { useState, useRef, useEffect } from "react";
import { AVAILABLE_MODELS, useModel } from "@/context/ModelContext";
import { ChevronDown, Zap } from "lucide-react";

const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useModel();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (model) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

  // Group models by provider
  const grouped = AVAILABLE_MODELS.reduce((acc, model) => {
    const key = model.provider;
    if (!acc[key]) acc[key] = [];
    acc[key].push(model);
    return acc;
  }, {});

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white group"
        title="Switch AI Model"
      >
        <span
          className="text-sm leading-none"
          style={{ color: selectedModel.color }}
        >
          {selectedModel.icon}
        </span>
        <span className="hidden sm:inline">{selectedModel.name}</span>
        <span className="sm:hidden">{selectedModel.provider}</span>
        <ChevronDown
          className={`h-3 w-3 text-gray-400 group-hover:text-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-2 w-72 rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,15,30,0.98) 0%, rgba(20,20,40,0.98) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Choose AI Model
            </span>
          </div>

          {/* Model Groups */}
          <div className="p-2 max-h-80 overflow-y-auto scrollbar-hide">
            {Object.entries(grouped).map(([provider, models]) => (
              <div key={provider} className="mb-1">
                {/* Provider Label */}
                <div className="px-2 py-1 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                  {provider}
                </div>

                {/* Models in this provider */}
                {models.map((model) => {
                  const isSelected = selectedModel.id === model.id;
                  return (
                    <button
                      key={model.id}
                      onClick={() => handleSelect(model)}
                      className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group
                        ${
                          isSelected
                            ? "bg-white/10 border border-white/15"
                            : "hover:bg-white/5 border border-transparent"
                        }`}
                    >
                      {/* Icon */}
                      <span
                        className="text-lg leading-none mt-0.5 shrink-0"
                        style={{ color: model.color }}
                      >
                        {model.icon}
                      </span>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${isSelected ? "text-white" : "text-gray-300 group-hover:text-white"}`}
                          >
                            {model.name}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold uppercase tracking-wider border border-blue-500/30">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug truncate">
                          {model.description}
                        </p>
                      </div>

                      {/* Checkmark */}
                      {isSelected && (
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: model.color }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 border-t border-white/10">
            <p className="text-[10px] text-gray-600">
              OpenAI & Anthropic models use OpenRouter API
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
