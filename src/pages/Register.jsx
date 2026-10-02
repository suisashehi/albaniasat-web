import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'
import AuthLayout from '../components/AuthLayout'
import { inputClass, labelClass, buttonClass } from '../components/formStyles'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create account" subtitle="Join AlbaniaSAT">
      <form onSubmit={handleSubmit}>
        <label className={labelClass}>Name</label>
        <input className={inputClass} name="name" value={form.name} onChange={handleChange} required />

        <label className={labelClass}>Email</label>
        <input className={inputClass} name="email" type="email" value={form.email} onChange={handleChange} required />

        <label className={labelClass}>Password</label>
        <input className={inputClass} name="password" type="password" value={form.password} onChange={handleChange} required />

        <label className={labelClass}>Confirm password</label>
        <input className={inputClass} name="confirm" type="password" value={form.confirm} onChange={handleChange} required />

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-brand">{error}</p>
        )}

        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}