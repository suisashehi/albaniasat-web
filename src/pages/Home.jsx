import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between border-b border-gray-200 px-8 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">AlbaniaSAT</p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user.name}</span>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
        <p className="mt-2 text-gray-500">The map will live here.</p>
      </main>
    </div>
  )
}