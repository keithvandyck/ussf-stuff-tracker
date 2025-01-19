import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth'

export async function GET(request: Request) {
  try {
	const user = await authenticateRequest(request)
	if (!(user instanceof Object)) return user

	const items = await prisma.item.findMany({
	  where: {
		userId: user.id
	  },
	  orderBy: {
		createdAt: 'desc'
	  }
	})

	return NextResponse.json(items)
  } catch (error) {
	console.error('Error fetching items:', error)
	return NextResponse.json(
	  { error: 'Error fetching items' },
	  { status: 500 }
	)
  }
}

export async function POST(request: Request) {
  try {
	const user = await authenticateRequest(request)
	if (!(user instanceof Object)) return user

	const { itemName, description, quantity } = await request.json()

	if (!itemName || typeof quantity !== 'number') {
	  return NextResponse.json(
		{ error: 'Invalid item data' },
		{ status: 400 }
	  )
	}

	const item = await prisma.item.create({
	  data: {
		userId: user.id,
		itemName,
		description,
		quantity
	  }
	})

	return NextResponse.json(item)
  } catch (error) {
	console.error('Error creating item:', error)
	return NextResponse.json(
	  { error: 'Error creating item' },
	  { status: 500 }
	)
  }
}

