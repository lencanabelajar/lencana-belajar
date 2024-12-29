// app.js

document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Mengirimkan data login ke API Vercel
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Login berhasil!");
      document.getElementById('logout-btn').style.display = 'block';
    } else {
      alert("Login gagal: " + data.message);
    }
  })
  .catch(error => alert("Terjadi kesalahan: " + error.message));
});

// Registrasi
document.getElementById('register-btn').addEventListener('click', () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  // Mengirimkan data registrasi ke API Vercel
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Registrasi berhasil!");
    } else {
      alert("Registrasi gagal: " + data.message);
    }
  })
  .catch(error => alert("Terjadi kesalahan: " + error.message));
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  fetch('/api/logout', {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Logout berhasil!");
      document.getElementById('logout-btn').style.display = 'none';
    }
  })
  .catch(error => alert("Error: " + error.message));
});

// Update User Progress (XP & Token)
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
