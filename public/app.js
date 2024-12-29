// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase Konfigurasi
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Login
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login berhasil!");
      document.getElementById('logout-btn').style.display = 'block';
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Registrasi
document.getElementById('register-btn').addEventListener('click', () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Registrasi berhasil!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Logout berhasil!");
      document.getElementById('logout-btn').style.display = 'none';
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
