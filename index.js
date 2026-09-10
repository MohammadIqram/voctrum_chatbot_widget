/**
 * Voctrum Chatbot Widget - Main Entry
 */

const { THEMES } = require('./src/themes.js');
const { ChatbotWidget, initChatbot } = require('./src/widget.js');
const { Chatbot } = require('./react.js');

module.exports = {
  THEMES,
  Chatbot,
  ChatbotWidget,
  initChatbot
};
module.exports.default = Chatbot;
