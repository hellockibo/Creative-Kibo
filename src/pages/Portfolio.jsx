import { useEffect, useMemo, useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Minus, Play, Plus, X } from 'lucide-react';
import { fetchPortfolioProjects } from '../services/portfolioService';

export function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mediaZoom, setMediaZoom] = useState(1);

  useEffect(() => {
    const loadProjects = async () => {
      const results = await fetchPortfolioProjects();
      setProjects(results);
    };

    loadProjects();
  }, []);

  const featuredProject = useMemo(() => projects[0], [projects]);

  const openProject = (project) => {
    setSelectedProject(project);
    setActiveMediaIndex(0);
    setMediaZoom(1);
  };

  const getMedia = (project) => [
    ...(project.images || []).map((src) => ({ type: 'image', src })),
    ...(project.videos || []).map((src) => ({ type: 'video', src })),
  ];

  const selectedMedia = selectedProject ? getMedia(selectedProject) : [];

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null);
      if (event.key === 'ArrowLeft') setActiveMediaIndex((current) => (current - 1 + selectedMedia.length) % selectedMedia.length);
      if (event.key === 'ArrowRight') setActiveMediaIndex((current) => (current + 1) % selectedMedia.length);
      if (event.key === '+' || event.key === '=') setMediaZoom((current) => Math.min(2, current + 0.25));
      if (event.key === '-') setMediaZoom((current) => Math.max(1, current - 0.25));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject, selectedMedia.length]);

  return (
    <PageWrapper>
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-6 text-5xl font-bold tracking-tighter text-kibo-blue md:text-7xl">
              Our Work
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-kibo-blue/70 md:text-2xl">
              A curated collection of projects built for brands, campaigns, and digital experiences.
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="aspect-video w-full rounded-[32px] border border-kibo-cream/50 bg-kibo-cream/30"
            >
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <h2 className="text-3xl font-bold uppercase tracking-[0.2em] text-kibo-blue/40 md:text-5xl">
                  Coming Soon
                </h2>
                <p className="mt-4 max-w-xl text-base text-kibo-blue/70 md:text-lg">
                  New portfolio work will appear here once it has been added from the admin panel.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-10">
              {featuredProject && (
                <motion.article
                  onClick={() => openProject(featuredProject)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-[32px] border border-[#60607A]/10 bg-white shadow-lg shadow-[#60607A]/5"
                >
                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="min-h-[280px] bg-[#f3efe9]">
                      {featuredProject.images && featuredProject.images.length > 0 ? (
                        <img src={featuredProject.images[0]} alt={featuredProject.project_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-lg font-medium text-[#60607A]">
                          No images
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-10">
                      <span className="mb-3 inline-flex w-fit rounded-full bg-[#D57B03]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D57B03]">
                        {featuredProject.project_type}
                      </span>
                      <h2 className="text-3xl font-bold text-[#1a1a1a] md:text-4xl">{featuredProject.project_name}</h2>
                      <p className="mt-4 text-base leading-relaxed text-[#4a4a52]">{featuredProject.description}</p>
                      <button type="button" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D57B03]">
                        Open project <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              )}

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.slice(1).map((project) => (
                  <motion.article
                    key={project.id}
                    onClick={() => openProject(project)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-[28px] border border-[#60607A]/10 bg-white shadow-md shadow-[#60607A]/5"
                  >
                    <div className="h-56 bg-[#f3efe9]">
                      {project.images && project.images.length > 0 ? (
                        <img src={project.images[0]} alt={project.project_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#60607A]">No images</div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D57B03]">
                          {project.project_type}
                        </span>
                        <div className="flex gap-1">
                          {project.images && project.images.length > 1 && (
                            <span className="text-xs font-medium text-[#60607A] bg-[#f3efe9] px-2 py-1 rounded">
                              {project.images.length} 📷
                            </span>
                          )}
                          {project.videos && project.videos.length > 0 && (
                            <span className="text-xs font-medium text-[#60607A] bg-[#f3efe9] px-2 py-1 rounded">
                              {project.videos.length} 🎬
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1a1a1a]">{project.project_name}</h3>
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#4a4a52]">{project.description}</p>
                      
                      <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D57B03] hover:text-[#F08A2D]">
                        Open project <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedProject && selectedMedia.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#11111a]/80 p-4 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Close project viewer" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-md transition hover:bg-[#D57B03] hover:text-white">
              <X size={20} />
            </button>

            <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.55fr)]">
              <div className="relative flex min-h-[420px] min-w-0 items-center justify-center overflow-hidden bg-[#171721] p-6 sm:min-h-[620px] sm:p-10">
                {selectedMedia[activeMediaIndex].type === 'image' ? (
                  <img src={selectedMedia[activeMediaIndex].src} alt={`${selectedProject.project_name} media ${activeMediaIndex + 1}`} className="max-h-[70vh] max-w-full object-contain transition-transform duration-200" style={{ transform: `scale(${mediaZoom})` }} />
                ) : (
                  <video src={selectedMedia[activeMediaIndex].src} controls autoPlay className="max-h-[70vh] max-w-full" />
                )}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/95 p-1 shadow-lg">
                  <button type="button" aria-label="Zoom out" disabled={mediaZoom === 1} onClick={() => setMediaZoom((current) => Math.max(1, current - 0.25))} className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1a1a] transition hover:bg-[#D57B03] hover:text-white disabled:opacity-30">
                    <Minus size={16} />
                  </button>
                  <span className="min-w-12 text-center text-xs font-semibold text-[#1a1a1a]">{Math.round(mediaZoom * 100)}%</span>
                  <button type="button" aria-label="Zoom in" disabled={mediaZoom === 2} onClick={() => setMediaZoom((current) => Math.min(2, current + 0.25))} className="flex h-9 w-9 items-center justify-center rounded-full text-[#1a1a1a] transition hover:bg-[#D57B03] hover:text-white disabled:opacity-30">
                    <Plus size={16} />
                  </button>
                </div>
                {selectedMedia.length > 1 && (
                  <>
                    <button type="button" aria-label="Previous media" onClick={() => { setActiveMediaIndex((current) => (current - 1 + selectedMedia.length) % selectedMedia.length); setMediaZoom(1); }} className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-lg hover:bg-[#D57B03] hover:text-white">
                      <ChevronLeft size={22} />
                    </button>
                    <button type="button" aria-label="Next media" onClick={() => { setActiveMediaIndex((current) => (current + 1) % selectedMedia.length); setMediaZoom(1); }} className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-lg hover:bg-[#D57B03] hover:text-white">
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <span className="w-fit rounded-full bg-[#D57B03]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D57B03]">{selectedProject.project_type}</span>
                <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a]">{selectedProject.project_name}</h2>
                <p className="mt-4 leading-relaxed text-[#4a4a52]">{selectedProject.description}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#60607A]">Media {activeMediaIndex + 1} of {selectedMedia.length}</p>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x">
                  {selectedMedia.map((media, index) => (
                    <button type="button" key={`${media.type}-${index}`} onClick={() => { setActiveMediaIndex(index); setMediaZoom(1); }} className={`relative h-20 w-24 shrink-0 snap-start overflow-hidden rounded-xl border-2 ${activeMediaIndex === index ? 'border-[#D57B03] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                      {media.type === 'image' ? <img src={media.src} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" /> : <video src={media.src} className="h-full w-full object-cover" />}
                      {media.type === 'video' && <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white"><Play size={18} fill="currentColor" /></span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
