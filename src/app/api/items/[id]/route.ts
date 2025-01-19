import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { authenticateRequest } from '../../../../lib/auth'

type Params = {
  params: {
	id: string
  }
}

export async function GET(
  request: NextRequest, 
  { params }: Params
) {
  try {
	
	const item = await prisma.item.findUnique({
	  where: {
		id: parseInt(params.id)
	  },
	  include: {
		user: {
		  select: {
			username: true
		  }
		}
	  }
	})
	
	if (!item) {
	  return NextResponse.json(
		{ error: 'Item not found' },
		{ status: 404 }
	  )
	}
	
	return NextResponse.json(item)
  } catch (error) {
	console.error('Error fetching item:', error)
	return NextResponse.json(
	  { error: 'Error fetching item' },
	  { status: 500 }
	)
  }
}

export async function PUT(
  request: NextRequest, 
  { params }: Params
) {
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
	
	const item = await prisma.item.update({
	  where: {
		id: parseInt(params.id),
		userId: user.id
	  },
	  data: {
		itemName,
		description,
		quantity
	  }
	})
	
	return NextResponse.json(item)
  } catch (error) {
	console.error('Error updating item:', error)
	return NextResponse.json(
	  { error: 'Error updating item' },
	  { status: 500 }
	)
  }
}

export async function DELETE(
  request: NextRequest, 
  { params }: Params
) {
  try {
	const user = await authenticateRequest(request)
	if (!(user instanceof Object)) return user
	
	await prisma.item.delete({
	  where: {
		id: parseInt(params.id),
		userId: user.id
	  }
	})
	
	return new Response(null, { status: 204 })
  } catch (error) {
	console.error('Error deleting item:', error)
	return NextResponse.json(
	  { error: 'Error deleting item' },
	  { status: 500 }
	)
  }
}