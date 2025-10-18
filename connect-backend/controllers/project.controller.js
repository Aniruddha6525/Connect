// TODO: Add Prisma client when database schema is ready
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  const { title, description, tech_stack, student_id } = req.body;

  // Basic validation
  if (!title || !Array.isArray(tech_stack) || !student_id) {
    return res.status(400).json({ error: "Missing or invalid project data." });
  }

  const data = await prisma.projects
    .from('projects')
    .insert([{ title, description, tech_stack, student_id }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};


export const getProjects = async (req, res) => {
  const { student_id } = req.query;

  let query = prisma.projects
    .from('projects')
    .select(`
      id,
      title,
      description,
      tech_stack,
      created_at,
      student:users (id, full_name, email)
    `)
    .order('created_at', { ascending: false });

  if (student_id) {
    query = query.eq('student_id', student_id);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
};
