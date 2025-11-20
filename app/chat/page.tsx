'use client';

import { ChatInterface, createChatAgent } from '@/chat';
import { features, branding } from '@/config';
import { MessageSquare, Sparkles, Zap, Bot } from 'lucide-react';

export default function ChatPage() {
  if (!features.chat.enabled) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Chat Disabled</h2>
          <p className="text-gray-400">
            Chat feature is currently disabled. Enable it in config/features.config.ts
          </p>
        </div>
      </div>
    );
  }

  const agent = createChatAgent();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">Chat Assistant</h1>
              <p className="text-purple-100">
                Ask questions or execute tools using natural language
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="border border-gray-700/50 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl" style={{ height: 'calc(100vh - 320px)' }}>
        <ChatInterface
          config={{
            agent,
            welcomeMessage: `Hello! I'm your ${branding.companyName} assistant. I can help you discover and use tools. What would you like to do today?`,
            placeholder: 'Ask me anything about your tools...',
            enableToolCalls: true,
          }}
        />
      </div>

      {/* Feature Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
          <MessageSquare className="h-8 w-8 text-purple-400 mb-3" />
          <h3 className="font-semibold text-white mb-2">Ask Questions</h3>
          <p className="text-sm text-gray-400">
            Get information about available tools, servers, and integrations
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all">
          <Zap className="h-8 w-8 text-pink-400 mb-3" />
          <h3 className="font-semibold text-white mb-2">Execute Tools</h3>
          <p className="text-sm text-gray-400">
            Run tools directly through conversation without manual configuration
          </p>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all">
          <Bot className="h-8 w-8 text-emerald-400 mb-3" />
          <h3 className="font-semibold text-white mb-2">Your AI Model</h3>
          <p className="text-sm text-gray-400">
            Connect your own AI model via chat/agent-plugin.ts
          </p>
        </div>
      </div>
    </div>
  );
}

