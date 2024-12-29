let users = [
  { id: 1, email: "user@example.com", xp: 0, tokens: 0, completedTasks: 0, badges: [] }
];

// Fungsi untuk memberikan lencana setelah mencapai milestone tertentu
function checkForBadge(user) {
  // Misalnya, beri lencana setelah mencapai 100 XP
  if (user.xp >= 100 && !user.badges.includes("XP Master")) {
    user.badges.push("XP Master");
  }

  // Misalnya, beri lencana setelah menyelesaikan 5 tugas
  if (user.completedTasks >= 5 && !user.badges.includes("Task Master")) {
    user.badges.push("Task Master");
  }
}

// Fungsi untuk mengeluarkan sertifikat setelah mendapatkan lencana tertentu
function issueCertificate(user) {
  if (user.badges.includes("XP Master") && user.badges.includes("Task Master")) {
    return { certificate: "Sertifikat Lencana Belajar" };
  }
  return { certificate: null };
}

// Fungsi untuk mendapatkan data pengguna
export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { id, xp, tokens, taskCompleted } = req.body;

    // Cari user berdasarkan ID
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update data XP dan tokens
    const user = users[userIndex];
    user.xp += xp;
    user.tokens += tokens;

    // Tambahkan tugas yang diselesaikan
    if (taskCompleted) {
      user.completedTasks++;
    }

    // Cek lencana setelah update XP dan tugas
    checkForBadge(user);

    // Cek sertifikat
    const certificate = issueCertificate(user);
    if (certificate.certificate) {
      return res.status(200).json({
        message: `Sertifikat berhasil dikeluarkan: ${certificate.certificate}`,
        user
      });
    }

    // Kembalikan data pengguna setelah diperbarui
    return res.status(200).json({ user });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
