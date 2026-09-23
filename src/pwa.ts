import { registerSW } from 'virtual:pwa-register';

// Register the PWA service worker with automatic update checks
export function initPWA() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('New HurtBreak version available, updating in background...');
        updateSW(true);
      },
      onOfflineReady() {
        console.log('HurtBreak is ready to work completely offline.');
      },
      onRegisterError(error: unknown) {
        console.warn('PWA service worker registration failed:', error);
      },
    });
  }
}
