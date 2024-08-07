import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.sebi.mf-app',
  appName: 'mfapp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
