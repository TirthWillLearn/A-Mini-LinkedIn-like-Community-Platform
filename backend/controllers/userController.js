
const db = require('../db');

exports.getUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const [user] = await db.execute('SELECT id, name, email, bio FROM users WHERE id = ?', [userId]);
    const [posts] = await db.execute('SELECT id, content, created_at FROM posts WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json({ user: user[0], posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
