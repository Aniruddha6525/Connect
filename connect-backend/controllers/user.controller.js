import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { email, full_name, role, firebase_uid } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!full_name || full_name.trim() === '') {
    return res.status(400).json({ error: 'Full name is required' });
  }

  // Validate role if provided
  const validRoles = ['mentee', 'mentor'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Must be one of: mentee, mentor' });
  }

  try {
    // If firebase_uid provided, upsert by firebaseUid to avoid duplicates
    if (firebase_uid) {
      const user = await prisma.user.upsert({
        where: { firebaseUid: firebase_uid },
        update: {
          email,
          fullName: full_name || undefined,
          role: role || undefined,
        },
        create: {
          email,
          fullName: full_name || null,
          role: role || 'mentee',
          firebaseUid: firebase_uid,
        },
      });
      return res.status(200).json(user);
    }

    // If firebase_uid not provided, create normally (fail on duplicate email)
    const user = await prisma.user.create({
      data: {
        email,
        fullName: full_name || null,
        role: role || 'mentee',
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
    const { role } = req.query || {};
    const where = {};
    if (role) where.role = role;
    const users = await prisma.user.findMany({ where });
    return res.json(users);
  } catch (err) {
    console.error('getUsers error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserRole = async (req, res) => {
  try {
    // Accept firebase_uid from query or params
    const firebaseUid = req.query?.id || req.params?.id;

    if (!firebaseUid) {
      return res.status(400).json({ error: 'Firebase UID is required' });
    }

    const user = await prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ role: user.role ?? null });
  } catch (err) {
    console.error('getUserRole error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    // Accept firebase_uid from query or params
    const firebaseUid = req.query?.id || req.params?.id;

    if (!firebaseUid) {
      return res.status(400).json({ error: 'Firebase UID is required' });
    }

    const user = await prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ 
      role: user.role ?? null,
      fullName: user.fullName ?? null,
      email: user.email ?? null,
      bio: user.bio ?? null,
      linkedin: user.linkedin ?? null,
      github: user.github ?? null
    });
  } catch (err) {
    console.error('getUserDetails error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Accept firebase_uid from query or params
    const firebaseUid = req.query?.id || req.params?.id || req.body?.firebaseUid;
    const { full_name, role, bio, linkedin, github } = req.body;

    console.log('updateUser called with:', { firebaseUid, full_name, role, bio, linkedin, github });

    if (!firebaseUid) {
      return res.status(400).json({ error: 'Firebase UID is required' });
    }

    // Validate role if provided
    const validRoles = ['mentee', 'mentor'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be one of: mentee, mentor' });
    }

    // Build update data object
    const updateData = {};
    if (full_name) updateData.fullName = full_name;
    if (role) updateData.role = role;
    if (bio !== undefined) updateData.bio = bio;
    if (linkedin !== undefined) updateData.linkedin = linkedin;
    if (github !== undefined) updateData.github = github;

    console.log('Update data:', updateData);

    const user = await prisma.user.update({
      where: { firebaseUid },
      data: updateData,
    });

    console.log('User updated successfully:', user);
    return res.status(200).json(user);
  } catch (err) {
    console.error('updateUser error:', err);
    console.error('Error details:', {
      code: err.code,
      message: err.message,
      meta: err.meta
    });
    
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(500).json({ 
      error: 'Internal server error',
      details: err.message 
    });
  }
};

export const updateUserDetails = async (req, res) => {
  // Accept either firebaseUid or internal id
  const { uid, firebaseUid, fullName } = req.body;

  if ((!uid && !firebaseUid) || !fullName) {
    return res.status(400).json({ message: 'UID (id or firebaseUid) and full name are required.' });
  }

  try {
    const where = uid ? { id: uid } : { firebaseUid };
    const updatedUser = await prisma.user.update({
      where,
      data: { fullName },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user details.' });
  }
};