import express from 'express';
import Post from '../models/Post.js';
const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// POST new post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: 'Invalid post data' });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;

