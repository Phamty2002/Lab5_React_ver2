import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDt2eJ3BYj4jsyC56jbOIj5WfeULnejA-k",
  authDomain: "lab5ver2react.firebaseapp.com",
  projectId: "lab5ver2react",
  storageBucket: "lab5ver2react.appspot.com",
  messagingSenderId: "1040752326469",
  appId: "1:1040752326469:web:e8ed4b6984476dcd27302c",
  measurementId: "G-YCENNWRX2Y"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { auth, app };
