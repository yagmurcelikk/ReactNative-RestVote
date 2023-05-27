import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD-TpFkfsVscBWHg2jlPdWUIgUciWnVxmo",
  authDomain: "kyodev-17b07.firebaseapp.com",
  projectId: "kyodev-17b07",
  storageBucket: "kyodev-17b07.appspot.com",
  messagingSenderId: "922205395562",
  appId: "1:922205395562:web:6d6b66212736b1f289c813",
  measurementId: "G-E3DJ3TQFQ5"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};