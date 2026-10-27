// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  retries: 1,

  timeout: 30 * 1000,

  expect: {
    timeout: 5000
  },

  reporter: 'html',
  
  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11 Pro'],
      }
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        Permissions: ['geolocation'],
        trace: 'on',
        //viewport : {width:720,height:720}
      }
    }
  ]
 
};

module.exports = config;
