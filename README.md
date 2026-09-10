# 🤖 Voctrum Chatbot Widget

An embeddable, multi-theme AI Chatbot Widget connecting directly to your Python backend at `https://chat.voctrum.com/chatbot/chat`.

Install via npm and use directly in **React**, **Next.js**, **Vue**, or **HTML** by passing your `appName`, `description`, `apiKey`, and `theme` as props.

---

## 📦 Installation

```bash
npm install voctrum_chatbot_widget
```

---

## 🚀 Usage

### 1. React & Next.js (Component Props)

```jsx
import React from 'react';
import { Chatbot } from 'voctrum_chatbot_widget/react';

export default function App() {
  return (
    <div>
      <h1>My Application</h1>

      {/* Floating Chatbot in bottom-right */}
      <Chatbot 
        appName="Voctrum AI"
        description="24/7 Intelligent Support"
        apiKey="YOUR_VOCTRUM_API_KEY"
        theme="cyberpunk" // 'dark' | 'light' | 'cyberpunk' | 'emerald' | 'ocean' | 'sunset' | 'amethyst' | 'midnight'
        position="bottom-right"
      />
    </div>
  );
}
```

---

### 2. Vanilla HTML / Web Page (HTML Attributes)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>

  <!-- Chatbot Widget with attributes -->
  <voctrum-chatbot-widget 
    app-name="Voctrum AI"
    description="24/7 Intelligent Support"
    api-key="YOUR_VOCTRUM_API_KEY"
    theme="cyberpunk"
    position="bottom-right"
  ></voctrum-chatbot-widget>

  <script src="./node_modules/voctrum_chatbot_widget/dist/widget.js"></script>
</body>
</html>
```

---

### 3. Programmatic JavaScript / Vanilla JS

```javascript
import { initChatbot } from 'voctrum_chatbot_widget';

initChatbot({
  appName: 'Voctrum AI',
  description: '24/7 Intelligent Support',
  apiKey: 'YOUR_VOCTRUM_API_KEY',
  theme: 'cyberpunk',
  position: 'bottom-right'
});
```

---

## ⚙️ Component Props & Options

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `appName` | `string` | `'Voctrum AI'` | Chatbot display name shown in header and welcome banner |
| `description` | `string` | `'24/7 Intelligent Support'` | Tagline / subtitle under app name |
| `apiKey` | `string` | `''` | Your Voctrum API key |
| `apiUrl` | `string` | `'https://chat.voctrum.com/chatbot/chat'` | Backend Python chat endpoint |
| `theme` | `string` | `'dark'` | Visual theme (see 8 themes below) |
| `position` | `string` | `'bottom-right'` | Widget position (`'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'`) |
| `welcomeMessage` | `string` | `'Hello! How can I help you today?'` | Initial greeting message |
| `starterPrompts` | `array` | `['What features are available?', ...]` | Quick question suggestion pills |

---

## 🎨 8 Built-In Themes

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
