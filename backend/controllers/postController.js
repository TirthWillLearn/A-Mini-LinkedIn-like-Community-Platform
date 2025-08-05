
const db = require('../db');

exports.createPost = async (req, res) => {
  const { content } = req.body;
  try {
    await db.execute('INSERT INTO posts (user_id, content) VALUES (?, ?)', [req.user.id, content]);
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT posts.id, posts.content, posts.created_at, users.name FROM posts 
      JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
