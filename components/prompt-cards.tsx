'use client';

import { useState } from 'react';
import { Palette, BarChart3, Wrench, Building2, Zap, Rocket, Link2, Bot, Check } from 'lucide-react';

const simplePrompts: Record<string, string> = {
  'change-colors': `Customize colors:

Add context: https://docs.arcade.dev/llms.txt
Add API ref: https://docs.arcade.dev/en/references

Dashboard: [GameForge/FinTech/HealthCare]
Change colors to: [YOUR HEX CODES]
File: app/examples/[dashboard]/page.tsx`,

  'copy-widget': `Extract widget:

Add context: https://docs.arcade.dev/llms.txt

Widget: [analytics chart/stats cards/table/gauge]
From: [GameForge/FinTech/HealthCare]
For: [Your framework/app]`,

  'white-label': `White-label dashboard:

Add context: https://docs.arcade.dev/llms.txt

Company: [YOUR COMPANY]
Colors: [PRIMARY], [SECONDARY]
Dashboard: [GameForge/FinTech/HealthCare]`,

  'integrate': `Integrate to my app:

Add context: https://docs.arcade.dev/llms.txt
Add API ref: https://docs.arcade.dev/en/references

My stack: [YOUR FRAMEWORK]
Dashboard: [GameForge/FinTech/HealthCare]
Goal: [WHAT YOU WANT]`,

  'deploy': `Deploy dashboard:

Add context: https://docs.arcade.dev/llms.txt

Platform: [Docker/Vercel/AWS]
Domain: [YOUR DOMAIN]
Help me set up production.`,

  'add-feature': `Add feature:

Add context: https://docs.arcade.dev/llms.txt
Add API ref: https://docs.arcade.dev/en/references

Dashboard: [GameForge/FinTech/HealthCare]
Feature: [DESCRIBE WHAT YOU WANT]`,

  'connect-ai': `Connect my AI:

Add context: https://docs.arcade.dev/llms.txt

AI Provider: [OpenAI/Anthropic/Custom]
File: chat/agent-plugin.ts
Help me integrate.`,

  'copy-component': `Copy component:

Add context: https://docs.arcade.dev/llms.txt

Component: [WHICH ONE]
From: app/examples/[dashboard]/page.tsx
For: [YOUR FRAMEWORK]`,
};

const quickPromptCards = [
  {
    id: 'change-colors',
    icon: Palette,
    title: 'Change Colors',
    description: 'Update to your brand',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'copy-widget',
    icon: BarChart3,
    title: 'Copy Widget',
    description: 'Extract charts',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'copy-component',
    icon: Wrench,
    title: 'Copy Component',
    description: 'Extract UI parts',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'white-label',
    icon: Building2,
    title: 'White-label',
    description: 'Rebrand it',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'add-feature',
    icon: Zap,
    title: 'Add Feature',
    description: 'Custom functionality',
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'deploy',
    icon: Rocket,
    title: 'Deploy',
    description: 'Go to production',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'integrate',
    icon: Link2,
    title: 'Integrate',
    description: 'Add to your app',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'connect-ai',
    icon: Bot,
    title: 'Connect AI',
    description: 'Setup chat',
    color: 'from-green-500 to-emerald-500',
  },
];

export function PromptCards() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string) => {
    const prompt = simplePrompts[id];
    await navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Quick Prompts</h3>
        <p className="text-sm text-gray-400">
          Click to copy, fill in [BRACKETS], paste into AI
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickPromptCards.map((card) => {
          const Icon = card.icon;
          const isCopied = copiedId === card.id;
          
          return (
            <button
              key={card.id}
              onClick={() => handleCopy(card.id)}
              className="group relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-800 p-5 hover:border-gray-700 transition-all text-left hover:scale-105"
            >
              <div className={`absolute top-0 right-0 h-20 w-20 bg-gradient-to-br ${card.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                
                <h4 className="font-semibold text-white text-sm mb-1">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-400 mb-3">
                  {card.description}
                </p>
                
                <div className="flex items-center gap-1.5 text-xs font-medium text-purple-400 group-hover:text-purple-300">
                  {isCopied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    'Click to Copy'
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
