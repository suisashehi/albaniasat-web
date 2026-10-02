const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const MOCK = import.meta.env.VITE_MOCK_AUTH === 'true'

async function request(path, body) {
  // Test mode: pretend the backend answered
  if (MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { token: 'demo-token', user: { name: body.name || 'Demo User', email: body.email } }
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.detail || data.message || 'Something went wrong')
  }
  return data
}

export function register({ name, email, password }) {
  return request('/auth/register', { name, email, password })
}

export function login({ email, password }) {
  return request('/auth/login', { email, password })
}