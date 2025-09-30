import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import '../../../css/auth.css'

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Login" />

      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        {status && <div className="auth-status">{status}</div>}

        <form onSubmit={submit} className="auth-form">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="auth-input"
              required
              autoFocus
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="auth-input"
              required
            />
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </div>

          <div className="auth-footer">
            {canResetPassword && (
              <Link href={route('password.request')} className="auth-link">
                Forgot your password?
              </Link>
            )}

            <button type="submit" className="auth-button" disabled={processing}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}