#!/usr/bin/env node

/**
 * Postinstall Hook for Voctrum Chatbot Widget
 * Launches interactive CLI wizard upon installation in a project.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const targetDir = process.env.INIT_CWD || process.cwd();

// Skip if inside CI, production build, or self-development repo
const isCI = !!(process.env.CI || process.env.CONTINUOUS_INTEGRATION || process.env.NODE_ENV === 'production');
const isSelf = targetDir.endsWith('voctrum_chatbot_widget') || targetDir.includes(path.join('node_modules', 'voctrum_chatbot_widget'));

// Check if chatbot.config.json already exists in consumer project root
const configPath = path.join(targetDir, 'chatbot.config.json');
const configExists = fs.existsSync(configPath);

if (!isCI && !isSelf && !configExists) {
  try {
    const cliPath = path.join(__dirname, 'cli.js');
    // Spawn with stdio: inherit to attach directly to terminal input/output
    spawnSync(process.execPath, [cliPath], {
      stdio: 'inherit',
      cwd: targetDir
    });
  } catch (err) {
    // Non-blocking fallback
  }
}