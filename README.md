# 🤖 Voctrum Chatbot Widget

An embeddable, customizable multi-theme Chatbot Widget connecting directly to your Python backend at `https://chat.voctrum.com/chatbot/chat`.

When installed via `npm install` or executed via `npx`, it launches an interactive configuration wizard to customize your **App Name**, **Description**, **API Key**, **Themes** (8 built-in presets), and **Screen Position**.

---

## ✨ Features

- 🔗 **Direct Python Backend Integration**: Sends user queries and `apiKey` directly to `https://chat.voctrum.com/chatbot/chat`.
- 🎨 **8 Premium Built-In Themes**:
  - 🌙 **Dark** (Sleek Obsidian & Graphite)
  - ☀️ **Light** (Clean Porcelain & Sapphire Blue)
  - ⚡ **Cyberpunk Neon** (Vibrant Magenta & Cyan Glow)
  - 🌲 **Emerald Forest** (Lush Jade & Mint Glass)
  - 🌊 **Ocean Breeze** (Deep Azure & Marine Aqua)
  - 🌅 **Sunset Rose** (Warm Amber & Rose Gold)
  - 🔮 **Royal Amethyst** (Cosmic Violet & Lavender)
  - 🌌 **Midnight Slate** (Titanium & Electric Indigo)
- 🚀 **Interactive CLI Setup Wizard**: Prompts during `npm install` or on-demand via `npx voctrum-chatbot-widget`.
- 🏷️ **Dynamic App Branding**: Your configured App Name and description are prominently featured in the header, welcome banner, and assistant greeting.
- 💬 **Rich Chat Experience**: Markdown formatting, code block copy button, suggestion pills, audio chime effects, and typing wave animation.
- 📱 **Fully Responsive**: Sleek floating bottom-right launcher with smooth expand/collapse transitions and mobile fullscreen drawer support.
- 🔌 **Universal Compatibility**: Works with Vanilla HTML, React, Next.js, Vue, and Angular.

---

## 📦 Installation & Setup

### 1. Install via npm:
```bash
npm install voctrum_chatbot_widget
```
During installation, an interactive prompt will automatically appear:

```text
╔════════════════════════════════════════════════════════════╗
║               🤖 VOCTRUM CHATBOT WIDGET SETUP              ║
╚════════════════════════════════════════════════════════════╝

🏷️  What is your Application / Chatbot name? › My SaaS Bot
📝 Chatbot description / tagline: › 24/7 AI Customer Support
🔑 Enter your Chatbot API Key: › YOUR_VOCTRUM_API_KEY
🌐 Backend Server URL: › https://chat.voctrum.com/chatbot/chat
🎨 Select your preferred Theme preset: › ⚡ Cyberpunk Neon
📍 Widget position on screen: › ↘️ Bottom Right
👋 Welcome greeting message: › Hello! How can I help you?
💡 Starter suggestion questions: › Features, Pricing, Docs
```

*To re-run the configuration wizard at any time:*
```bash
npx voctrum-chatbot-widget
```

---

## 💻 Integration Guide

### Option 1: Vanilla HTML / Web Page
Add the script tag to your HTML file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <!-- Your web page content -->

  <!-- Include Chatbot Widget -->
  <script src="node_modules/voctrum_chatbot_widget/dist/widget.js"></script>
</body>
</html>
```

### Option 2: Declarative HTML Web Component
```html
<voctrum-chatbot-widget 
  app-name="Nova AI"
  description="Next-Gen Analytics Assistant"
  api-key="YOUR_API_KEY"
  api-url="https://chat.voctrum.com/chatbot/chat"
  theme="cyberpunk"
  position="bottom-right"
  welcome-message="Hi there! Ask me anything about Nova."
></voctrum-chatbot-widget>
<script src="dist/widget.js"></script>
```

### Option 3: React / Next.js
```jsx
import React, { useEffect } from 'react';
import { initChatbot } from 'voctrum_chatbot_widget';

export default function App() {
  useEffect(() => {
    initChatbot({
      appName: 'Voctrum Assistant',
      description: 'Intelligent Customer Support',
      apiKey: 'YOUR_VOCTRUM_API_KEY',
      apiUrl: 'https://chat.voctrum.com/chatbot/chat',
      theme: 'amethyst', // 'dark' | 'light' | 'cyberpunk' | 'emerald' | 'ocean' | 'sunset' | 'amethyst' | 'midnight'
      position: 'bottom-right'
    });
  }, []);

  return (
    <div>
      <h1>Welcome to My App</h1>
    </div>
  );
}
```

---

## ⚙️ Backend Request Format

When a user sends a message, the widget makes a `POST` request to `https://chat.voctrum.com/chatbot/chat`:

**Headers:**
```http
Content-Type: application/json
x-api-key: <YOUR_API_KEY>
Authorization: Bearer <YOUR_API_KEY>
```

**JSON Body:**
```json
{
  "message": "Hello!",
  "apiKey": "<YOUR_API_KEY>",
  "api_key": "<YOUR_API_KEY>",
  "history": [
    { "sender": "assistant", "text": "Hello! How can I help you today?" },
    { "sender": "user", "text": "Hello!" }
  ]
}
```

---

## 🎨 Theme Presets

| Theme ID | Name | Accent Colors | Best For |
| :--- | :--- | :--- | :--- |
| `dark` | **Dark** | Indigo & Obsidian | Modern SaaS & Developer tools |
| `light` | **Light** | Sapphire & Clean Porcelain | Corporate & Clean interfaces |
| `cyberpunk` | **Cyberpunk Neon** | Neon Magenta & Cyan | Gaming, Web3 & Tech startups |
| `emerald` | **Emerald Forest** | Mint & Jade Glass | Eco, FinTech & Productivity |
| `ocean` | **Ocean Breeze** | Azure & Aqua Marine | Health, Travel & Communications |
| `sunset` | **Sunset Rose** | Coral Amber & Rose Gold | Creative, Fashion & Lifestyle |
| `amethyst` | **Royal Amethyst** | Violet & Lavender | Premium, Luxury & AI Apps |
| `midnight` | **Midnight Slate** | Titanium & Electric Indigo | Minimalist Enterprise |

---

## 📄 License
MIT © Voctrum
