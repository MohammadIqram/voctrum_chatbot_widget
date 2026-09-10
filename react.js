/**
 * Voctrum Chatbot React Component
 * 
 * Usage in React / Next.js:
 * import { Chatbot } from 'voctrum_chatbot_widget/react';
 * 
 * <Chatbot 
 *    appName="Voctrum AI" 
 *    description="24/7 AI Support"
 *    apiKey="your_api_key"
 *    theme="cyberpunk" 
 *    position="bottom-right" 
 * />
 */

const { initChatbot } = require('./src/widget.js');

function Chatbot(props) {
  let React;
  try {
    React = require('react');
  } catch (e) {
    // Fallback if react is not available
  }

  if (React && React.useEffect) {
    React.useEffect(function() {
      var widget = initChatbot({
        appName: props.appName,
        description: props.description,
        apiKey: props.apiKey,
        apiUrl: props.apiUrl || 'https://chat.voctrum.com/chatbot/chat',
        theme: props.theme || 'dark',
        position: props.position || 'bottom-right',
        welcomeMessage: props.welcomeMessage,
        starterPrompts: props.starterPrompts
      });

      return function() {
        if (widget && widget.parentNode) {
          widget.parentNode.removeChild(widget);
        }
      };
    }, [
      props.appName,
      props.description,
      props.apiKey,
      props.apiUrl,
      props.theme,
      props.position,
      props.welcomeMessage,
      props.starterPrompts
    ]);
  } else if (typeof window !== 'undefined') {
    initChatbot(props);
  }

  return null;
}

module.exports = { Chatbot };
module.exports.default = Chatbot;
