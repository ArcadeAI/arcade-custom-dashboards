'use client';

import { ChatInterface } from './chat-interface';
import type { ChatConfig } from './types';

interface ChatSidebarProps {
  config: ChatConfig;
  title?: string;
}

export function ChatSidebar({ config, title = 'Chat Assistant' }: ChatSidebarProps) {
  return (
    <div className="h-full border-l bg-background/50 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Ask questions or execute tools
        </p>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface config={config} />
      </div>
    </div>
  );
}

