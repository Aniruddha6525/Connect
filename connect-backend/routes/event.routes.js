import express from 'express';
import {
  createEvent,
  getAllEvents,
  registerForEvent,
  getEventRegistrations,
  getEventsByHost
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/hosted-by/:hostId', getEventsByHost);
router.post('/:id/register', registerForEvent);
router.get('/:id/registrations', getEventRegistrations);

export default router;
