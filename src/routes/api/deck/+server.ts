import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
	const newDeck = await request.json()
	const deck = await prisma.deck.create({
		data: newDeck,
	})
	return json(newDeck)
}
