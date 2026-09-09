/**
 * Voctrum Chatbot Widget - Distribution Bundle
 */

const { THEMES } = require('../src/themes.js');
const fs = require('fs');
const path = require('path');

// We can read src/themes.js and src/widget.js and bundle them cleanly
const themesContent = fs.readFileSync(path.join(__dirname, '../src/themes.js'), 'utf-8');
const widgetContent = fs.readFileSync(path.join(__dirname, '../src/widget.js'), 'utf-8');

const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const bundled = `/*! Voctrum Chatbot Widget v1.0.0 */\n${themesContent}\n\n${widgetContent}`;
fs.writeFileSync(path.join(distDir, 'widget.js'), bundled, 'utf-8');
console.log('Dist bundle generated at dist/widget.js');
