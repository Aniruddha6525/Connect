import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.resolve(process.cwd(), 'data.json');
  if (!fs.existsSync(dataPath)) {
    console.error('data.json not found at', dataPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(raw);

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUuid = (v) => typeof v === 'string' && uuidRegex.test(v);
  const normalizeUuid = (v) => (isUuid(v) ? v : null);

  // Helper to ensure a user exists for a given firebaseUid placeholder (like 'user-uuid-01').
  // If the passed value is already a UUID, assume it's a DB id and return it.
  const ensureUserForFirebaseUid = async (maybeUid) => {
    if (!maybeUid) return null;
    if (isUuid(maybeUid)) return maybeUid;
    // look up by firebaseUid
    const existing = await prisma.user.findUnique({ where: { firebaseUid: maybeUid } });
    if (existing) return existing.id;
    const created = await prisma.user.create({ data: { firebaseUid: maybeUid, email: `${maybeUid}@example.local`, fullName: maybeUid, role: 'student' } });
    return created.id;
  };

  // Maps to store generated ids for records whose input ids are non-UUIDs
  const projectsMap = new Map();
  const eventsMap = new Map();
  const webinarsMap = new Map();
  const forumPostsMap = new Map();

  // Insert projects
  if (Array.isArray(data.projects)) {
    for (const p of data.projects) {
      try {
        const studentDbId = await ensureUserForFirebaseUid(p.studentId);
        const createdByDbId = await ensureUserForFirebaseUid(p.createdBy);
        const menteeDbId = await ensureUserForFirebaseUid(p.menteeId);

        const createData = {
          title: p.title,
          description: p.description || null,
          techStack: Array.isArray(p.techStack) ? p.techStack : [],
          studentId: studentDbId,
          createdAt: p.createdAt ? new Date(p.createdAt) : undefined,
          createdBy: createdByDbId,
          menteeId: menteeDbId,
        };

        if (isUuid(p.id)) {
          await prisma.project.upsert({
            where: { id: p.id },
            update: {},
            create: { id: p.id, ...createData },
          });
          projectsMap.set(p.id, p.id);
        } else {
          const created = await prisma.project.create({ data: createData });
          projectsMap.set(p.id, created.id);
        }
      } catch (err) {
        console.error('Failed to upsert/create project', p.id, err.message || err);
      }
    }
  }

  // Insert mentorships
  if (Array.isArray(data.mentorships)) {
    for (const m of data.mentorships) {
      try {
        const studentDbId = await ensureUserForFirebaseUid(m.studentId);
        const expertDbId = await ensureUserForFirebaseUid(m.expertId);
        const menteeDbId = await ensureUserForFirebaseUid(m.menteeId);

        const createData = {
          studentId: studentDbId,
          expertId: expertDbId,
          topic: m.topic || '',
          status: m.status || 'pending',
          createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
          menteeId: menteeDbId,
        };

        if (isUuid(m.mentorId)) {
          await prisma.mentorship.upsert({
            where: { mentorId: m.mentorId },
            update: {},
            create: { mentorId: m.mentorId, ...createData },
          });
        } else {
          const created = await prisma.mentorship.create({ data: createData });
          // mentorId is primary key; if original mentorId is non-UUID we cannot set it, so store mapping
          // but mentorship model uses mentorId as PK; skipping mapping for mentorId non-UUID.
        }
      } catch (err) {
        console.error('Failed to upsert/create mentorship', m.mentorId, err.message || err);
      }
    }
  }

  // Insert events
  if (Array.isArray(data.events)) {
    for (const e of data.events) {
      try {
        const hostDbId = await ensureUserForFirebaseUid(e.hostId);
        const createdByDbId = await ensureUserForFirebaseUid(e.createdBy);

        const createData = {
          title: e.title,
          description: e.description || null,
          scheduledAt: e.scheduledAt ? new Date(e.scheduledAt) : undefined,
          hostId: hostDbId,
          createdAt: e.createdAt ? new Date(e.createdAt) : undefined,
          createdBy: createdByDbId,
        };

        if (isUuid(e.id)) {
          await prisma.event.upsert({
            where: { id: e.id },
            update: {},
            create: { id: e.id, ...createData },
          });
          eventsMap.set(e.id, e.id);
        } else {
          const created = await prisma.event.create({ data: createData });
          eventsMap.set(e.id, created.id);
        }
      } catch (err) {
        console.error('Failed to upsert/create event', e.id, err.message || err);
      }
    }
  }

  // Insert event registrations
  if (Array.isArray(data.eventRegistrations)) {
    for (const r of data.eventRegistrations) {
      try {
        const eventDbId = isUuid(r.eventId) ? r.eventId : eventsMap.get(r.eventId) || null;
        const userDbId = await ensureUserForFirebaseUid(r.userId);
        const menteeDbId = await ensureUserForFirebaseUid(r.menteeId);

        const createData = {
          eventId: eventDbId,
          userId: userDbId,
          createdAt: r.createdAt ? new Date(r.createdAt) : undefined,
          menteeId: menteeDbId,
        };

        if (isUuid(r.id)) {
          await prisma.eventRegistration.upsert({
            where: { id: r.id },
            update: {},
            create: { id: r.id, ...createData },
          });
        } else {
          await prisma.eventRegistration.create({ data: createData });
        }
      } catch (err) {
        console.error('Failed to upsert/create eventRegistration', r.id, err.message || err);
      }
    }
  }

  // Insert webinars
  if (Array.isArray(data.webinars)) {
    for (const w of data.webinars) {
      try {
        const createdByDbId = await ensureUserForFirebaseUid(w.createdBy);
        const createData = {
          title: w.title,
          description: w.description || null,
          dateTime: w.dateTime ? new Date(w.dateTime) : undefined,
          speaker: w.speaker || null,
          createdBy: createdByDbId,
          createdAt: w.createdAt ? new Date(w.createdAt) : undefined,
        };

        if (isUuid(w.id)) {
          await prisma.webinar.upsert({
            where: { id: w.id },
            update: {},
            create: { id: w.id, ...createData },
          });
          webinarsMap.set(w.id, w.id);
        } else {
          const created = await prisma.webinar.create({ data: createData });
          webinarsMap.set(w.id, created.id);
        }
      } catch (err) {
        console.error('Failed to upsert/create webinar', w.id, err.message || err);
      }
    }
  }

  // Insert webinar registrations
  if (Array.isArray(data.webinarRegistrations)) {
    for (const wr of data.webinarRegistrations) {
      try {
        const webinarDbId = isUuid(wr.webinarId) ? wr.webinarId : webinarsMap.get(wr.webinarId) || null;
        const userDbId = await ensureUserForFirebaseUid(wr.userId);
        const createData = {
          webinarId: webinarDbId,
          userId: userDbId,
          registeredAt: wr.registeredAt ? new Date(wr.registeredAt) : undefined,
        };

        if (isUuid(wr.id)) {
          await prisma.webinarRegistration.upsert({
            where: { id: wr.id },
            update: {},
            create: { id: wr.id, ...createData },
          });
        } else {
          await prisma.webinarRegistration.create({ data: createData });
        }
      } catch (err) {
        console.error('Failed to upsert/create webinarRegistration', wr.id, err.message || err);
      }
    }
  }

  // Insert forum posts
  if (Array.isArray(data.forumPosts)) {
    for (const fp of data.forumPosts) {
      try {
        const authorDbId = await ensureUserForFirebaseUid(fp.authorId);
        const createData = {
          authorId: authorDbId,
          title: fp.title || null,
          content: fp.content || null,
          createdAt: fp.createdAt ? new Date(fp.createdAt) : undefined,
        };

        if (isUuid(fp.id)) {
          await prisma.forumPost.upsert({
            where: { id: fp.id },
            update: {},
            create: { id: fp.id, ...createData },
          });
          forumPostsMap.set(fp.id, fp.id);
        } else {
          const created = await prisma.forumPost.create({ data: createData });
          forumPostsMap.set(fp.id, created.id);
        }
      } catch (err) {
        console.error('Failed to upsert/create forumPost', fp.id, err.message || err);
      }
    }
  }

  // Insert forum replies
  if (Array.isArray(data.forumReplies)) {
    for (const fr of data.forumReplies) {
      try {
        const postDbId = isUuid(fr.postId) ? fr.postId : forumPostsMap.get(fr.postId) || null;
        const authorDbId = await ensureUserForFirebaseUid(fr.authorId);
        const createData = {
          postId: postDbId,
          authorId: authorDbId,
          content: fr.content || null,
          createdAt: fr.createdAt ? new Date(fr.createdAt) : undefined,
        };

        if (isUuid(fr.id)) {
          await prisma.forumReply.upsert({
            where: { id: fr.id },
            update: {},
            create: { id: fr.id, ...createData },
          });
        } else {
          await prisma.forumReply.create({ data: createData });
        }
      } catch (err) {
        console.error('Failed to upsert/create forumReply', fr.id, err.message || err);
      }
    }
  }

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
