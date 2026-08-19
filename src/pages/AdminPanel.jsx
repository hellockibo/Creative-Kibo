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
  images: [],
  videos: [],
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
  const [dragActiveImages, setDragActiveImages] = useState(false);
  const [dragActiveVideos, setDragActiveVideos] = useState(false);
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
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setStatus(`Uploading ${files.length} image(s)...`);
      
      const uploadedImages = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadPortfolioImage(files[i]);
        uploadedImages.push(url);
      }

      setForm((current) => ({
        ...current,
        images: [...current.images, ...uploadedImages],
      }));
      setStatus(`${files.length} image(s) uploaded successfully.`);
    } catch (error) {
      setStatus(error.message || 'Image upload failed.');
    } finally {
      setIsUploading(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter((_, i) => i !== index),
    }));
    setStatus('Image removed');
  };

  const handleSelectVideo = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setStatus(`Uploading ${files.length} video(s)...`);
      
      const uploadedVideos = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadPortfolioVideo(files[i]);
        uploadedVideos.push(url);
      }

      setForm((current) => ({
        ...current,
        videos: [...current.videos, ...uploadedVideos],
      }));
      setStatus(`${files.length} video(s) uploaded successfully.`);
    } catch (error) {
      setStatus(error.message || 'Video upload failed.');
    } finally {
      setIsUploading(false);
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    }
  };

  const removeVideo = (index) => {
    setForm((current) => ({
      ...current,
      videos: current.videos.filter((_, i) => i !== index),
    }));
    setStatus('Video removed');
  };

  const handleDrag = (e, isImages) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      isImages ? setDragActiveImages(true) : setDragActiveVideos(true);
    } else if (e.type === 'dragleave') {
      isImages ? setDragActiveImages(false) : setDragActiveVideos(false);
    }
  };

  const handleDrop = async (e, isImages) => {
    e.preventDefault();
    e.stopPropagation();
    isImages ? setDragActiveImages(false) : setDragActiveVideos(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (isImages) {
      const input = imageInputRef.current;
      input.files = files;
      await handleSelectImage({ target: input });
    } else {
      const input = videoInputRef.current;
      input.files = files;
      await handleSelectVideo({ target: input });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.projectName.trim() || !form.description.trim()) {
      setStatus('Project name and description are required.');
      return;
    }

    if (form.images.length === 0 && form.videos.length === 0) {
      setStatus('Please upload at least one image or video.');
      return;
    }

    const trimmed = {
      projectName: form.projectName.trim(),
      projectType: form.projectType,
      images: form.images,
      videos: form.videos,
      description: form.description.trim(),
    };

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
      images: project.images || [],
      videos: project.videos || [],
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
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project images (multiple)</span>
                <div
                  onDragEnter={(e) => handleDrag(e, true)}
                  onDragLeave={(e) => handleDrag(e, true)}
                  onDragOver={(e) => handleDrag(e, true)}
                  onDrop={(e) => handleDrop(e, true)}
                  className={`rounded-2xl border-2 border-dashed transition p-6 text-center cursor-pointer ${
                    dragActiveImages
                      ? 'border-[#D57B03] bg-[#D57B03]/5'
                      : 'border-[#60607A]/30 bg-[#f9f7f3] hover:border-[#D57B03]/50 hover:bg-[#D57B03]/2'
                  } ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSelectImage}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <div
                    onClick={() => imageInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    <svg className="mx-auto mb-3 h-8 w-8 text-[#D57B03]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-[#2D3748]">
                      Drag and drop images here or <span className="text-[#D57B03]">click to browse</span>
                    </p>
                    <p className="mt-1 text-xs text-[#60607A]">PNG, JPG, GIF up to 20MB each</p>
                  </div>
                </div>
                {form.images.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-4 text-sm font-semibold text-[#1a1a1a]">Uploaded Images ({form.images.length})</p>
                    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                      {form.images.map((img, idx) => (
                        <div key={idx} className="group relative rounded-xl overflow-hidden border border-[#60607A]/10 bg-[#f9f7f3] shadow-sm hover:shadow-md transition">
                          <img src={img} alt={`Preview ${idx}`} className="h-28 w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white font-bold text-3xl"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </label>

              <label className="md:col-span-2 block">
                <span className="mb-2 block text-sm font-medium text-[#2D3748]">Project videos (multiple)</span>
                <div
                  onDragEnter={(e) => handleDrag(e, false)}
                  onDragLeave={(e) => handleDrag(e, false)}
                  onDragOver={(e) => handleDrag(e, false)}
                  onDrop={(e) => handleDrop(e, false)}
                  className={`rounded-2xl border-2 border-dashed transition p-6 text-center cursor-pointer ${
                    dragActiveVideos
                      ? 'border-[#D57B03] bg-[#D57B03]/5'
                      : 'border-[#60607A]/30 bg-[#f9f7f3] hover:border-[#D57B03]/50 hover:bg-[#D57B03]/2'
                  } ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleSelectVideo}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <div
                    onClick={() => videoInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    <svg className="mx-auto mb-3 h-8 w-8 text-[#D57B03]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-[#2D3748]">
                      Drag and drop videos here or <span className="text-[#D57B03]">click to browse</span>
                    </p>
                    <p className="mt-1 text-xs text-[#60607A]">MP4, WebM, MOV up to 100MB each</p>
                  </div>
                </div>
                {form.videos.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-4 text-sm font-semibold text-[#1a1a1a]">Uploaded Videos ({form.videos.length})</p>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      {form.videos.map((vid, idx) => (
                        <div key={idx} className="group relative rounded-xl overflow-hidden border border-[#60607A]/10 bg-[#2D3748] shadow-sm hover:shadow-md transition">
                          <div className="relative h-40 w-full bg-[#1a1a1a] flex items-center justify-center">
                            <video src={vid} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                              <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVideo(idx)}
                            className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg h-7 w-7 flex items-center justify-center font-bold transition shadow-md"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
            <div className="mt-5 space-y-4 max-h-[600px] overflow-y-auto">
              {projects.length === 0 ? (
                <p className="text-sm text-[#4a4a52]">No projects added yet.</p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="rounded-2xl border border-[#60607A]/10 bg-[#f9f7f3] p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-[#1a1a1a] line-clamp-1">{project.projectName}</p>
                        <p className="mt-1 text-xs font-medium text-[#D57B03] uppercase tracking-wide">{project.projectType}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          className="rounded-lg border border-[#60607A]/20 px-2 py-1 text-xs font-medium text-[#1a1a1a] hover:bg-[#D57B03]/10 hover:border-[#D57B03]/50 transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {(project.images?.length > 0 || project.videos?.length > 0) && (
                      <div className="mb-3">
                        <div className="grid grid-cols-4 gap-2">
                          {project.images?.slice(0, 2).map((img, i) => (
                            <img key={`img-${i}`} src={img} alt="Project" className="h-12 w-12 rounded object-cover border border-[#60607A]/10" />
                          ))}
                          {project.videos?.slice(0, 2).map((_, i) => (
                            <div key={`vid-${i}`} className="h-12 w-12 rounded bg-[#2D3748] flex items-center justify-center border border-[#60607A]/10">
                              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          ))}
                          {(project.images?.length + project.videos?.length > 4) && (
                            <div className="h-12 w-12 rounded bg-[#D57B03]/10 flex items-center justify-center text-xs font-bold text-[#D57B03] border border-[#60607A]/10">
                              +{project.images?.length + project.videos?.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-[#4a4a52] line-clamp-2">{project.description}</p>
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
