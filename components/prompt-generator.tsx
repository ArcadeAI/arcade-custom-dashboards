'use client';

import { useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';

const simpleTemplate = `I want to customize this Arcade dashboard.

# Add these for context:
1. Arcade Platform Context: https://docs.arcade.dev/llms.txt
2. Arcade API Reference: https://docs.arcade.dev/en/references

# What I want:
- Dashboard: [GameForge / FinTech / HealthCare]
- File/Widget: [e.g., "FinTech stats cards" or "GameForge analytics chart" or "full HealthCare page"]
- Change: [Describe what you want - colors, layout, data, etc.]

# My details:
- Company: [YOUR COMPANY]
- Colors: [YOUR HEX CODES]
- Goal: [WHAT YOU WANT TO ACHIEVE]

---
The code is in this GitHub repo. Please review and make the changes.`;

export function PromptGenerator() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(simpleTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-800 p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Prompt Template</h3>
          <p className="text-sm text-gray-400">Copy & paste into Claude/ChatGPT</p>
        </div>
      </div>

      <div className="space-y-3">
        <textarea
          value={simpleTemplate}
          readOnly
          className="w-full h-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm font-mono resize-none focus:outline-none"
        />
        
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-orange-700 transition-all shadow-lg"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Template
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          Fill in the [BRACKETS] with your details, paste into AI assistant
        </p>
      </div>
    </div>
  );
}

