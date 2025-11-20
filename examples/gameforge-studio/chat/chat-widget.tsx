'use client';

import { useState } from 'react';
import { MessageSquare, X, Minimize2 } from 'lucide-react';
import { ChatInterface } from './chat-interface';
import type { ChatConfig } from './types';
import { features } from '@/config';

interface ChatWidgetProps {
  config: ChatConfig;
}

export function ChatWidget({ config }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const position = features.chat.widgetPosition || 'bottom-right';
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  if (!features.chat.enabled) {
    return null;
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {!isOpen ? (
        // Floating Button
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        // Chat Window
        <div
          className={`bg-background border rounded-lg shadow-2xl transition-all ${
            isMinimized ? 'h-14' : 'h-[600px]'
          } w-96`}
        >
          {/* Header */}
          <div className="h-14 border-b px-4 flex items-center justify-between bg-primary/5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-semibold">Chat Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-muted rounded transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-muted rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="h-[calc(100%-3.5rem)]">
              <ChatInterface config={config} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

