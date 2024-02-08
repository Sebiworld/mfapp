import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mfapp',
  appName: 'mfapp',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
