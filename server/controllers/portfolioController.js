const prisma = require('../prismaClient');

const getProjects = async (req, res) => {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { displayOrder: 'asc' },
      include: { category: true, subcategory: true }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const project = await prisma.portfolioProject.findUnique({
      where: { slug: req.params.slug },
      include: { category: true, subcategory: true }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await prisma.portfolioProject.create({
      data: req.body
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await prisma.portfolioProject.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    await prisma.portfolioProject.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
