'use client';

import { ChatWidget, createChatAgent } from '@/chat';
import { branding, features } from '@/config';

export function ChatWidgetWrapper() {
  // Only render if chat is enabled and widget mode is active
  if (!features.chat.enabled || !features.chat.modes.includes('widget')) {
    return null;
  }

  const agent = createChatAgent();

  return (
    <ChatWidget 
      config={{
        agent,
        welcomeMessage: `Hi! I'm your ${branding.companyName} assistant. How can I help you today?`,
        placeholder: 'Type your message...',
      }}
    />
  );
}

