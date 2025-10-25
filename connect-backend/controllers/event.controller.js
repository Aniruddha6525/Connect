import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isUuid = (v) => typeof v === 'string' && uuidRegex.test(v);

export const createEvent = async (req, res) => {
  // Accept flexible keys from frontend: scheduled_at, scheduledAt, date
  const { title, description } = req.body;
  const scheduled = req.body.scheduled_at || req.body.scheduledAt || req.body.date || null;
  const hostIdentifier = req.body.host_id || req.body.hostId || req.body.host || null;

  if (!hostIdentifier) {
    return res.status(400).json({ message: 'Host identifier is required.' });
  }

  try {
    let hostUser = null;
    if (isUuid(hostIdentifier)) {
      hostUser = await prisma.user.findUnique({ where: { id: hostIdentifier } });
    } else {
      hostUser = await prisma.user.findUnique({ where: { firebaseUid: hostIdentifier } });
    }

    if (!hostUser) {
      return res.status(404).json({ message: 'Host user not found.' });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        scheduledAt: scheduled ? new Date(scheduled) : undefined,
        hostId: hostUser.id,
        createdBy: hostUser.id,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event.' });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        scheduledAt: 'asc',
      },
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

export const registerForEvent = async (req, res) => {
  const event_id = req.params.id;
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    // Create registration in DB if possible
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: event_id,
        userId: user_id,
      },
    });
    res.status(201).json(registration);
  } catch (err) {
    console.error('Error registering for event:', err);
    res.status(500).json({ error: 'Failed to register' });
  }
};

export const getEventRegistrations = async (req, res) => {
  const event_id = req.params.id;
  try {
    const regsRaw = await prisma.eventRegistration.findMany({ where: { eventId: event_id } });
    // attach user info for frontend convenience
    const regs = await Promise.all(
      regsRaw.map(async (r) => {
        let user = null;
        if (r.userId) {
          user = await prisma.user.findUnique({ where: { id: r.userId } });
        }
        return { ...r, user };
      })
    );
    res.status(200).json(regs);
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

export const getEventsByHost = async (req, res) => {
  const { hostId } = req.params; // could be firebaseUid or internal id

  try {
    let host = null;
    if (isUuid(hostId)) {
      host = await prisma.user.findUnique({ where: { id: hostId } });
    } else {
      host = await prisma.user.findUnique({ where: { firebaseUid: hostId } });
    }

    if (!host) {
      return res.status(404).json({ message: 'Host user not found.' });
    }

    const events = await prisma.event.findMany({
      where: { hostId: host.id },
      orderBy: { scheduledAt: 'asc' },
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events by host:', error);
    res.status(500).json({ message: 'Failed to fetch events.' });
  }
};