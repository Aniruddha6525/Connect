import express from 'express';
import { requestMentorship, getMentorships } from '../controllers/mentorship.controller.js';

const router = express.Router();

router.post('/', requestMentorship);
router.get('/', getMentorships);

export default router;