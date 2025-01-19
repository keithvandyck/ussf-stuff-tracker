'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../components/authprovider'

export default function Register() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
	e.preventDefault();
	setError("");
	setLoading(true);

	try {
	  const res = await fetch('/api/auth/register', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  first: e.target.first.value,
		  last: e.target.last.value,
		  username: e.target.username.value,
		  password: e.target.password.value,
		}),
	  })

	  const data = await res.json()

	  if (!res.ok) {
		throw new Error(data.error || 'Registration failed')
	  }
	  await refreshUser();
	  router.push('/account')
	} catch (err) {
	  setError(err.message)
	} finally {
	  setLoading(false)
	}
  }

  return (
	  <div id="main-form">
		  <h1>Register</h1>
		  <form onSubmit={handleSubmit}>
			  <label htmlFor="first">First Name</label>
			  <input id="first" name="first" type="text" required placeholder="Santa" />
			  <label htmlFor="last">Last Name</label>
			  <input id="last" name="last" type="text" required placeholder="Claus" />
			  <label htmlFor="username">Username</label>
			  <input id="username" name="username" type="text" required placeholder="StNick" />
			  <label htmlFor="password">Password</label>
			  <input id="password" name="password" type="password" required placeholder="TisTheSecret" />
			  {error && (
			  <div className="yuck-error">
				  {error}
			  </div>
			  )}
			  
			  <button type="submit" disabled={loading} className="i-am-a-button">
				  {loading ? 'Signing up...' : 'Sign up'}
			  </button>
		  </form>
	  </div>
  )
}
