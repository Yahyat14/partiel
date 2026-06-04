const Blog = require('../models/Blog');

// Create slug
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    let query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const blogs = await Blog.find(query)
      .populate('author', 'firstName lastName')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blog by ID or slug
exports.getBlogById = async (req, res) => {
  try {
    let blog;

    if (req.params.id.includes('-')) {
      // Slug
      blog = await Blog.findOne({ slug: req.params.id });
    } else {
      // ID
      blog = await Blog.findById(req.params.id);
    }

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    blog = await blog.populate('author', 'firstName lastName');

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create blog post (admin only)
exports.createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, image, category, tags, authorName } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      slug: createSlug(title),
      content,
      excerpt: excerpt || content.substring(0, 150),
      author: req.user.id,
      authorName: authorName || 'Admin',
      image,
      category,
      tags,
      isPublished: true
    });

    await blog.save();

    res.status(201).json({ message: 'Blog post created', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update blog post (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post updated', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete blog post (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { isPublished: false },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add comment (requires auth)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    blog.comments.push({
      userId: req.user.id,
      userName: req.user.email,
      content,
      approved: false
    });

    await blog.save();

    res.json({ message: 'Comment added', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
