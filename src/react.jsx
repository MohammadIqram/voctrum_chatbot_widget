import React, { useEffect } from 'react';
import { initChatbot } from './widget.js';

/**
 * Voctrum Chatbot React Component
 * 
 * Usage:
 * <Chatbot 
 *    appName="Voctrum AI" 
 *    apiKey="your_api_key"
 *    apiUrl="https://chat.voctrum.com/chatbot/chat"
 *    theme="cyberpunk" 
 *    position="bottom-right" 
 * />
 */
export function Chatbot({
  appName,
  description,
  apiKey,
  apiUrl = 'https://chat.voctrum.com/chatbot/chat',
  theme = 'dark',
  position = 'bottom-right',
  welcomeMessage,
  starterPrompts
}) {
  useEffect(() => {
    const widget = initChatbot({
      appName,
      description,
      apiKey,
      apiUrl,
      theme,
      position,
      welcomeMessage,
      starterPrompts
    });

    return () => {
      // Cleanup widget if unmounted
      if (widget && widget.parentNode) {
        widget.parentNode.removeChild(widget);
      }
    };
  }, [appName, description, apiKey, apiUrl, theme, position, welcomeMessage, starterPrompts]);

  return null;
}

export default Chatbot;
