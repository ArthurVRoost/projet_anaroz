import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import '../../../css/auth.css'
import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <>
    <Nav/>
      <Head title="Register" />

      <div className="auth-card">
        <h1 className="auth-title">Register</h1>

        <form onSubmit={submit} className="auth-form">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={data.nom}
            onChange={(e) => setData('nom', e.target.value)}
            className="auth-input"
            required
          />
          {errors.nom && <p className="auth-error">{errors.nom}</p>}

          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={data.prenom}
            onChange={(e) => setData('prenom', e.target.value)}
            className="auth-input"
            required
          />
          {errors.prenom && <p className="auth-error">{errors.prenom}</p>}

          <input
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            value={data.pseudo}
            onChange={(e) => setData('pseudo', e.target.value)}
            className="auth-input"
            required
          />
          {errors.pseudo && <p className="auth-error">{errors.pseudo}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="auth-input"
            required
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

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

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            className="auth-input"
            required
          />
          {errors.password_confirmation && (
            <p className="auth-error">{errors.password_confirmation}</p>
          )}

          <div className="auth-footer">
            <Link href={route('login')} className="auth-link">
              Already registered?
            </Link>

            <button type="submit" className="auth-button" disabled={processing}>
              Register
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  )
}