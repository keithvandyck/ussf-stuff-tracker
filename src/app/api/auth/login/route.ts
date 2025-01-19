import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
	const { username, password } = await request.json()

	if (!username || !password) {
	  return NextResponse.json(
		{ error: 'Missing username or password' },
		{ status: 400 }
	  )
	}

	const user = await prisma.user.findUnique({
	  where: { username }
	})
	
	console.log("Found user: " + user.username);

	if (!user) {
	  return NextResponse.json(
		{ error: 'User not found' },
		{ status: 404 }
	  )
	}

	const isValid = await bcrypt.compare(password, user.password)

	if (!isValid) {
	  return NextResponse.json(
		{ error: 'Invalid password' },
		{ status: 401 }
	  )
	}

	const token = await new SignJWT({
	  id: user.id,
	  username: user.username
	})
	  .setProtectedHeader({ alg: 'HS256' })
	  .setExpirationTime('24h')
	  .sign(new TextEncoder().encode(process.env.JWT_SECRET))

	const cookieStore = await cookies()
	await cookieStore.set('auth-token', token, {
	  httpOnly: true,
	  secure: process.env.NODE_ENV === 'production',
	  sameSite: 'strict',
	  maxAge: 86400 // 24 hours
	})

	return NextResponse.json({
	  user: {
		id: user.id,
		first: user.first,
		last: user.last,
		username: user.username
	  }
	})
  } catch (error) {
	console.error('Login error:', error)
	return NextResponse.json(
	  { error: 'Error during login' },
	  { status: 500 }
	)
  }
}
