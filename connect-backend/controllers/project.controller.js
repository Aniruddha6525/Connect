import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  const { title, description, tech_stack, student_id } = req.body;

  // Basic validation
  if (!title || !Array.isArray(tech_stack) || !student_id) {
    return res.status(400).json({ error: "Missing or invalid project data." });
  }

    try {
      const project = await prisma.project.create({
        data: {
          title,
          description,
          techStack: tech_stack,
          studentId: student_id,
          createdBy: student_id,
        },
      });
      return res.status(201).json(project);
    } catch (error) {
      console.error('createProject error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};


export const getProjects = async (req, res) => {
  const { student_id } = req.query;

  try {
    const where = student_id ? { studentId: student_id } : {};
    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(projects);
  } catch (error) {
    console.error('getProjects error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
