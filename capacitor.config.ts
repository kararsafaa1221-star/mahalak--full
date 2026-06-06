import type { CapacitorConfig } from '@capacitor/cli';

// ==========================================
// إعدادات تحويل تطبيق محلك لتطبيق Android
// ==========================================
const config: CapacitorConfig = {
  appId: 'com.mahalak.app',
  appName: 'محلك',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined
    }
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    SplashScreen: {
      launchShowDuration: 1500,
<<<<<<< HEAD
      backgroundColor: '#0B1320',
=======
      backgroundColor: '#6B21A8',
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;