// api/register.js
let users = [
  { email: 'user@example.com', password: 'password123' },
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // Cek jika email sudah terdaftar
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
    }

    // Simpan pengguna baru
    users.push({ email, password });
    res.status(200).json({ success: true, message: 'Registrasi berhasil!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
