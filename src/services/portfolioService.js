import supabase from '../lib/supabaseClient'

const PORTFOLIO_IMAGES_BUCKET = 'portfolio-images'
const PORTFOLIO_VIDEOS_BUCKET = 'portfolio-videos'

// Fetch all projects
export async function fetchPortfolioProjects() {
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Error fetching projects:', err)
    return []
  }
}

// Create a new project
export async function createPortfolioProject(project) {
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert([
        {
          project_name: project.projectName,
          project_type: project.projectType,
          image_url: project.imageUrl || null,
          video_url: project.videoUrl || null,
          description: project.description,
        }
      ])
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (err) {
    throw new Error(err.message || 'Failed to create project')
  }
}

// Update a project
export async function updatePortfolioProject(id, project) {
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .update({
        project_name: project.projectName,
        project_type: project.projectType,
        image_url: project.imageUrl || null,
        video_url: project.videoUrl || null,
        description: project.description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  } catch (err) {
    throw new Error(err.message || 'Failed to update project')
  }
}

// Delete a project
export async function deletePortfolioProject(id) {
  try {
    const { error } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)

    return true
  } catch (err) {
    throw new Error(err.message || 'Failed to delete project')
  }
}

// Upload image to Supabase Storage
export async function uploadPortfolioImage(file) {
  if (!file) return ''

  try {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filePath = `projects/${fileName}`

    const { data, error } = await supabase.storage
      .from(PORTFOLIO_IMAGES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw new Error(error.message)

    const { data: publicUrlData } = supabase.storage
      .from(PORTFOLIO_IMAGES_BUCKET)
      .getPublicUrl(data.path)

    return publicUrlData.publicUrl
  } catch (err) {
    throw new Error(err.message || 'Failed to upload image')
  }
}

// Upload video to Supabase Storage
export async function uploadPortfolioVideo(file) {
  if (!file) return ''

  try {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filePath = `videos/${fileName}`

    const { data, error } = await supabase.storage
      .from(PORTFOLIO_VIDEOS_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw new Error(error.message)

    const { data: publicUrlData } = supabase.storage
      .from(PORTFOLIO_VIDEOS_BUCKET)
      .getPublicUrl(data.path)

    return publicUrlData.publicUrl
  } catch (err) {
    throw new Error(err.message || 'Failed to upload video')
  }
}
