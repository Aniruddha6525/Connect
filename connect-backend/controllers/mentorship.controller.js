import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const requestMentorship = async (req, res) => {
  // Accept either mentorId/menteeId or mentorFirebaseUid/menteeFirebaseUid
  const { mentorId, menteeId, mentorFirebaseUid, menteeFirebaseUid, topic } = req.body;

  if (!topic || (!mentorId && !mentorFirebaseUid) || (!menteeId && !menteeFirebaseUid)) {
    return res.status(400).json({ error: 'Missing mentorship request data' });
  }

  try {
    // Resolve mentor/internal ids if firebase UIDs were provided
    let resolvedMentorId = mentorId;
    let resolvedMenteeId = menteeId;

    if (mentorFirebaseUid && !resolvedMentorId) {
      const mentor = await prisma.user.findUnique({ where: { firebaseUid: mentorFirebaseUid } });
      if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
      resolvedMentorId = mentor.id;
    }
    if (menteeFirebaseUid && !resolvedMenteeId) {
      const mentee = await prisma.user.findUnique({ where: { firebaseUid: menteeFirebaseUid } });
      if (!mentee) return res.status(404).json({ error: 'Mentee not found' });
      resolvedMenteeId = mentee.id;
    }

    const mentorship = await prisma.mentorship.create({
      data: {
        mentorId: resolvedMentorId,
        menteeId: resolvedMenteeId,
        topic: topic || null,
        status: 'pending',
      },
    });
    return res.status(201).json(mentorship);
  } catch (err) {
    console.error('requestMentorship error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMentorships = async (req, res) => {
  try {
    const mentorships = await prisma.mentorship.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(mentorships);
  } catch (err) {
    console.error('getMentorships error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMenteesForMentor = async (req, res) => {
  const mentorId = req.params?.mentorId || req.query?.id;
  if (!mentorId) return res.status(400).json({ error: 'mentorId parameter or id query is required' });

  try {
    // mentorId path param can be either internal id or firebaseUid
    console.log('getMenteesForMentor called with mentorId=', mentorId);

    // Try to find by firebaseUid first (common when frontend passes firebase UID)
    let mentor = null;
    try {
      mentor = await prisma.user.findUnique({ where: { firebaseUid: mentorId } });
    } catch (innerErr) {
      console.warn('find by firebaseUid failed:', innerErr && innerErr.message);
      // continue to try by id below
    }

    // If not found by firebaseUid, and the param looks like a uuid, try by id
    if (!mentor && isUuid(mentorId)) {
      try {
        mentor = await prisma.user.findUnique({ where: { id: mentorId } });
      } catch (innerErr) {
        console.warn('find by id failed:', innerErr && innerErr.message);
      }
    }

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const mentorships = await prisma.mentorship.findMany({ where: { mentorId: mentor.id } });
    const menteeIds = mentorships.map((m) => m.menteeId).filter(Boolean);
    if (menteeIds.length === 0) return res.json([]);

    const mentees = await prisma.user.findMany({ where: { id: { in: menteeIds } } });
    return res.json(mentees);
  } catch (err) {
    console.error('getMenteesForMentor error:', err && (err.stack || err.message || err));
    // Include error message in response to aid frontend debugging (strip or remove in production)
    return res.status(500).json({ error: 'Internal server error', details: (err && err.message) || String(err) });
  }
};

// Helper to detect uuid format
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isUuid(v) {
  return typeof v === 'string' && uuidRegex.test(v);
}