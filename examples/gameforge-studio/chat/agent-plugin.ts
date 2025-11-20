/**
 * Chat Agent Plugin Interface
 * 
 * This file provides the interface and example implementations for connecting
 * your own AI model/agent to the chat interface.
 * 
 * IMPORTANT: This is a UI shell only. You need to implement your own agent logic.
 */

import type { ChatAgent, ChatContext, ChatMessage } from './types';

/**
 * Example: Mock Agent (for testing)
 * Replace this with your actual agent implementation
 */
export class MockChatAgent implements ChatAgent {
  async sendMessage(message: string, context?: ChatContext): Promise<ChatMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `This is a mock response to: "${message}"\n\nTo connect your real agent, implement the ChatAgent interface in chat/agent-plugin.ts`,
      timestamp: new Date(),
    };
  }
}

/**
 * Example: OpenAI Agent
 * 
 * Uncomment and implement this to connect to OpenAI's API
 */
export class OpenAIChatAgent implements ChatAgent {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async sendMessage(message: string, context?: ChatContext): Promise<ChatMessage> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for managing Arcade tools.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      });

      const data = await response.json();
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };
    } catch (error: any) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }
}

/**
 * Example: Custom API Agent
 * 
 * Connect to your own backend API that handles the agent logic
 */
export class CustomAPIAgent implements ChatAgent {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor(endpoint: string, apiKey?: string) {
    this.endpoint = endpoint;
    this.headers = {
      'Content-Type': 'application/json',
    };
    
    if (apiKey) {
      this.headers['Authorization'] = `Bearer ${apiKey}`;
    }
  }

  async sendMessage(message: string, context?: ChatContext): Promise<ChatMessage> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          message,
          context,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: data.id || Date.now().toString(),
        role: 'assistant',
        content: data.content || data.message,
        timestamp: new Date(data.timestamp || Date.now()),
        toolCalls: data.tool_calls,
      };
    } catch (error: any) {
      throw new Error(`Custom API error: ${error.message}`);
    }
  }

  async *streamMessage(message: string, context?: ChatContext): AsyncGenerator<string, void, unknown> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          message,
          context,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        yield chunk;
      }
    } catch (error: any) {
      throw new Error(`Streaming error: ${error.message}`);
    }
  }

  async executeTool(toolName: string, toolArgs: Record<string, any>): Promise<any> {
    try {
      const response = await fetch(`${this.endpoint}/tools/${toolName}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(toolArgs),
      });

      if (!response.ok) {
        throw new Error(`Tool execution error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(`Tool execution failed: ${error.message}`);
    }
  }
}

/**
 * Factory function to create the appropriate agent based on configuration
 */
export function createChatAgent(): ChatAgent {
  // Check environment variables for agent configuration
  const agentType = process.env.NEXT_PUBLIC_CHAT_AGENT_TYPE || 'mock';
  
  switch (agentType) {
    case 'openai':
      const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      if (!openaiKey) {
        console.warn('OpenAI API key not found, falling back to mock agent');
        return new MockChatAgent();
      }
      return new OpenAIChatAgent(openaiKey);
    
    case 'custom':
      const customEndpoint = process.env.NEXT_PUBLIC_CHAT_API_ENDPOINT;
      const customApiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY;
      if (!customEndpoint) {
        console.warn('Custom API endpoint not found, falling back to mock agent');
        return new MockChatAgent();
      }
      return new CustomAPIAgent(customEndpoint, customApiKey);
    
    case 'mock':
    default:
      return new MockChatAgent();
  }
}

