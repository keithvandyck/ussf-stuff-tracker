'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../components/authprovider'

export default function LoginPage() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [error, setError] = useState("")
  
  const handleSubmit = async (e) => {
	  setError("");
	e.preventDefault();
	try {
	  const res = await fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
		  username: e.target.username.value,
		  password: e.target.password.value,
		}),
	  })

	  if (!res.ok) throw new Error('Login failed')
	  
	  await refreshUser()
	  router.push('/account')
	} catch (err) {
	  setError(err.message)
	}
  }

  return (
		<div id="main-form">
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input id="username" name="username" type="text" required placeholder="StNick" />
				<label htmlFor="password">Password</label>
				<input id="password" name="password" type="password" required placeholder="TisTheSecret" />
				{error && (
				<div className="yuck-error">
					{error}
				</div>
				)}
				<button type="submit" className="i-am-a-button">Log In</button>
			</form>
		</div>
	)
}