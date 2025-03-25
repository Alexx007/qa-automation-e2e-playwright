// global.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      APP_USER: string;
      APP_USER_PASSWORD: string;
    }
  }