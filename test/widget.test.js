const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { THEMES, initChatbot, Chatbot, ChatbotWidget } = require('../index.js');

console.log('🧪 Starting Automated Unit & Integration Tests for Voctrum Chatbot Widget...\n');

// 1. Verify 8 Themes
console.log('Test 1: Verifying 8 theme presets...');
const expectedThemes = ['dark', 'light', 'cyberpunk', 'emerald', 'ocean', 'sunset', 'amethyst', 'midnight'];
assert.strictEqual(Object.keys(THEMES).length, 8, 'Must have exactly 8 theme presets');
expectedThemes.forEach(t => {
  assert.ok(THEMES[t], `Theme ${t} must exist`);
  assert.ok(THEMES[t].colors.primary, `Theme ${t} must define primary color`);
  assert.ok(THEMES[t].colors.background, `Theme ${t} must define background`);
  assert.ok(THEMES[t].colors.surface, `Theme ${t} must define surface`);
});
console.log('  ✅ All 8 theme definitions verified successfully.');

// 2. Verify Dist Bundle & Component Exports
console.log('\nTest 2: Verifying dist/widget.js bundle & exports...');
const distPath = path.join(__dirname, '../dist/widget.js');
assert.ok(fs.existsSync(distPath), 'dist/widget.js must exist');
const distContent = fs.readFileSync(distPath, 'utf-8');
assert.ok(distContent.includes('voctrum-chatbot-widget'), 'Bundle must contain custom element registration');
assert.ok(distContent.includes('THEMES'), 'Bundle must contain theme definitions');
assert.ok(distContent.includes('https://chat.voctrum.com/chatbot/chat'), 'Bundle must default to Voctrum Python server URL');

assert.strictEqual(typeof Chatbot, 'function', 'Chatbot component export must be a function');
assert.strictEqual(typeof initChatbot, 'function', 'initChatbot export must be a function');
console.log('  ✅ Distribution bundle and React component exports verified successfully.');

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🚀\n');
