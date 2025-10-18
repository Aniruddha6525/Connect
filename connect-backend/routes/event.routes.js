import express from 'express';
import {
  createEvent,
  getAllEvents,
  registerForEvent,
  getEventRegistrations
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.post('/:id/register', registerForEvent);
router.get('/:id/registrations', getEventRegistrations);

export default router;
