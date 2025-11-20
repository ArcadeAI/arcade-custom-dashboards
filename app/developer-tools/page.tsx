'use client';

import { useState } from 'react';
import { Copy, Check, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

const masterPrompt = `# Arcade Custom Dashboard - AI Customization Prompt

Add these for full context first:
1. Arcade Platform Context: https://docs.arcade.dev/llms.txt
2. Arcade API Reference: https://docs.arcade.dev/en/references/api

---

## About This Project

This is Arcade Custom Dashboards - 3 white-labelable dashboard variations:
- GameForge Studio: Dark theme, gaming style (Tailwind CSS)
- FinTech Pro: Light theme, data tables (Inline CSS)
- HealthCare Hub: Clean design, circular gauges (Inline CSS)

All use 100% real Arcade API data. Only differences: layout, styling, tone.

---

## What I Want to Customize

Dashboard: [GameForge / FinTech / HealthCare / All]

Widget/Component/File: 
[Examples:
  - "FinTech stats cards in app/examples/fintech/page.tsx"
  - "GameForge analytics chart"
  - "HealthCare circular gauges"
  - "Full dashboard page"
  - "Just the tools grid"
]

What to Change:
[Describe: colors, branding, layout, features, etc.]

---

## My Details

- Company Name: [YOUR COMPANY]
- Primary Color: [HEX CODE]
- Secondary Color: [HEX CODE]
- Industry: [YOUR INDUSTRY]
- Goal: [WHAT YOU WANT TO ACHIEVE]

---

## Instructions for AI

Check out this GitHub repository and make the changes above.
Keep all Arcade API integrations working.

---

For widget-specific locations, see:
- prompts/gameforge-prompt.md
- prompts/fintech-prompt.md
- prompts/healthcare-prompt.md

Quick Reference:
- API: https://api.arcade.dev/v1/tools
- Config: config/branding.config.ts, config/api.config.ts
- Deploy: docker-compose up -d`;

export default function DeveloperToolsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Showcase
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Developer Tools</h1>
            <p className="text-gray-400 mt-1">AI-powered customization prompt</p>
          </div>
        </div>
      </div>

      {/* Reference Links - Prominent */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <a 
          href="https://docs.arcade.dev/llms.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
        >
          <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-purple-300">📘 Arcade LLM Context</h3>
          <p className="text-xs text-gray-400">Platform documentation for AI</p>
        </a>
        
        <a 
          href="https://docs.arcade.dev/en/references/api"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-5 rounded-xl bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-500/30 hover:border-orange-500/50 transition-all group"
        >
          <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-orange-300">🔗 API Reference</h3>
          <p className="text-xs text-gray-400">Endpoint documentation</p>
        </a>
        
        <div className="p-5 rounded-xl bg-gray-900/80 border border-gray-800">
          <h3 className="text-sm font-semibold text-white mb-1">📁 Dashboard Refs</h3>
          <p className="text-xs text-gray-400">See prompts/ folder</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-xl bg-gradient-to-br from-purple-900/20 to-orange-900/20 border border-purple-500/30 p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Use</h2>
        <ol className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">1.</span>
            <span>Click "Copy Prompt" below</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">2.</span>
            <span>Paste into Claude, ChatGPT, or Cursor</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">3.</span>
            <span>Fill in the [BRACKETED] placeholders with your details</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400 font-bold">4.</span>
            <span>AI will customize the dashboard for you!</span>
          </li>
        </ol>
      </div>

      {/* Prompt Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Master Prompt Template</h2>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-orange-700 transition-all shadow-lg"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Prompt
              </>
            )}
          </button>
        </div>

        <pre className="bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
          {masterPrompt}
        </pre>
      </div>
    </div>
  );
}

