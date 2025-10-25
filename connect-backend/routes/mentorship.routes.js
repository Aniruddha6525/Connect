import express from 'express';
import { requestMentorship, getMentorships, getMenteesForMentor } from '../controllers/mentorship.controller.js';

const router = express.Router();

router.get('/', getMentorships);
// Allow both path param and query param forms for mentees lookup:
router.get('/mentees/:mentorId', getMenteesForMentor);
router.get('/mentees', getMenteesForMentor);

router.post('/request', requestMentorship);
router.post('/', requestMentorship);

export default router;