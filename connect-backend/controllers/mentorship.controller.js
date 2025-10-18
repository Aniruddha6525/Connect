// TODO: Add database implementation
export const requestMentorship = async (req, res) => {
  const { student_id, expert_id, topic } = req.body;

  if (!student_id || !expert_id || !topic) {
    return res.status(400).json({ error: "Missing mentorship request data" });
  }

  // Placeholder response
  const newMentorship = {
    id: Date.now(),
    student_id,
    expert_id,
    topic,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  res.status(201).json(newMentorship);
};

export const getMentorships = async (req, res) => {
  // Placeholder response - return empty array
  res.status(200).json([]);
};