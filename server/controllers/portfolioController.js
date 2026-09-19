const crypto = require('crypto');
const supabase = require('../supabase');

const MEDIA_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'kibo-portfolio';

function projectPayload(body) {
  return {
    project_name: String(body.projectName || '').trim(),
    project_type: String(body.projectType || 'Website'),
    images: Array.isArray(body.images) ? body.images : [],
    videos: Array.isArray(body.videos) ? body.videos : [],
    description: String(body.description || '').trim(),
  };
}

function getStoragePath(url) {
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`;
  return typeof url === 'string' && url.includes(marker) ? url.split(marker)[1] : null;
}

async function removeMedia(urls) {
  const paths = urls.map(getStoragePath).filter(Boolean);
  if (!paths.length) return;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove(paths);
  if (error) throw error;
}

async function getProjects(req, res) {
  try {
    const { data, error } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch projects' });
  }
}

async function getProjectBySlug(req, res) {
  try {
    const { data, error } = await supabase.from('portfolio_projects').select('*').eq('project_name', req.params.slug).maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Project not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch project' });
  }
}

async function uploadMedia(req, res) {
  try {
    if (!req.file) return res.status(400).json({ error: 'A media file is required' });
    const extension = (req.file.originalname.split('.').pop() || 'bin').replace(/[^a-z0-9]/gi, '').toLowerCase();
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    res.json({ url: data.publicUrl });
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
    const { data, error } = await supabase.from('portfolio_projects').insert(payload).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Failed to create project:', error);
    res.status(500).json({ error: error.message || 'Failed to create project' });
  }
}

async function updateProject(req, res) {
  try {
    const payload = projectPayload(req.body);
    const { data, error } = await supabase.from('portfolio_projects').update(payload).eq('id', req.params.id).select().maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Project not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update project' });
  }
}

async function deleteProject(req, res) {
  try {
    const { data: project, error: findError } = await supabase.from('portfolio_projects').select('images, videos').eq('id', req.params.id).maybeSingle();
    if (findError) throw findError;
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await removeMedia([...(project.images || []), ...(project.videos || [])]);
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete project and media:', error);
    res.status(500).json({ error: error.message || 'Failed to delete project' });
  }
}

module.exports = { getProjects, getProjectBySlug, uploadMedia, createProject, updateProject, deleteProject };
