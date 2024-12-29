// api/users.js

let users = [
  { id: 1, email: "user@example.com", xp: 0, tokens: 0 }
];

// Fungsi untuk mendapatkan data pengguna
export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { id, xp, tokens } = req.body;

    // Cari user berdasarkan ID
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update data XP dan tokens
    users[userIndex].xp += xp;
    users[userIndex].tokens += tokens;

    return res.status(200).json({ user: users[userIndex] });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
