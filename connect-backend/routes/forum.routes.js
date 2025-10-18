import express from 'express';
import { createPost, getAllPosts, replyToPost } from '../controllers/forum.controller.js';

const router = express.Router();

router.post('/', createPost);         // ✅ Handles POST /api/forums
router.get('/', getAllPosts);
router.post('/:postId/replies', replyToPost);

export default router;