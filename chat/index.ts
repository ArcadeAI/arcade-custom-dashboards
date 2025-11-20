/**
 * Chat Module Exports
 */

export { ChatInterface } from './chat-interface';
export { ChatWidget } from './chat-widget';
export { ChatSidebar } from './chat-sidebar';
export { createChatAgent, MockChatAgent, OpenAIChatAgent, CustomAPIAgent } from './agent-plugin';
export type { ChatMessage, ChatAgent, ChatContext, ChatConfig, ChatMode, ToolCall } from './types';

