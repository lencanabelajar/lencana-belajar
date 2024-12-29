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

async function updateUserProgress(userId, xpEarned, tokensEarned) {
  const payload = {
    id: userId,
    xp: xpEarned,
    tokens: tokensEarned,
  };

  const response = await fetch('/api/users', {
    method: 'POST', // Jenis request
    headers: {
      'Content-Type': 'application/json', // Data dalam format JSON
    },
    body: JSON.stringify(payload), // Kirim data ke server
  });

  const result = await response.json(); // Respons dari server
  if (response.ok) {
    alert(`XP dan token berhasil diperbarui!\nXP: ${result.user.xp}, Tokens: ${result.user.tokens}`);
  } else {
    alert(`Gagal memperbarui data: ${result.message}`);
  }
}

// Contoh penggunaan: Update user dengan ID 1, tambah 50 XP dan 20 token
updateUserProgress(1, 50, 20);
