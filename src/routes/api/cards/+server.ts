import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { prisma } from '$lib/config/prismaClient'

export const POST: RequestHandler = async ({ request }) => {
	const newCard = await request.json()

	const created = await prisma.card.create({
		data: newCard,
	})
	return json(created)
}
