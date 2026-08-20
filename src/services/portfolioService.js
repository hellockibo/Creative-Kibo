const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '')
const API_URL = `${configuredApiUrl || ''}/api/portfolio`

async function request(path = '', options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      credentials: 'include',
      ...options,
    })
  } catch (error) {
    throw new Error(`Unable to reach the portfolio API at ${API_URL}. Check the deployed API URL.`)
  }
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || `Portfolio request failed (${response.status})`)
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
