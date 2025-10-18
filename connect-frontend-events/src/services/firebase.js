import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD0iwHDsU4Ch9zEajE0CXCB2EIEK9AVNv0",
  authDomain: "connect-platform-78400.firebaseapp.com",
  projectId: "connect-platform-78400",
  storageBucket: "connect-platform-78400.firebasestorage.app",
  messagingSenderId: "228015304384",
  appId: "1:228015304384:web:ed848294f7b4f36c354725"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);