// api/updateProgress.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id, xp, tokens } = req.body;

    // Update progress user
    // Misalnya menyimpan data di database atau file
    res.status(200).json({
      success: true,
      user: { id, xp, tokens },
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
