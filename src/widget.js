/**
 * Voctrum Chatbot Widget
 * Premium, customizable, multi-theme embeddable AI chatbot widget.
 * Connects directly to Voctrum Python server (https://chat.voctrum.com/chatbot/chat).
 */

(function (global) {
  'use strict';

  // Fallback themes if themes.js is bundled inline or standalone
  const THEMES = (typeof window !== 'undefined' && window.VOCTRUM_THEMES) || {
    dark: {
      id: 'dark',
      name: 'Dark (Obsidian & Graphite)',
      colors: {
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        primaryText: '#ffffff',
        background: '#0f172a',
        surface: '#1e293b',
        surfaceBorder: '#334155',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        botBubbleBg: '#1e293b',
        botBubbleText: '#f1f5f9',
        userBubbleBg: '#6366f1',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        headerText: '#ffffff',
        inputBg: '#0b0f19',
        inputBorder: '#334155',
        inputText: '#f8fafc',
        shadow: '0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(99, 102, 241, 0.2)',
        buttonGlow: '0 8px 25px rgba(99, 102, 241, 0.5)',
        badgeBg: '#10b981',
        suggestionBg: 'rgba(99, 102, 241, 0.12)',
        suggestionBorder: 'rgba(99, 102, 241, 0.3)',
        suggestionText: '#a5b4fc',
      }
    },
    light: {
      id: 'light',
      name: 'Light (Porcelain & Sapphire)',
      colors: {
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        primaryText: '#ffffff',
        background: '#ffffff',
        surface: '#f8fafc',
        surfaceBorder: '#e2e8f0',
        textPrimary: '#0f172a',
        textSecondary: '#64748b',
        botBubbleBg: '#f1f5f9',
        botBubbleText: '#1e293b',
        userBubbleBg: '#2563eb',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        headerText: '#ffffff',
        inputBg: '#f8fafc',
        inputBorder: '#cbd5e1',
        inputText: '#0f172a',
        shadow: '0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 0 20px rgba(37, 99, 235, 0.12)',
        buttonGlow: '0 8px 25px rgba(37, 99, 235, 0.4)',
        badgeBg: '#10b981',
        suggestionBg: 'rgba(37, 99, 235, 0.08)',
        suggestionBorder: 'rgba(37, 99, 235, 0.25)',
        suggestionText: '#2563eb',
      }
    },
    cyberpunk: {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon (Magenta & Cyan)',
      colors: {
        primary: '#ec4899',
        primaryHover: '#db2777',
        primaryText: '#ffffff',
        background: '#090514',
        surface: '#150d2a',
        surfaceBorder: '#3b1d60',
        textPrimary: '#fdf4ff',
        textSecondary: '#a78bfa',
        botBubbleBg: '#1d1238',
        botBubbleText: '#fae8ff',
        userBubbleBg: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #2e0854 0%, #090514 100%)',
        headerText: '#00f5ff',
        inputBg: '#0e081e',
        inputBorder: 'rgba(0, 245, 255, 0.4)',
        inputText: '#fdf4ff',
        shadow: '0 20px 45px -10px rgba(236, 72, 153, 0.35), 0 0 30px rgba(0, 245, 255, 0.25)',
        buttonGlow: '0 8px 30px rgba(236, 72, 153, 0.6), 0 0 15px rgba(0, 245, 255, 0.4)',
        badgeBg: '#00f5ff',
        suggestionBg: 'rgba(236, 72, 153, 0.15)',
        suggestionBorder: 'rgba(236, 72, 153, 0.4)',
        suggestionText: '#f472b6',
      }
    },
    emerald: {
      id: 'emerald',
      name: 'Emerald Forest (Jade & Mint)',
      colors: {
        primary: '#059669',
        primaryHover: '#047857',
        primaryText: '#ffffff',
        background: '#062016',
        surface: '#0d3324',
        surfaceBorder: '#16573c',
        textPrimary: '#ecfdf5',
        textSecondary: '#6ee7b7',
        botBubbleBg: '#0d3827',
        botBubbleText: '#d1fae5',
        userBubbleBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        headerText: '#a7f3d0',
        inputBg: '#041710',
        inputBorder: 'rgba(16, 185, 129, 0.35)',
        inputText: '#ecfdf5',
        shadow: '0 20px 45px -10px rgba(0, 0, 0, 0.75), 0 0 25px rgba(16, 185, 129, 0.25)',
        buttonGlow: '0 8px 25px rgba(16, 185, 129, 0.5)',
        badgeBg: '#34d399',
        suggestionBg: 'rgba(16, 185, 129, 0.12)',
        suggestionBorder: 'rgba(16, 185, 129, 0.35)',
        suggestionText: '#6ee7b7',
      }
    },
    ocean: {
      id: 'ocean',
      name: 'Ocean Breeze (Deep Azure & Aqua)',
      colors: {
        primary: '#0284c7',
        primaryHover: '#0369a1',
        primaryText: '#ffffff',
        background: '#041527',
        surface: '#0a2540',
        surfaceBorder: '#15416d',
        textPrimary: '#f0f9ff',
        textSecondary: '#7dd3fc',
        botBubbleBg: '#0c2d4e',
        botBubbleText: '#e0f2fe',
        userBubbleBg: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #0c4a6e 0%, #031e38 100%)',
        headerText: '#38bdf8',
        inputBg: '#03101e',
        inputBorder: 'rgba(14, 165, 233, 0.35)',
        inputText: '#f0f9ff',
        shadow: '0 20px 45px -10px rgba(2, 132, 199, 0.4), 0 0 25px rgba(56, 189, 248, 0.25)',
        buttonGlow: '0 8px 25px rgba(2, 132, 199, 0.55)',
        badgeBg: '#38bdf8',
        suggestionBg: 'rgba(14, 165, 233, 0.15)',
        suggestionBorder: 'rgba(14, 165, 233, 0.35)',
        suggestionText: '#7dd3fc',
      }
    },
    sunset: {
      id: 'sunset',
      name: 'Sunset Rose (Amber & Rose Gold)',
      colors: {
        primary: '#f43f5e',
        primaryHover: '#e11d48',
        primaryText: '#ffffff',
        background: '#1c0a12',
        surface: '#2e1220',
        surfaceBorder: '#52213a',
        textPrimary: '#fff1f2',
        textSecondary: '#fda4af',
        botBubbleBg: '#341424',
        botBubbleText: '#ffe4e6',
        userBubbleBg: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #881337 0%, #431407 100%)',
        headerText: '#fed7aa',
        inputBg: '#14060d',
        inputBorder: 'rgba(244, 63, 94, 0.35)',
        inputText: '#fff1f2',
        shadow: '0 20px 45px -10px rgba(244, 63, 94, 0.4), 0 0 25px rgba(251, 146, 60, 0.25)',
        buttonGlow: '0 8px 25px rgba(244, 63, 94, 0.55)',
        badgeBg: '#fb923c',
        suggestionBg: 'rgba(244, 63, 94, 0.14)',
        suggestionBorder: 'rgba(244, 63, 94, 0.35)',
        suggestionText: '#fda4af',
      }
    },
    amethyst: {
      id: 'amethyst',
      name: 'Royal Amethyst (Cosmic Violet & Lavender)',
      colors: {
        primary: '#8b5cf6',
        primaryHover: '#7c3aed',
        primaryText: '#ffffff',
        background: '#110c1f',
        surface: '#1f1638',
        surfaceBorder: '#3b2c66',
        textPrimary: '#faf5ff',
        textSecondary: '#c084fc',
        botBubbleBg: '#241a42',
        botBubbleText: '#f3e8ff',
        userBubbleBg: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #4c1d95 0%, #1e1035 100%)',
        headerText: '#e9d5ff',
        inputBg: '#0b0714',
        inputBorder: 'rgba(139, 92, 246, 0.35)',
        inputText: '#faf5ff',
        shadow: '0 20px 45px -10px rgba(139, 92, 246, 0.45), 0 0 25px rgba(192, 132, 252, 0.3)',
        buttonGlow: '0 8px 25px rgba(139, 92, 246, 0.55)',
        badgeBg: '#c084fc',
        suggestionBg: 'rgba(139, 92, 246, 0.15)',
        suggestionBorder: 'rgba(139, 92, 246, 0.35)',
        suggestionText: '#d8b4fe',
      }
    },
    midnight: {
      id: 'midnight',
      name: 'Midnight Slate (Titanium & Electric Indigo)',
      colors: {
        primary: '#4f46e5',
        primaryHover: '#4338ca',
        primaryText: '#ffffff',
        background: '#090a0f',
        surface: '#12141c',
        surfaceBorder: '#232736',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        botBubbleBg: '#181b26',
        botBubbleText: '#e2e8f0',
        userBubbleBg: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
        userBubbleText: '#ffffff',
        headerBg: 'linear-gradient(135deg, #1e1b4b 0%, #090a0f 100%)',
        headerText: '#818cf8',
        inputBg: '#06070a',
        inputBorder: 'rgba(79, 70, 229, 0.35)',
        inputText: '#f8fafc',
        shadow: '0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(79, 70, 229, 0.3)',
        buttonGlow: '0 8px 25px rgba(79, 70, 229, 0.55)',
        badgeBg: '#818cf8',
        suggestionBg: 'rgba(79, 70, 229, 0.12)',
        suggestionBorder: 'rgba(79, 70, 229, 0.3)',
        suggestionText: '#a5b4fc',
      }
    }
  };

  /**
   * Helper to format markdown text safely to HTML
   */
  function parseMarkdown(text) {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks with syntax copy button
    escaped = escaped.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<div class="code-block-wrapper"><div class="code-header"><span>${lang || 'code'}</span><button class="copy-code-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText); this.innerText='Copied!'; setTimeout(()=>this.innerText='Copy', 2000)">Copy</button></div><pre><code>${code.trim()}</code></pre></div>`;
    });

    // Inline code
    escaped = escaped.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Bold & Italic
    escaped = escaped.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Bullet lists
    escaped = escaped.replace(/^\s*[-*]\s+(.*)$/gm, '<li class="chat-li">$1</li>');
    escaped = escaped.replace(/(<li class="chat-li">.*<\/li>(\n|$))+/g, '<ul class="chat-ul">$&</ul>');

    // Paragraphs / line breaks
    escaped = escaped.replace(/\n\n/g, '<p class="chat-p"></p>');
    escaped = escaped.replace(/\n/g, '<br>');

    // Links
    escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>');

    return escaped;
  }

  class ChatbotWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isOpen = false;
      this.isSoundEnabled = true;
      this.isTyping = false;
      this.messages = [];
      this.config = {
        appName: 'Voctrum AI',
        description: 'Instant answers & intelligent assistance',
        apiKey: '',
        apiUrl: 'https://chat.voctrum.com/chatbot/chat',
        theme: 'dark',
        position: 'bottom-right',
        welcomeMessage: 'Hello! I am your AI assistant. How can I help you today?',
        starterPrompts: [
          'What features does this app offer?',
          'How can I get started?',
          'Contact Support'
        ],
        avatarUrl: ''
      };
    }

    static get observedAttributes() {
      return ['app-name', 'description', 'theme', 'position', 'api-key', 'api-url', 'welcome-message'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (name === 'app-name') this.config.appName = newValue;
        if (name === 'description') this.config.description = newValue;
        if (name === 'theme') {
          this.config.theme = newValue;
          this.applyTheme(newValue);
        }
        if (name === 'position') this.config.position = newValue;
        if (name === 'api-key') this.config.apiKey = newValue;
        if (name === 'api-url') this.config.apiUrl = newValue;
        if (name === 'welcome-message') this.config.welcomeMessage = newValue;
      }
    }

    async connectedCallback() {
      await this.loadConfiguration();
      this.initMessages();
      this.render();
      this.bindEvents();
      this.applyTheme(this.config.theme);
    }

    async loadConfiguration() {
      // 1. Read attribute overrides
      const attrName = this.getAttribute('app-name');
      const attrDesc = this.getAttribute('description');
      const attrTheme = this.getAttribute('theme');
      const attrPos = this.getAttribute('position');
      const attrKey = this.getAttribute('api-key');
      const attrUrl = this.getAttribute('api-url');
      const attrWelcome = this.getAttribute('welcome-message');

      // 2. Window global configuration
      const windowConfig = (typeof window !== 'undefined' && window.__VOCTRUM_CHATBOT_CONFIG__) || {};

      // 3. Try to fetch chatbot.config.json if available locally
      let jsonConfig = {};
      try {
        const res = await fetch('./chatbot.config.json', { cache: 'no-cache' });
        if (res.ok) {
          jsonConfig = await res.json();
        }
      } catch (e) {
        // Silent catch for local environments without config file
      }

      this.config = {
        ...this.config,
        ...jsonConfig,
        ...windowConfig,
        ...(attrName && { appName: attrName }),
        ...(attrDesc && { description: attrDesc }),
        ...(attrTheme && { theme: attrTheme }),
        ...(attrPos && { position: attrPos }),
        ...(attrKey && { apiKey: attrKey }),
        ...(attrUrl && { apiUrl: attrUrl }),
        ...(attrWelcome && { welcomeMessage: attrWelcome }),
      };

      // If starterPrompts is a comma string in jsonConfig, format it
      if (typeof this.config.starterPrompts === 'string') {
        this.config.starterPrompts = this.config.starterPrompts.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    initMessages() {
      const saved = localStorage.getItem(`voctrum_chat_${this.config.appName.replace(/\s+/g, '_').toLowerCase()}`);
      if (saved) {
        try {
          this.messages = JSON.parse(saved);
        } catch (e) {
          this.messages = [];
        }
      }

      if (this.messages.length === 0) {
        this.messages.push({
          id: 'welcome-' + Date.now(),
          sender: 'assistant',
          text: this.config.welcomeMessage,
          time: this.formatTime(new Date())
        });
      }
    }

    saveMessages() {
      localStorage.setItem(`voctrum_chat_${this.config.appName.replace(/\s+/g, '_').toLowerCase()}`, JSON.stringify(this.messages));
    }

    formatTime(date) {
      return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    getThemeColors(themeId) {
      const theme = THEMES[themeId] || THEMES.dark;
      return theme.colors;
    }

    applyTheme(themeId) {
      const colors = this.getThemeColors(themeId);
      const container = this.shadowRoot.querySelector('.voctrum-root');
      if (!container) return;

      Object.entries(colors).forEach(([key, val]) => {
        container.style.setProperty(`--vt-${key}`, val);
      });

      // Update theme selector dropdown value if present
      const themeSelect = this.shadowRoot.getElementById('theme-select');
      if (themeSelect && themeSelect.value !== themeId) {
        themeSelect.value = themeId;
      }
    }

    playChime(type = 'receive') {
      if (!this.isSoundEnabled) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'send') {
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        } else {
          osc.frequency.setValueAtTime(659.25, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }
      } catch (e) {
        // AudioContext not allowed before user gesture
      }
    }

    render() {
      const isLeft = this.config.position.includes('left');
      const isTop = this.config.position.includes('top');

      const themeOptions = Object.keys(THEMES).map(k => {
        const t = THEMES[k];
        return `<option value="${t.id}" ${t.id === this.config.theme ? 'selected' : ''}>${t.name}</option>`;
      }).join('');

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            all: initial;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            box-sizing: border-box;
          }

          *, *::before, *::after {
            box-sizing: border-box;
          }

          .voctrum-root {
            --vt-primary: #6366f1;
            --vt-primaryHover: #4f46e5;
            --vt-primaryText: #ffffff;
            --vt-background: #0f172a;
            --vt-surface: #1e293b;
            --vt-surfaceBorder: #334155;
            --vt-textPrimary: #f8fafc;
            --vt-textSecondary: #94a3b8;
            --vt-botBubbleBg: #1e293b;
            --vt-botBubbleText: #f1f5f9;
            --vt-userBubbleBg: #6366f1;
            --vt-userBubbleText: #ffffff;
            --vt-headerBg: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
            --vt-headerText: #ffffff;
            --vt-inputBg: #0b0f19;
            --vt-inputBorder: #334155;
            --vt-inputText: #f8fafc;
            --vt-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7);
            --vt-buttonGlow: 0 8px 25px rgba(99, 102, 241, 0.5);
            --vt-badgeBg: #10b981;
            --vt-suggestionBg: rgba(99, 102, 241, 0.12);
            --vt-suggestionBorder: rgba(99, 102, 241, 0.3);
            --vt-suggestionText: #a5b4fc;
          }

          /* Floating Launcher Button */
          .launcher-wrapper {
            position: fixed;
            ${isTop ? 'top: 24px;' : 'bottom: 24px;'}
            ${isLeft ? 'left: 24px;' : 'right: 24px;'}
            z-index: 2147483647;
            display: flex;
            flex-direction: column;
            align-items: ${isLeft ? 'flex-start' : 'flex-end'};
            gap: 12px;
          }

          .launcher-btn {
            width: 62px;
            height: 62px;
            border-radius: 50%;
            background: var(--vt-primary);
            color: var(--vt-primaryText);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--vt-shadow), var(--vt-buttonGlow);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            outline: none;
          }

          .launcher-btn:hover {
            transform: scale(1.08) translateY(-2px);
            background: var(--vt-primaryHover);
          }

          .launcher-btn:active {
            transform: scale(0.95);
          }

          .launcher-icon-chat, .launcher-icon-close {
            position: absolute;
            transition: all 0.3s ease;
          }

          .launcher-icon-chat {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }

          .launcher-icon-close {
            opacity: 0;
            transform: scale(0.5) rotate(-90deg);
          }

          .launcher-btn.is-active .launcher-icon-chat {
            opacity: 0;
            transform: scale(0.5) rotate(90deg);
          }

          .launcher-btn.is-active .launcher-icon-close {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }

          .online-ping {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 14px;
            height: 14px;
            background: var(--vt-badgeBg);
            border: 2px solid var(--vt-background);
            border-radius: 50%;
          }

          .online-ping::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--vt-badgeBg);
            animation: pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
          }

          @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(2.2); opacity: 0; }
          }

          /* Chat Window Modal */
          .chat-window {
            position: fixed;
            ${isTop ? 'top: 96px;' : 'bottom: 96px;'}
            ${isLeft ? 'left: 24px;' : 'right: 24px;'}
            width: 390px;
            max-width: calc(100vw - 48px);
            height: 590px;
            max-height: calc(100vh - 120px);
            background: var(--vt-background);
            border: 1px solid var(--vt-surfaceBorder);
            border-radius: 20px;
            box-shadow: var(--vt-shadow);
            z-index: 2147483646;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.96);
            transform-origin: ${isLeft ? 'bottom left' : 'bottom right'};
            transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                        visibility 0.28s ease;
          }

          .chat-window.is-open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
          }

          /* Header */
          .chat-header {
            background: var(--vt-headerBg);
            color: var(--vt-headerText);
            padding: 16px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--vt-surfaceBorder);
            user-select: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .header-info {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
          }

          .bot-avatar-badge {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .header-text {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .app-title {
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.01em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .online-status-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            display: inline-block;
          }

          .app-subtitle {
            font-size: 11.5px;
            opacity: 0.85;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .header-actions {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .header-btn {
            background: rgba(255, 255, 255, 0.12);
            border: none;
            color: inherit;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            font-size: 14px;
          }

          .header-btn:hover {
            background: rgba(255, 255, 255, 0.22);
            transform: translateY(-1px);
          }

          /* Theme Toolbar */
          .theme-bar {
            background: var(--vt-surface);
            padding: 8px 14px;
            border-bottom: 1px solid var(--vt-surfaceBorder);
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: var(--vt-textSecondary);
          }

          .theme-select {
            background: var(--vt-background);
            color: var(--vt-textPrimary);
            border: 1px solid var(--vt-surfaceBorder);
            border-radius: 6px;
            padding: 3px 8px;
            font-size: 11.5px;
            outline: none;
            cursor: pointer;
          }

          /* Messages Container */
          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            background: var(--vt-background);
            scroll-behavior: smooth;
          }

          .chat-messages::-webkit-scrollbar {
            width: 6px;
          }
          .chat-messages::-webkit-scrollbar-thumb {
            background: var(--vt-surfaceBorder);
            border-radius: 4px;
          }

          /* Welcome Banner */
          .welcome-banner {
            background: var(--vt-surface);
            border: 1px solid var(--vt-surfaceBorder);
            border-radius: 14px;
            padding: 14px;
            text-align: center;
            margin-bottom: 6px;
          }

          .welcome-banner-title {
            font-weight: 700;
            color: var(--vt-textPrimary);
            font-size: 14px;
            margin-bottom: 4px;
          }

          .welcome-banner-desc {
            font-size: 12px;
            color: var(--vt-textSecondary);
            line-height: 1.4;
          }

          /* Message Bubbles */
          .message-row {
            display: flex;
            gap: 10px;
            max-width: 86%;
            animation: fadeInMsg 0.25s ease-out;
          }

          @keyframes fadeInMsg {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .message-row.user {
            align-self: flex-end;
            flex-direction: row-reverse;
          }

          .message-row.assistant {
            align-self: flex-start;
          }

          .msg-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--vt-surfaceBorder);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .message-bubble {
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 13.5px;
            line-height: 1.5;
            position: relative;
            word-break: break-word;
          }

          .message-row.assistant .message-bubble {
            background: var(--vt-botBubbleBg);
            color: var(--vt-botBubbleText);
            border: 1px solid var(--vt-surfaceBorder);
            border-top-left-radius: 4px;
          }

          .message-row.user .message-bubble {
            background: var(--vt-userBubbleBg);
            color: var(--vt-userBubbleText);
            border-top-right-radius: 4px;
          }

          .msg-time {
            font-size: 10px;
            opacity: 0.65;
            margin-top: 4px;
            text-align: right;
          }

          /* Suggestion Chips */
          .suggestions-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 6px;
          }

          .suggestion-chip {
            background: var(--vt-suggestionBg);
            border: 1px solid var(--vt-suggestionBorder);
            color: var(--vt-suggestionText);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
          }

          .suggestion-chip:hover {
            transform: translateY(-1px);
            filter: brightness(1.15);
          }

          /* Markdown Formatting */
          .inline-code {
            background: rgba(0,0,0,0.25);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
          }

          .code-block-wrapper {
            background: #090a0f;
            border: 1px solid var(--vt-surfaceBorder);
            border-radius: 8px;
            margin: 8px 0;
            overflow: hidden;
          }

          .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #141721;
            padding: 4px 10px;
            font-size: 11px;
            color: #94a3b8;
          }

          .copy-code-btn {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 11px;
          }

          .copy-code-btn:hover {
            color: #ffffff;
          }

          pre {
            margin: 0;
            padding: 8px 10px;
            overflow-x: auto;
            font-size: 12px;
            color: #f1f5f9;
            font-family: Consolas, Monaco, "Courier New", monospace;
          }

          .chat-ul {
            margin: 4px 0;
            padding-left: 20px;
          }

          .chat-li {
            margin-bottom: 3px;
          }

          .chat-link {
            color: var(--vt-primary);
            text-decoration: underline;
          }

          /* Typing Animation */
          .typing-indicator {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 10px 14px;
            background: var(--vt-botBubbleBg);
            border: 1px solid var(--vt-surfaceBorder);
            border-radius: 16px;
            border-top-left-radius: 4px;
            width: fit-content;
          }

          .typing-dot {
            width: 6px;
            height: 6px;
            background: var(--vt-textSecondary);
            border-radius: 50%;
            animation: bounceDot 1.4s infinite ease-in-out both;
          }

          .typing-dot:nth-child(1) { animation-delay: -0.32s; }
          .typing-dot:nth-child(2) { animation-delay: -0.16s; }

          @keyframes bounceDot {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1.1); opacity: 1; }
          }

          /* Input Area */
          .chat-input-area {
            background: var(--vt-surface);
            border-top: 1px solid var(--vt-surfaceBorder);
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .input-box-wrapper {
            display: flex;
            align-items: flex-end;
            background: var(--vt-inputBg);
            border: 1px solid var(--vt-inputBorder);
            border-radius: 14px;
            padding: 6px 10px;
            gap: 8px;
            transition: border-color 0.2s;
          }

          .input-box-wrapper:focus-within {
            border-color: var(--vt-primary);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          }

          .chat-textarea {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            resize: none;
            color: var(--vt-inputText);
            font-size: 13.5px;
            font-family: inherit;
            line-height: 1.4;
            max-height: 100px;
            padding: 4px 0;
          }

          .chat-textarea::placeholder {
            color: var(--vt-textSecondary);
            opacity: 0.7;
          }

          .send-btn {
            background: var(--vt-primary);
            color: var(--vt-primaryText);
            border: none;
            border-radius: 10px;
            width: 32px;
            height: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
          }

          .send-btn:hover {
            background: var(--vt-primaryHover);
            transform: scale(1.05);
          }

          .send-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            transform: none;
          }

          .footer-brand {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
            color: var(--vt-textSecondary);
            opacity: 0.8;
            padding: 0 4px;
          }

          .powered-by {
            text-decoration: none;
            color: inherit;
            font-weight: 500;
          }

          /* Mobile responsiveness */
          @media (max-width: 480px) {
            .chat-window {
              width: 100vw;
              height: 100vh;
              max-width: 100vw;
              max-height: 100vh;
              bottom: 0 !important;
              right: 0 !important;
              left: 0 !important;
              top: 0 !important;
              border-radius: 0;
            }
          }
        </style>

        <div class="voctrum-root">
          <!-- Floating Trigger Button -->
          <div class="launcher-wrapper" id="launcher-wrapper">
            <button class="launcher-btn" id="launcher-btn" aria-label="Open Chatbot">
              <span class="online-ping"></span>
              <svg class="launcher-icon-chat" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <svg class="launcher-icon-close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Chat Window -->
          <div class="chat-window" id="chat-window">
            <!-- Header -->
            <div class="chat-header">
              <div class="header-info">
                <div class="bot-avatar-badge">🤖</div>
                <div class="header-text">
                  <div class="app-title">
                    <span id="app-title-text">${this.config.appName}</span>
                    <span class="online-status-dot" title="Online"></span>
                  </div>
                  <div class="app-subtitle" id="app-subtitle-text">${this.config.description}</div>
                </div>
              </div>
              <div class="header-actions">
                <button class="header-btn" id="sound-btn" title="Toggle Sound">🔔</button>
                <button class="header-btn" id="reset-btn" title="Reset Conversation">🔄</button>
                <button class="header-btn" id="close-btn" title="Close">✕</button>
              </div>
            </div>

            <!-- Theme Toolbar -->
            <div class="theme-bar">
              <span>Theme Style</span>
              <select class="theme-select" id="theme-select">
                ${themeOptions}
              </select>
            </div>

            <!-- Messages Area -->
            <div class="chat-messages" id="chat-messages">
              <div class="welcome-banner">
                <div class="welcome-banner-title">Welcome to ${this.config.appName}</div>
                <div class="welcome-banner-desc">${this.config.description}</div>
              </div>

              <!-- Suggestion Chips -->
              <div class="suggestions-wrapper" id="suggestions-wrapper">
                ${this.config.starterPrompts.map(p => `<button class="suggestion-chip" data-prompt="${p}">${p}</button>`).join('')}
              </div>

              <!-- Message list container -->
              <div id="messages-list"></div>

              <!-- Typing indicator -->
              <div class="typing-indicator" id="typing-indicator" style="display: none;">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            </div>

            <!-- Input Area -->
            <div class="chat-input-area">
              <div class="input-box-wrapper">
                <textarea class="chat-textarea" id="chat-input" placeholder="Type a message..." rows="1"></textarea>
                <button class="send-btn" id="send-btn" title="Send message">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
              <div class="footer-brand">
                <span>Press Enter to send</span>
                <span class="powered-by">⚡ ${this.config.appName} Widget</span>
              </div>
            </div>
          </div>
        </div>
      `;

      this.renderMessages();
    }

    renderMessages() {
      const list = this.shadowRoot.getElementById('messages-list');
      if (!list) return;

      list.innerHTML = this.messages.map(m => `
        <div class="message-row ${m.sender}">
          <div class="msg-avatar">${m.sender === 'user' ? '👤' : '🤖'}</div>
          <div class="message-bubble">
            <div class="msg-content">${parseMarkdown(m.text)}</div>
            <div class="msg-time">${m.time}</div>
          </div>
        </div>
      `).join('');

      this.scrollToBottom();
    }

    scrollToBottom() {
      const messagesContainer = this.shadowRoot.getElementById('chat-messages');
      if (messagesContainer) {
        setTimeout(() => {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 50);
      }
    }

    bindEvents() {
      const launcherBtn = this.shadowRoot.getElementById('launcher-btn');
      const closeBtn = this.shadowRoot.getElementById('close-btn');
      const resetBtn = this.shadowRoot.getElementById('reset-btn');
      const soundBtn = this.shadowRoot.getElementById('sound-btn');
      const themeSelect = this.shadowRoot.getElementById('theme-select');
      const sendBtn = this.shadowRoot.getElementById('send-btn');
      const chatInput = this.shadowRoot.getElementById('chat-input');
      const suggestionsWrapper = this.shadowRoot.getElementById('suggestions-wrapper');

      // Launcher toggle
      launcherBtn.addEventListener('click', () => this.toggleChat());
      closeBtn.addEventListener('click', () => this.toggleChat(false));

      // Reset
      resetBtn.addEventListener('click', () => {
        if (confirm('Clear chat conversation history?')) {
          this.messages = [{
            id: 'welcome-' + Date.now(),
            sender: 'assistant',
            text: this.config.welcomeMessage,
            time: this.formatTime(new Date())
          }];
          this.saveMessages();
          this.renderMessages();
        }
      });

      // Sound toggle
      soundBtn.addEventListener('click', () => {
        this.isSoundEnabled = !this.isSoundEnabled;
        soundBtn.innerText = this.isSoundEnabled ? '🔔' : '🔕';
      });

      // Live Theme selector
      themeSelect.addEventListener('change', (e) => {
        this.config.theme = e.target.value;
        this.applyTheme(e.target.value);
      });

      // Suggestion chips
      suggestionsWrapper.addEventListener('click', (e) => {
        const chip = e.target.closest('.suggestion-chip');
        if (chip) {
          const prompt = chip.getAttribute('data-prompt');
          this.sendMessage(prompt);
        }
      });

      // Input send
      sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
          this.sendMessage(text);
          chatInput.value = '';
          chatInput.style.height = 'auto';
        }
      });

      // Input keydown
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const text = chatInput.value.trim();
          if (text) {
            this.sendMessage(text);
            chatInput.value = '';
            chatInput.style.height = 'auto';
          }
        }
      });

      // Auto resize textarea
      chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
      });
    }

    toggleChat(forceState) {
      this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
      const chatWindow = this.shadowRoot.getElementById('chat-window');
      const launcherBtn = this.shadowRoot.getElementById('launcher-btn');

      if (this.isOpen) {
        chatWindow.classList.add('is-open');
        launcherBtn.classList.add('is-active');
        const chatInput = this.shadowRoot.getElementById('chat-input');
        if (chatInput) setTimeout(() => chatInput.focus(), 300);
        this.scrollToBottom();
      } else {
        chatWindow.classList.remove('is-open');
        launcherBtn.classList.remove('is-active');
      }
    }

    async sendMessage(text) {
      if (this.isTyping) return;

      const userMsg = {
        id: 'u-' + Date.now(),
        sender: 'user',
        text: text,
        time: this.formatTime(new Date())
      };

      this.messages.push(userMsg);
      this.renderMessages();
      this.saveMessages();
      this.playChime('send');

      // Set typing indicator
      this.setTyping(true);

      try {
        const replyText = await this.fetchAIReply(text);
        this.messages.push({
          id: 'a-' + Date.now(),
          sender: 'assistant',
          text: replyText,
          time: this.formatTime(new Date())
        });
        this.saveMessages();
        this.renderMessages();
        this.playChime('receive');
      } catch (err) {
        this.messages.push({
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: `⚠️ **Server connection issue:** ${err.message || 'Unable to connect to chat server.'}`,
          time: this.formatTime(new Date())
        });
        this.renderMessages();
      } finally {
        this.setTyping(false);
      }
    }

    setTyping(typing) {
      this.isTyping = typing;
      const indicator = this.shadowRoot.getElementById('typing-indicator');
      const sendBtn = this.shadowRoot.getElementById('send-btn');
      if (indicator) indicator.style.display = typing ? 'flex' : 'none';
      if (sendBtn) sendBtn.disabled = typing;
      this.scrollToBottom();
    }

    async fetchAIReply(userPrompt) {
      const { apiKey, apiUrl, appName } = this.config;
      const endpoint = apiUrl || 'https://chat.voctrum.com/chatbot/chat';

      // 1. Call Python Server (https://chat.voctrum.com/chatbot/chat)
      if (apiKey) {
        const payload = {
          message: userPrompt,
          apiKey: apiKey,
          api_key: apiKey,
          history: this.messages.slice(-6).map(m => ({
            sender: m.sender,
            text: m.text
          }))
        };

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          let errMsg = `Server responded with HTTP ${response.status}`;
          try {
            const errJson = await response.json();
            errMsg = errJson.message || errJson.error || errJson.detail || errMsg;
          } catch (e) {
            const errText = await response.text().catch(() => '');
            if (errText) errMsg = errText;
          }
          throw new Error(errMsg);
        }

        const data = await response.json().catch(async () => {
          const txt = await response.text();
          return { response: txt };
        });

        // Flexible response parsing for Python backend formats
        if (typeof data === 'string') return data;
        if (data.response) return typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
        if (data.reply) return typeof data.reply === 'string' ? data.reply : JSON.stringify(data.reply);
        if (data.message) return typeof data.message === 'string' ? data.message : JSON.stringify(data.message);
        if (data.answer) return typeof data.answer === 'string' ? data.answer : JSON.stringify(data.answer);
        if (data.text) return typeof data.text === 'string' ? data.text : JSON.stringify(data.text);
        if (data.data && typeof data.data === 'string') return data.data;
        if (data.data && data.data.reply) return data.data.reply;
        if (data.data && data.data.response) return data.data.response;

        return JSON.stringify(data);
      }

      // 2. Demo fallback if API key is not entered
      await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
      const lower = userPrompt.toLowerCase();
      if (lower.includes('feature') || lower.includes('what can you do')) {
        return `✨ **${appName} Key Features:**\n\n- 🚀 **Connected to Python Server Route** (\`${endpoint}\`)\n- 🎨 **8 Premium Themes** (Light, Dark, Cyberpunk, Emerald, Ocean, Sunset, Amethyst, Midnight)\n- ⚡ **Embeddable Web Component & React Wrapper**\n- 📱 **Fully Responsive** & mobile optimized\n- 💬 **Rich Markdown & Code Highlighting**`;
      }
      if (lower.includes('code') || lower.includes('install') || lower.includes('embed')) {
        return `Embed **${appName}** with a single script:\n\n\`\`\`html\n<script src="dist/widget.js"></script>\n\`\`\`\n\nOr in React:\n\`\`\`javascript\nimport { initChatbot } from 'voctrum_chatbot_widget';\n\ninitChatbot({\n  appName: '${appName}',\n  apiKey: 'YOUR_API_KEY',\n  apiUrl: '${endpoint}',\n  theme: '${this.config.theme}'\n});\n\`\`\``;
      }
      return `Hello from **${appName}**! 🚀\n\nI received: "*${userPrompt}*".\n\nTo connect live to your Python server at \`${endpoint}\`, enter your **apiKey** in \`chatbot.config.json\` or widget attributes!`;
    }
  }

  // Register Web Component
  if (!customElements.get('voctrum-chatbot-widget')) {
    customElements.define('voctrum-chatbot-widget', ChatbotWidget);
  }

  // Programmatic Initialization Helper
  function initChatbot(options = {}) {
    if (typeof window === 'undefined') return null;

    if (options) {
      window.__VOCTRUM_CHATBOT_CONFIG__ = {
        ...(window.__VOCTRUM_CHATBOT_CONFIG__ || {}),
        ...options
      };
    }

    let existing = document.querySelector('voctrum-chatbot-widget');
    if (!existing) {
      existing = document.createElement('voctrum-chatbot-widget');
      if (options.appName) existing.setAttribute('app-name', options.appName);
      if (options.description) existing.setAttribute('description', options.description);
      if (options.theme) existing.setAttribute('theme', options.theme);
      if (options.position) existing.setAttribute('position', options.position);
      if (options.apiKey) existing.setAttribute('api-key', options.apiKey);
      if (options.apiUrl) existing.setAttribute('api-url', options.apiUrl);
      if (options.welcomeMessage) existing.setAttribute('welcome-message', options.welcomeMessage);
      document.body.appendChild(existing);
    }
    return existing;
  }

  // Auto-mount on DOMContentLoaded if not already in document
  if (typeof window !== 'undefined') {
    window.initChatbot = initChatbot;
    window.VOCTRUM_THEMES = THEMES;

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => {
        if (!document.querySelector('voctrum-chatbot-widget') && !window.__DISABLE_VOCTRUM_AUTO_MOUNT__) {
          initChatbot();
        }
      });
    } else {
      if (!document.querySelector('voctrum-chatbot-widget') && !window.__DISABLE_VOCTRUM_AUTO_MOUNT__) {
        initChatbot();
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatbotWidget, initChatbot, THEMES };
  }
})(typeof window !== 'undefined' ? window : global);