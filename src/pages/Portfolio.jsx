import { useEffect, useMemo, useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { fetchPortfolioProjects } from '../services/portfolioService';

export function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const results = await fetchPortfolioProjects();
      setProjects(results);
    };

    loadProjects();
  }, []);

  const featuredProject = useMemo(() => projects[0], [projects]);

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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="overflow-hidden rounded-[32px] border border-[#60607A]/10 bg-white shadow-lg shadow-[#60607A]/5"
                >
                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="min-h-[280px] bg-[#f3efe9]">
                      {featuredProject.image_url ? (
                        <img src={featuredProject.image_url} alt={featuredProject.project_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-lg font-medium text-[#60607A]">
                          Image preview
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-10">
                      <span className="mb-3 inline-flex w-fit rounded-full bg-[#D57B03]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D57B03]">
                        {featuredProject.project_type}
                      </span>
                      <h2 className="text-3xl font-bold text-[#1a1a1a] md:text-4xl">{featuredProject.project_name}</h2>
                      <p className="mt-4 text-base leading-relaxed text-[#4a4a52]">{featuredProject.description}</p>
                      {featuredProject.video_url && (
                        <a
                          href={featuredProject.video_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex w-fit items-center rounded-full bg-[#1a1a1a] px-5 py-3 font-semibold text-white transition hover:bg-[#D57B03]"
                        >
                          Watch Video
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              )}

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.slice(1).map((project) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-[28px] border border-[#60607A]/10 bg-white shadow-md shadow-[#60607A]/5"
                  >
                    <div className="h-56 bg-[#f3efe9]">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.project_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#60607A]">No image</div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D57B03]">
                          {project.project_type}
                        </span>
                        {project.video_url && (
                          <a href={project.video_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#1a1a1a] hover:text-[#D57B03]">
                            Video
                          </a>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-[#1a1a1a]">{project.project_name}</h3>
                      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#4a4a52]">{project.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
