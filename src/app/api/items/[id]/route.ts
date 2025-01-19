import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { authenticateRequest } from '../../../../lib/auth'

export async function GET(
  request: NextRequest, 
  {params}: {params: Promise<{ id: string }>} 
) {
	const { id } = await params;

  console.log("--------");
  console.log("--------");
  console.log("--------");
  console.log("-------- " + id);
  console.log("--------");
  console.log("--------");
  console.log("--------");
  console.log("--------");
  
  try {
	const item = await prisma.item.findUnique({
	  where: {
		id: parseInt(id)
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
  context: { params: { id: string } }
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
		id: parseInt(context.params.id),
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
  context: { params: { id: string } }
) {
  try {
	const user = await authenticateRequest(request)
	if (!(user instanceof Object)) return user
	
	await prisma.item.delete({
	  where: {
		id: parseInt(context.params.id),
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