import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
	const { first, last, username, password } = await request.json()

	if (!first || !last || !username || !password) {
	  return NextResponse.json(
		{ error: 'Missing required fields' },
		{ status: 400 }
	  )
	}

	const existingUser = await prisma.user.findUnique({
	  where: { username }
	})

	if (existingUser) {
	  return NextResponse.json(
		{ error: 'Username already exists' },
		{ status: 400 }
	  )
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
	  data: {
		first,
		last,
		username,
		password: hashedPassword
	  },
	  select: {
		id: true,
		first: true,
		last: true,
		username: true
	  }
	})

	return NextResponse.json(user)
  } catch (error) {
	console.error('Registration error:', error)
	return NextResponse.json(
	  { error: 'Error creating user' },
	  { status: 500 }
	)
  }
}
