const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET - All blog posts
router.get('/', blogController.getAllBlogs);

// GET - Blog post by ID or slug
router.get('/:id', blogController.getBlogById);

// POST - Create blog post (admin only)
router.post('/', adminMiddleware, blogController.createBlog);

// PUT - Update blog post (admin only)
router.put('/:id', adminMiddleware, blogController.updateBlog);

// DELETE - Delete blog post (admin only)
router.delete('/:id', adminMiddleware, blogController.deleteBlog);

// POST - Add comment (requires auth)
router.post('/:id/comments', authMiddleware, blogController.addComment);

module.exports = router;

