import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOXbBly-bXluTsVOkn2tDEaKZpyXN203w",
  authDomain: "zenstudy-app.firebaseapp.com",
  projectId: "zenstudy-app",
  storageBucket: "zenstudy-app.appspot.com",
  messagingSenderId: "562187212311",
  appId: "1:562187212311:web:3f534d5024e566d0faae52",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
