import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useAuthStore } from '../store/useAuthStore';
import {
  fetchPortfolioProjects,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  uploadPortfolioImage,
  uploadPortfolioVideo,
} from '../services/portfolioService';

const PROJECT_TYPES = ['Website', 'AI Ads', 'Branding', 'Graphic Design'];

const defaultForm = {
  projectName: '',
  projectType: 'Website',
  imageUrl: '',
  videoUrl: '',
  description: '',
};

export function AdminPanel() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const results = await fetchPortfolioProjects();
      setProjects(results);
    } catch (error) {
      setStatus('Failed to load projects');
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSelectImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setStatus('Uploading image...');
      const url = await uploadPortfolioImage(file);
      setForm((current) => ({ ...current, imageUrl: url }));
      setStatus('Image uploaded successfully.');
    } catch (error) {
      setStatus(error.message || 'Image upload failed.');
    } finally {
      setIsUploading(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const handleSelectVideo = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setStatus('Uploading video...');
      const url = await uploadPortfolioVideo(file);
      setForm((current) => ({ ...current, videoUrl: url }));
      setStatus('Video uploaded successfully.');
    } catch (error) {
      setStatus(error.message || 'Video upload failed.');
    } finally {
      setIsUploading(false);
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = {
      ...form,
      projectName: form.projectName.trim(),
      imageUrl: form.imageUrl.trim(),
      videoUrl: form.videoUrl.trim(),
      description: form.description.trim(),
    };

    if (!trimmed.projectName || !trimmed.description) {
      setStatus('Project name and description are required.');
      return;
    }

    try {
      setIsUploading(true);
      if (editingId) {
        await updatePortfolioProject(editingId, trimmed);
        setStatus('Project updated successfully.');
      } else {
        await createPortfolioProject(trimmed);
        setStatus('Project added successfully.');
      }

      await loadProjects();
      setForm(defaultForm);
      setEditingId(null);
    } catch (error) {
      setStatus(error.message || 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      projectName: project.project_name,
      projectType: project.project_type,
      imageUrl: project.image_url || '',
      videoUrl: project.video_url || '',
      description: project.description || '',
    });
    setStatus('Editing project...');
  };

  const handleDelete = async (projectId) => {
    try {
      await deletePortfolioProject(projectId);
      await loadProjects();
      setStatus('Project deleted successfully.');
    } catch (error) {
      setStatus(error.message || 'Unable to delete project.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <PageWrapper className="bg-[#f9f7f3]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D57B03]">Private panel</p>
            <h1 className="mt-2 text-4xl font-bold text-[#1a1a1a]">Portfolio Admin</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[#60607A]/20 px-5 py-3 font-medium text-[#1a1a1a] transition hover:border-[#D57B03] hover:text-[#D57B03]"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="rounded-[30px] border border-[#60607A]/10 bg-white p-6 shadow-lg shadow-[#60607A]/5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project name</span>
                <input
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 outline-none transition focus:border-[#D57B03] focus:ring-2 focus:ring-[#D57B03]/20"
                  placeholder="Example: Kibo Brand Launch"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project type</span>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 outline-none transition focus:border-[#D57B03] focus:ring-2 focus:ring-[#D57B03]/20"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  <option value="Custom">Custom</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Category</span>
                <input
                  value={form.projectType}
                  readOnly
                  className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f2f2f2] px-4 py-3 text-[#4a4a52]"
                />
              </label>

              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project image</span>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    disabled={isUploading}
                    className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 file:mr-4 file:rounded-full file:border-0 file:bg-[#D57B03] file:px-4 file:py-2 file:text-white disabled:opacity-60"
                  />
                  {form.imageUrl && (
                    <img src={form.imageUrl} alt="Project preview" className="h-20 w-20 rounded-xl object-cover" />
                  )}
                </div>
              </label>

              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project video</span>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleSelectVideo}
                    disabled={isUploading}
                    className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 file:mr-4 file:rounded-full file:border-0 file:bg-[#D57B03] file:px-4 file:py-2 file:text-white disabled:opacity-60"
                  />
                  {form.videoUrl && (
                    <a
                      href={form.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[#D57B03]/10 px-3 py-2 text-xs font-medium text-[#D57B03] hover:bg-[#D57B03]/20"
                    >
                      Preview Video
                    </a>
                  )}
                </div>
              </label>

              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Image URL (optional, if you already have one)</span>
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 outline-none transition focus:border-[#D57B03] focus:ring-2 focus:ring-[#D57B03]/20"
                  placeholder="https://example.com/image.jpg"
                />
              </label>

              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Video URL (optional, if you already have one)</span>
                <input
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 outline-none transition focus:border-[#D57B03] focus:ring-2 focus:ring-[#D57B03]/20"
                  placeholder="https://example.com/video.mp4"
                />
              </label>

              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full rounded-2xl border border-[#60607A]/20 bg-[#f9f7f3] px-4 py-3 outline-none transition focus:border-[#D57B03] focus:ring-2 focus:ring-[#D57B03]/20"
                  placeholder="Describe the project goal, challenge, and result..."
                />
              </label>
            </div>

            {status && (
              <p className="mt-5 text-sm text-[#2D3748]">{status}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isUploading}
                className="rounded-full bg-gradient-to-r from-[#D57B03] to-[#F08A2D] px-6 py-3 font-bold text-white shadow-lg shadow-[#D57B03]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? 'Uploading...' : editingId ? 'Update Project' : 'Save Project'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(defaultForm);
                    setStatus('Edit cancelled.');
                  }}
                  className="rounded-full border border-[#60607A]/20 px-5 py-3 font-medium text-[#1a1a1a]"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <aside className="rounded-[30px] border border-[#60607A]/10 bg-white p-6 shadow-lg shadow-[#60607A]/5">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Current projects</h2>
            <div className="mt-5 space-y-4">
              {projects.length === 0 ? (
                <p className="text-sm text-[#4a4a52]">No projects added yet.</p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-[#60607A]/10 bg-[#f9f7f3] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-[#1a1a1a]">{project.projectName}</p>
                        <p className="mt-1 text-sm text-[#D57B03]">{project.projectType}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          className="rounded-full border border-[#60607A]/20 px-3 py-1 text-xs font-medium text-[#1a1a1a]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="rounded-full border border-red-200 px-3 py-1 text-xs font-medium text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-[#4a4a52] line-clamp-3">{project.description}</p>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </section>
    </PageWrapper>
  );
}
