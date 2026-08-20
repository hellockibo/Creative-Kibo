const API_URL = '/api/portfolio'

async function request(path = '', options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      credentials: 'include',
      ...options,
    })
  } catch (error) {
    throw new Error('Backend is not running. Start the app with npm run dev.')
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Portfolio request failed')
  return data
}

export async function fetchPortfolioProjects() {
  return request()
}

export async function createPortfolioProject(project) {
  return request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  })
}

export async function updatePortfolioProject(id, project) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  })
}

export async function deletePortfolioProject(id) {
  return request(`/${id}`, { method: 'DELETE' })
}

async function uploadPortfolioMedia(file) {
  if (!file) return ''
  const formData = new FormData()
  formData.append('file', file)
  const result = await request('/media', { method: 'POST', body: formData })
  return result.url
}

export function uploadPortfolioImage(file) {
  return uploadPortfolioMedia(file)
}

export function uploadPortfolioVideo(file) {
  return uploadPortfolioMedia(file)
}
