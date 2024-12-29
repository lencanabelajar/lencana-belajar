export default function handler(req, res) {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'api', 'users.json');
  const usersData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (req.method === 'GET') {
    // Mengembalikan daftar pengguna
    res.status(200).json(usersData);
  } else if (req.method === 'POST') {
    // Menambahkan XP dan Token (update data)
    const { id, xp, tokens } = req.body;
    const userIndex = usersData.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      usersData[userIndex].xp += xp;
      usersData[userIndex].tokens += tokens;

      fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));
      res.status(200).json({ message: 'Data updated successfully', user: usersData[userIndex] });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
