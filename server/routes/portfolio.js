const express = require('express');
const { 
  getProjects, 
  getProjectBySlug, 
  uploadMedia,
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/portfolioController');
const { upload } = require('../utils/upload');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin protected routes
router.post('/media', upload.single('file'), uploadMedia);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
