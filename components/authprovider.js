'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext({
  user: null,
  loading: true,
  refreshUser: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
	try {
	  const res = await fetch('/api/auth/me')
	  const data = await res.json()
	  setUser(data)
	} catch (error) {
	  console.error('Error fetching user:', error)
	  setUser(null)
	} finally {
	  setLoading(false)
	}
  }

  useEffect(() => {
	refreshUser()
  }, [])

  return (
	<AuthContext.Provider value={{ user, loading, refreshUser }}>
	  {children}
	</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)