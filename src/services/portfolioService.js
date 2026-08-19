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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      throw new Error('Browser storage is full. Use smaller images or remove unused projects.')
    }
    throw error
  }
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

export async function uploadPortfolioImage(file) {
  if (!file) return ''

  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      const maxDimension = 2400
      const scale = Math.min(1, maxDimension / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(objectUrl)
      resolve(canvas.toDataURL('image/webp', 0.82))
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to read image file'))
    }

    image.src = objectUrl
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
