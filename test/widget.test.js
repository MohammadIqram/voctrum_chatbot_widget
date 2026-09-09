const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { THEMES } = require('../src/themes.js');
const prompts = require('prompts');

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

// 2. Verify Dist Bundle
console.log('\nTest 2: Verifying dist/widget.js bundle...');
const distPath = path.join(__dirname, '../dist/widget.js');
assert.ok(fs.existsSync(distPath), 'dist/widget.js must exist');
const distContent = fs.readFileSync(distPath, 'utf-8');
assert.ok(distContent.includes('voctrum-chatbot-widget'), 'Bundle must contain custom element registration');
assert.ok(distContent.includes('THEMES'), 'Bundle must contain theme definitions');
assert.ok(distContent.includes('https://chat.voctrum.com/chatbot/chat'), 'Bundle must default to Voctrum Python server URL');
console.log('  ✅ Distribution bundle verified successfully.');

// 3. Verify CLI Wizard
console.log('\nTest 3: Verifying CLI Setup Wizard prompt generation...');
prompts.inject([
  'Voctrum Assistant',
  'Automated Support',
  'test_voctrum_api_key_123',
  'https://chat.voctrum.com/chatbot/chat',
  'cyberpunk',
  'bottom-right',
  'Hello! How can I help you?',
  'Features, Contact Support'
]);

const { init } = require('../bin/cli.js');
init().then(() => {
  const configPath = path.join(__dirname, '../chatbot.config.json');
  assert.ok(fs.existsSync(configPath), 'chatbot.config.json must be created');
  const cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  assert.strictEqual(cfg.appName, 'Voctrum Assistant');
  assert.strictEqual(cfg.apiKey, 'test_voctrum_api_key_123');
  assert.strictEqual(cfg.apiUrl, 'https://chat.voctrum.com/chatbot/chat');
  assert.strictEqual(cfg.theme, 'cyberpunk');
  assert.strictEqual(cfg.position, 'bottom-right');
  console.log('  ✅ CLI wizard prompt execution & config generation passed.');

  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🚀\n');
}).catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
