import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  
  testDir: './tests',
  timeout: 60 * 1000, // 60 segundos
  expect: {
    timeout: 5000, // 5 segundos
  },
 
  reporter: [
    ['list'],
    //['allure-playwright'],
    ['html', { open: 'on-failure' }],
  ],
  workers : 3,
 
  use: {
    //baseURL: 'https://tiendaqa.centyc.com.ar/',
    baseURL : 'https://pushing-it.vercel.app/',
    headless: false,
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'off',

  },
 
  /* Configure projects for major browsers */
  projects: [
      {
        name: 'iPhone 14',
        use: {
          ...devices['iPhone 13 Pro Max'],
          browserName: 'webkit',
        },
      },
      {
        name: 'Safari',
        use: {
          browserName: 'webkit',
        },
      },
      {
        name: 'Edge',
        use: {
          browserName: 'chromium',
          channel: 'msedge',
        },
      },
      {
        name: 'Chrome',
        use: {
          browserName: 'chromium',
          channel: 'chrome',
        },
      },
    ],
});
