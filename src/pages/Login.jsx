import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { inputClass, labelClass, buttonClass } from '../components/formStyles'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to AlbaniaSAT">
      <form onSubmit={handleSubmit}>
        <label className={labelClass}>Email</label>
        <input className={inputClass} name="email" type="email" value={form.email} onChange={handleChange} required />

        <label className={labelClass}>Password</label>
        <input className={inputClass} name="password" type="password" value={form.password} onChange={handleChange} required />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-brand">{error}</p>
        )}

        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          No account yet?{' '}
          <Link to="/register" className="font-semibold text-brand hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}