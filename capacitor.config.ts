import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.icaonline.citrusmrl',
  appName: 'Citrus MRL',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3880ff',
      showSpinner: false,
      launchAutoHide: true
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#3880ff'
    }
  }
};

export default config;
