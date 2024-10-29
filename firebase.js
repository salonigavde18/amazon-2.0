import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAAbnhGvEF85TcLZOsGf5xQOoXVQ6iOmoU",
  authDomain: "amzon-2-8e1d1.firebaseapp.com",
  projectId: "amzon-2-8e1d1",
  storageBucket: "amzon-2-8e1d1.appspot.com",
  messagingSenderId: "993852900594",
  appId: "1:993852900594:web:b7325b97187cd918cefc6b",
  measurementId: "G-Q3K9P9H0H2",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export default db;
