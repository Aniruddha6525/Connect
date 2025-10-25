import express from 'express';
import { getAllWebinars, createWebinar } from '../controllers/webinar.controller.js';

const router = express.Router();

router.get('/', getAllWebinars);
router.post('/', createWebinar);

export default router;
