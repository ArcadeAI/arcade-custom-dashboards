/**
 * Chat Interface Types
 * 
 * Type definitions for the chat interface and agent integration
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
  error?: string;
}

export interface ToolCall {
  id: string;
  name: string;
  toolArgs: Record<string, any>;
  result?: any;
  status: 'pending' | 'success' | 'error';
}

export interface ChatAgent {
  /**
   * Send a message to the agent and get a response
   */
  sendMessage(message: string, context?: ChatContext): Promise<ChatMessage>;
  
  /**
   * Stream a response from the agent
   */
  streamMessage?(message: string, context?: ChatContext): AsyncGenerator<string, void, unknown>;
  
  /**
   * Execute a tool call
   */
  executeTool?(toolName: string, toolArgs: Record<string, any>): Promise<any>;
}

export interface ChatContext {
  conversationId?: string;
  userId?: string;
  currentPage?: string;
  currentTool?: string;
  availableTools?: string[];
  metadata?: Record<string, any>;
}

export interface ChatConfig {
  agent: ChatAgent;
  context?: ChatContext;
  placeholder?: string;
  welcomeMessage?: string;
  enableToolCalls?: boolean;
  maxMessages?: number;
}

export type ChatMode = 'page' | 'widget' | 'sidebar';

