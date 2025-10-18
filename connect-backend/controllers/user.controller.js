import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { email, full_name, role, firebase_uid } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        fullName: full_name || null,
        role: role || null,
        firebaseUid: firebase_uid || null,
      },
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error('createUser error:', err);
    // Handle unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'User with this email or firebase_uid already exists' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (err) {
    console.error('getUsers error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserRole = async (req, res) => {
  try {
    // Accept id from query or params
    const id = req.query?.id || req.params?.id;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ role: user.role ?? null });
  } catch (err) {
    console.error('getUserRole error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};