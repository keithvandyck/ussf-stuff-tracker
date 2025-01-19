import { prisma } from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
	const items = await prisma.item.findMany({
	  include: {
		user: {
		  select: {
			username: true,
			first: true,
			last: true
		  }
		}
	  },
	})

	return NextResponse.json(items)
  } catch (error) {
	console.error('Error fetching public items:', error)
	return NextResponse.json(
	  { error: 'Error fetching items' },
	  { status: 500 }
	)
  }
}