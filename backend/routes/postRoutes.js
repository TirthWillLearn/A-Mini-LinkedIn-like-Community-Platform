
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);

module.exports = router;
