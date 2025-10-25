import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  const { author_id, title, content } = req.body;
  if (!author_id || !title || !content) {
    return res.status(400).json({ error: 'Missing forum post data' });
  }

  try {
    const post = await prisma.forumPost.create({
      data: {
        authorId: author_id,
        title,
        content,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    console.error('createPost error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createComment = async (req, res) => {
  const { postId, author_id, content } = req.body;
  if (!postId || !author_id || !content) {
    return res.status(400).json({ error: 'Missing comment data' });
  }
  try {
    const reply = await prisma.forumReply.create({
      data: {
        postId,
        authorId: author_id,
        content,
      },
    });
    res.status(201).json(reply);
  } catch (err) {
    console.error('createComment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.forumPost.findMany({ orderBy: { createdAt: 'desc' } });
    const postIds = posts.map((p) => p.id);
    const replies = postIds.length
      ? await prisma.forumReply.findMany({ where: { postId: { in: postIds } }, orderBy: { createdAt: 'asc' } })
      : [];

    const repliesByPost = replies.reduce((acc, r) => {
      acc[r.postId] = acc[r.postId] || [];
      acc[r.postId].push(r);
      return acc;
    }, {});

    const postsWithReplies = posts.map((p) => ({ ...p, replies: repliesByPost[p.id] || [] }));
    res.json(postsWithReplies);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch forum posts.' });
  }
};

export const replyToPost = async (req, res) => {
  const postId = req.params.postId;
  const { author_id, content } = req.body;
  if (!author_id || !content) {
    return res.status(400).json({ error: 'Missing reply data' });
  }
  try {
    const reply = await prisma.forumReply.create({
      data: {
        postId,
        authorId: author_id,
        content,
      },
    });
    res.status(201).json(reply);
  } catch (err) {
    console.error('replyToPost error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};