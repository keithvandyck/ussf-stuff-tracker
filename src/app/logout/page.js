'use client'

import { useAuth } from '../../../components/authprovider'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Logout() {
  const { refreshUser } = useAuth();
  
  useEffect(() => {
	  const performLogout = async () => {
		try {
		  const response = await fetch('/api/auth/logout', {
			method: 'POST'
		  })
	  	  await refreshUser()
		} catch (error) {
		  console.error('Logout error:', error)
		}
	  }
	  performLogout()
	}, [])

  return (
	  <div id="logout">
		  <h1>Bye</h1>
		  <p>You have just logged out.</p>
		  <Link className="i-am-a-button" href="/">Home</Link>
		  <Link className="i-am-a-button" href="/list">View All Items</Link>
	  </div>
  )
}
