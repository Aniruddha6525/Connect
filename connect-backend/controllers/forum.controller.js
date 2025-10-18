// TODO: Add database implementation
export const createPost = async (req, res) => {
  const { author_id, title, content } = req.body;
  if (!author_id || !title || !content) {
    return res.status(400).json({ error: "Missing forum post data" });
  }

  // Placeholder response
  const newPost = {
    id: Date.now(),
    author_id,
    title,
    content,
    created_at: new Date().toISOString()
  };
  
  res.status(201).json(newPost);
};

export const getAllPosts = async (req, res) => {
  // Placeholder response - return empty array
  res.status(200).json([]);
};

export const replyToPost = async (req, res) => {
  const postId = req.params.postId;
  const { author_id, content } = req.body;

  if (!author_id || !content) {
    return res.status(400).json({ error: "Missing reply data" });
  }

  // Placeholder response
  const newReply = {
    id: Date.now(),
    post_id: postId,
    author_id,
    content,
    created_at: new Date().toISOString()
  };
  
  res.status(201).json(newReply);
};