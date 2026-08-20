const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db');
const { uploadBuffer, deleteAssetUrl } = require('../cloudinary');

function toProject(document) {
  if (!document) return null;
  const { _id, ...project } = document;
  return { ...project, id: _id.toString() };
}

function projectPayload(body) {
  return {
    project_name: String(body.projectName || '').trim(),
    project_type: String(body.projectType || 'Website'),
    images: Array.isArray(body.images) ? body.images : [],
    videos: Array.isArray(body.videos) ? body.videos : [],
    description: String(body.description || '').trim(),
  };
}

async function getProjects(req, res) {
  try {
    const database = await getDatabase();
    const projects = await database.collection('portfolio_projects').find({}).sort({ created_at: -1 }).toArray();
    res.json(projects.map(toProject));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch projects' });
  }
}

async function getProjectBySlug(req, res) {
  try {
    const database = await getDatabase();
    const project = await database.collection('portfolio_projects').findOne({ project_name: req.params.slug });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(toProject(project));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch project' });
  }
}

async function uploadMedia(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'A media file is required' });
    const url = await uploadBuffer(req.file);
    res.json({ url });
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    res.status(500).json({ error: error.message || 'Media upload failed' });
  }
}

async function createProject(req, res) {
  try {
    const payload = projectPayload(req.body);
    if (!payload.project_name || !payload.description) {
      return res.status(400).json({ error: 'Project name and description are required' });
    }
    const now = new Date();
    const document = { ...payload, created_at: now, updated_at: now };
    const database = await getDatabase();
    const result = await database.collection('portfolio_projects').insertOne(document);
    res.status(201).json(toProject({ ...document, _id: result.insertedId }));
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ error: error.message || 'Failed to create project' });
  }
}

async function updateProject(req, res) {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid project id' });
    const payload = projectPayload(req.body);
    const database = await getDatabase();
    const result = await database.collection('portfolio_projects').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...payload, updated_at: new Date() } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Project not found' });
    res.json(toProject(result));
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update project' });
  }
}

async function deleteProject(req, res) {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid project id' });
    const database = await getDatabase();
    const collection = database.collection('portfolio_projects');
    const project = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const mediaUrls = [...(project.images || []), ...(project.videos || [])]
      .filter((url) => typeof url === 'string' && url.includes('res.cloudinary.com'));

    await Promise.all(mediaUrls.map((url) => deleteAssetUrl(url)));
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (!result.deletedCount) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project and media:', error);
    res.status(500).json({ error: error.message || 'Failed to delete project' });
  }
}

module.exports = { getProjects, getProjectBySlug, uploadMedia, createProject, updateProject, deleteProject };
