import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllWebinars = async (req, res) => {
  try {
    const webinars = await prisma.webinar.findMany({ orderBy: { dateTime: 'asc' } });
    res.json(webinars);
  } catch (err) {
    console.error('getAllWebinars error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createWebinar = async (req, res) => {
  const { title, description, dateTime, speaker, createdBy } = req.body;
  if (!title || !dateTime) return res.status(400).json({ error: 'Missing webinar fields' });
  try {
    const webinar = await prisma.webinar.create({ data: { title, description, dateTime, speaker, createdBy } });
    res.status(201).json(webinar);
  } catch (err) {
    console.error('createWebinar error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default { getAllWebinars, createWebinar };