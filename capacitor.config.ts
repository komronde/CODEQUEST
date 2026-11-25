import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codequest.learning',
  appName: 'CODEQUEST',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
