// TODO: Add database implementation
export const createEvent = async (req, res) => {
  const { title, description, scheduled_at, host_id } = req.body;
  if (!title || !description || !scheduled_at || !host_id) {
    return res.status(400).json({ error: 'Missing event data' });
  }

  // Placeholder response
  const newEvent = {
    id: Date.now(),
    title,
    description,
    scheduled_at,
    host_id,
    created_at: new Date().toISOString()
  };
  
  res.status(201).json(newEvent);
};

export const getAllEvents = async (req, res) => {
  // Placeholder response - return empty array
  res.status(200).json([]);
};

export const registerForEvent = async (req, res) => {
  const event_id = req.params.id;
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  // Placeholder response
  const registration = {
    id: Date.now(),
    event_id,
    user_id,
    created_at: new Date().toISOString()
  };
  
  res.status(201).json(registration);
};

export const getEventRegistrations = async (req, res) => {
  const event_id = req.params.id;

  // Placeholder response - return empty array
  res.status(200).json([]);
};
