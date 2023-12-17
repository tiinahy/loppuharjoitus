import { initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';



export const firebaseConfig = {
    apiKey: "AIzaSyBv318FfVhxRVxKgHGhgw3TlLOTm6IWYFs",
    authDomain: "pilvi-vite-2.firebaseapp.com",
    projectId: "pilvi-vite-2",
    storageBucket: "pilvi-vite-2.appspot.com",
    messagingSenderId: "41823120209",
    appId: "1:41823120209:web:a155cdae3c9343d483c170",
  };

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  export { firestore };