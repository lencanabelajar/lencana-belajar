// api/login.js
let users = [
  { email: 'user@example.com', password: 'password123' },
  // Tambahkan lebih banyak pengguna di sini
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Email atau password salah' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
