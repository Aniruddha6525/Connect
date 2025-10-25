import express from 'express';
import {
	createUser,
	getUsers,
	getUserRole,
	getUserDetails,
	updateUser,
	updateUserDetails,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

// Get user role by ID
router.get('/role', getUserRole);

// Get user details by ID
router.get('/details', getUserDetails);

// Update user by ID
router.put('/update', updateUser);
router.put('/update-details', updateUserDetails);

export default router;