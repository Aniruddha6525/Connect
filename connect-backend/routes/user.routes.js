import express from 'express';
import { createUser, getUsers, getUserRole } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

// Get user role by ID
router.get('/role', getUserRole);

export default router;