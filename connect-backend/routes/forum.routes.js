import express from 'express';
import { createPost, createComment, getAllPosts, replyToPost } from '../controllers/forum.controller.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/posts', getAllPosts);

router.post('/posts', createPost);
router.post('/comments', createComment);
router.post('/', createPost);
router.post('/:postId/replies', replyToPost);

export default router;