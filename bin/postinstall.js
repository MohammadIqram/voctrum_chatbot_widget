#!/usr/bin/env node

/**
 * Postinstall Hook for Voctrum Chatbot Widget
 * Runs interactive configuration when installed in a consumer project.
 */

const { isInteractive } = {
  isInteractive: process.stdout.isTTY && !process.env.CI && !process.env.CONTINUOUS_INTEGRATION
};

// Check if being installed into a consuming application
const isConsumingProject = process.env.INIT_CWD &&
  !process.env.INIT_CWD.endsWith('voctrum_chatbot_widget') &&
  !process.env.INIT_CWD.includes('node_modules');

if (isInteractive && (isConsumingProject || process.env.RUN_CHATBOT_SETUP === 'true')) {
  try {
    const { init } = require('./cli.js');
    init().catch(() => {
      // Gracefully continue on any error
    });
  } catch (err) {
    // Non-blocking fallback
  }
} else {
  // Silent fallback for CI/CD or development installs
}