export const PORTFOLIO_STORAGE_KEY = 'kibo-portfolio-projects';

export const PROJECT_TYPES = [
  'Website',
  'AI Ads',
  'Branding',
  'Graphic Design',
];

export function getPortfolioProjects() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read portfolio projects:', error);
    return [];
  }
}

export function savePortfolioProjects(projects) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new CustomEvent('portfolio-updated'));
}

export function addPortfolioProject(project) {
  const current = getPortfolioProjects();
  const nextProjects = [project, ...current];
  savePortfolioProjects(nextProjects);
  return nextProjects;
}
