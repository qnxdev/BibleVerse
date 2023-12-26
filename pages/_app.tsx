import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp, getApps } from "firebase/app";
export const initFire = () => {
  const apps = getApps();
  if (!apps.length) {
    const firebaseConfig = {
      apiKey: "AIzaSyD4Dq_yiY2W4X08YGlHRF1ZMRYh_6ee9lo",
      authDomain: "metafire-live.firebaseapp.com",
      projectId: "metafire-live",
      storageBucket: "metafire-live.appspot.com",
      messagingSenderId: "743631423364",
      appId: "1:743631423364:web:a9abe68d7b6709ad6c3fd1",
      measurementId: "G-LJGMH8Y9P5",
    };

    const app = initializeApp(firebaseConfig);

    return app;
  }
};
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
