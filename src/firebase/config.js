import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3ylvhS23O33SAj0mqWKdL3wXXmV109Vc",
  authDomain: "fir-e86b6.firebaseapp.com",
  projectId: "fir-e86b6",
  storageBucket: "fir-e86b6.appspot.com",
  messagingSenderId: "1056140016776",
  appId: "1:1056140016776:web:4a3103fc624b3ce3f6f33d",
};

export const app = initializeApp(firebaseConfig);
