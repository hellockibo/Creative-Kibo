// Portfolio Service using localStorage (No Database Required)
// All projects are stored in the browser's localStorage

const STORAGE_KEY = 'kibo_portfolio_projects'

// Get all projects from localStorage
export async function fetchPortfolioProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Save all projects to localStorage
function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

// Create a new project
export async function createPortfolioProject(project) {
  try {
    const projects = await fetchPortfolioProjects()
    const newProject = {
      id: Date.now().toString(),
      project_name: project.projectName,
      project_type: project.projectType,
      images: project.images || [],
      videos: project.videos || [],
      description: project.description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    projects.push(newProject)
    saveProjects(projects)
    return newProject
  } catch (error) {
    throw new Error(error.message || 'Failed to create project')
  }
}

// Update a project
export async function updatePortfolioProject(id, project) {
  try {
    const projects = await fetchPortfolioProjects()
    const index = projects.findIndex((p) => p.id === id)

    if (index === -1) throw new Error('Project not found')

    projects[index] = {
      ...projects[index],
      project_name: project.projectName,
      project_type: project.projectType,
      images: project.images || [],
      videos: project.videos || [],
      description: project.description,
      updated_at: new Date().toISOString(),
    }

    saveProjects(projects)
    return projects[index]
  } catch (error) {
    throw new Error(error.message || 'Failed to update project')
  }
}

// Delete a project
export async function deletePortfolioProject(id) {
  try {
    const projects = await fetchPortfolioProjects()
    const filtered = projects.filter((p) => p.id !== id)

    if (filtered.length === projects.length) {
      throw new Error('Project not found')
    }

    saveProjects(filtered)
    return true
  } catch (error) {
    throw new Error(error.message || 'Failed to delete project')
  }
}

// Upload image - Convert to Base64 Data URL (no server upload needed)
export async function uploadPortfolioImage(file) {
  if (!file) return ''

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result) // Returns data:image/... URL
    }

    reader.onerror = () => {
      reject(new Error('Failed to read image file'))
    }

    reader.readAsDataURL(file)
  })
}

// Upload video - Convert to Base64 Data URL (no server upload needed)
export async function uploadPortfolioVideo(file) {
  if (!file) return ''

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result) // Returns data:video/... URL
    }

    reader.onerror = () => {
      reject(new Error('Failed to read video file'))
    }

    reader.readAsDataURL(file)
  })
}
