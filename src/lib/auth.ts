import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export interface AuthUser {
  id: number
  username: string
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
	const cookieStore = await cookies()
	const tokenCookie = cookieStore.get('auth-token')
	const token = tokenCookie?.value
	
	if (!token) return null
	
	const verified = await jwtVerify(
	  token,
	  new TextEncoder().encode(process.env.JWT_SECRET)
	)
	
	return verified.payload as AuthUser
  } catch (error) {
	console.error('Auth error:', error)
	return null
  }
}

export async function authenticateRequest(request: Request) {
  try {
	const user = await getAuthUser()
	if (!user) {
	  return new Response('Unauthorized', { status: 401 })
	}
	return user
  } catch (error) {
	console.error('Authentication error:', error)
	return new Response('Internal Server Error', { status: 500 })
  }
}