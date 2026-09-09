#!/usr/bin/env node

const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

let chalk = {};
try {
  chalk = require('chalk');
  if (chalk.default) chalk = chalk.default;
} catch (e) {
  chalk = {};
}

// Fallback terminal color formatting
const c = {
  bold: (s) => (chalk.bold ? chalk.bold(s) : `\x1b[1m${s}\x1b[0m`),
  cyan: (s) => (chalk.cyan ? chalk.cyan(s) : `\x1b[36m${s}\x1b[0m`),
  green: (s) => (chalk.green ? chalk.green(s) : `\x1b[32m${s}\x1b[0m`),
  yellow: (s) => (chalk.yellow ? chalk.yellow(s) : `\x1b[33m${s}\x1b[0m`),
  magenta: (s) => (chalk.magenta ? chalk.magenta(s) : `\x1b[35m${s}\x1b[0m`),
  white: (s) => (chalk.white ? chalk.white(s) : `\x1b[37m${s}\x1b[0m`),
  gray: (s) => (chalk.gray ? chalk.gray(s) : `\x1b[90m${s}\x1b[0m`),
  red: (s) => (chalk.red ? chalk.red(s) : `\x1b[31m${s}\x1b[0m`),
  primaryBold: (s) => (chalk.hex ? chalk.hex('#6366f1').bold(s) : `\x1b[1;35m${s}\x1b[0m`),
  primary: (s) => (chalk.hex ? chalk.hex('#6366f1')(s) : `\x1b[35m${s}\x1b[0m`)
};

async function init() {
  console.log(c.primaryBold('\n╔════════════════════════════════════════════════════════════╗'));
  console.log(c.primaryBold('║               🤖 VOCTRUM CHATBOT WIDGET SETUP              ║'));
  console.log(c.primaryBold('╚════════════════════════════════════════════════════════════╝\n'));
  console.log(c.cyan('✨ Connect your website to your Python Chatbot server (https://chat.voctrum.com).\n'));

  // Define the interactive questionnaire
  const questions = [
    {
      type: 'text',
      name: 'appName',
      message: '🏷️  What is your Application / Chatbot name?',
      initial: 'Voctrum AI'
    },
    {
      type: 'text',
      name: 'description',
      message: '📝 Chatbot description / tagline:',
      initial: 'Instant answers & 24/7 intelligent assistance'
    },
    {
      type: 'text',
      name: 'apiKey',
      message: '🔑 Enter your Chatbot API Key:',
      validate: val => (!val ? 'API Key is required to connect to server' : true)
    },
    {
      type: 'text',
      name: 'apiUrl',
      message: '🌐 Backend Server URL:',
      initial: 'https://chat.voctrum.com/chatbot/chat'
    },
    {
      type: 'select',
      name: 'theme',
      message: '🎨 Select your preferred Theme preset:',
      choices: [
        { title: '🌙 Dark (Sleek Obsidian & Graphite)', value: 'dark' },
        { title: '☀️ Light (Crisp Porcelain & Sapphire Blue)', value: 'light' },
        { title: '⚡ Cyberpunk Neon (Vibrant Magenta & Cyan Glow)', value: 'cyberpunk' },
        { title: '🌲 Emerald Forest (Lush Jade & Mint Glass)', value: 'emerald' },
        { title: '🌊 Ocean Breeze (Deep Azure & Marine Aqua)', value: 'ocean' },
        { title: '🌅 Sunset Rose (Warm Amber & Rose Gold)', value: 'sunset' },
        { title: '🔮 Royal Amethyst (Cosmic Violet & Lavender)', value: 'amethyst' },
        { title: '🌌 Midnight Slate (Titanium & Electric Indigo)', value: 'midnight' }
      ],
      initial: 0
    },
    {
      type: 'select',
      name: 'position',
      message: '📍 Widget position on screen:',
      choices: [
        { title: '↘️  Bottom Right (Recommended)', value: 'bottom-right' },
        { title: '↙️  Bottom Left', value: 'bottom-left' },
        { title: '↗️  Top Right', value: 'top-right' },
        { title: '↖️  Top Left', value: 'top-left' }
      ],
      initial: 0
    },
    {
      type: 'text',
      name: 'welcomeMessage',
      message: '👋 Welcome greeting message:',
      initial: 'Hello! How can I help you today?'
    },
    {
      type: 'text',
      name: 'starterPrompts',
      message: '💡 Starter suggestion questions (comma separated):',
      initial: 'What features are available?, How do I get started?, Contact support'
    }
  ];

  // Run prompts
  const answers = await prompts(questions, {
    onCancel: () => {
      console.log(c.yellow('\n⚠️  Setup paused. You can run setup anytime with: npx voctrum-chatbot-widget\n'));
      return true;
    }
  });

  if (!answers.appName || !answers.apiKey) {
    return;
  }

  // Parse comma separated prompts into an array
  const formattedConfig = {
    appName: answers.appName || 'Voctrum AI',
    description: answers.description || 'Instant answers & intelligent support',
    apiKey: answers.apiKey || '',
    apiUrl: answers.apiUrl || 'https://chat.voctrum.com/chatbot/chat',
    theme: answers.theme || 'dark',
    position: answers.position || 'bottom-right',
    welcomeMessage: answers.welcomeMessage || 'Hello! How can I help you today?',
    starterPrompts: (answers.starterPrompts || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  };

  // Determine target directory (root of project installing this package)
  const targetDir = process.env.INIT_CWD || process.cwd();
  const targetConfigPath = path.join(targetDir, 'chatbot.config.json');

  try {
    fs.writeFileSync(targetConfigPath, JSON.stringify(formattedConfig, null, 2), 'utf-8');
    console.log(c.green(c.bold('\n✅ Configuration successfully saved to: ')) + c.white(targetConfigPath));
  } catch (err) {
    console.log(c.red('\n❌ Error writing config file: ') + err.message);
  }

  // Display summary & usage
  console.log('\n' + c.primary('────────────── 🚀 Chatbot Configuration Summary ──────────────'));
  console.log(c.gray(' • App Name:     ') + c.white(c.bold(formattedConfig.appName)));
  console.log(c.gray(' • Description:  ') + c.white(formattedConfig.description));
  console.log(c.gray(' • Server URL:   ') + c.cyan(formattedConfig.apiUrl));
  console.log(c.gray(' • API Key:      ') + c.gray('••••••••••••••••'));
  console.log(c.gray(' • Theme:        ') + c.cyan(formattedConfig.theme));
  console.log(c.gray(' • Position:     ') + c.yellow(formattedConfig.position));
  console.log(c.primary('─────────────────────────────────────────────────────────────\n'));

  console.log(c.bold('📖 How to integrate into your application:\n'));

  console.log(c.yellow(c.bold('Option 1: HTML / Vanilla JS')));
  console.log(c.gray('Add this script before the closing </body> tag:'));
  console.log(c.cyan('  <script src="node_modules/voctrum_chatbot_widget/dist/widget.js"></script>\n'));

  console.log(c.yellow(c.bold('Option 2: React / Next.js / Vue')));
  console.log(c.cyan("  import { initChatbot } from 'voctrum_chatbot_widget';"));
  console.log(c.cyan("  // In your App / layout component:"));
  console.log(c.cyan("  useEffect(() => { initChatbot(); }, []);\n"));

  console.log(c.green('🎉 You are all set! Your chatbot widget will appear in the bottom-right.\n'));
}

if (require.main === module) {
  init();
}

module.exports = { init };