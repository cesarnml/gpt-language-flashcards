import type { PageServerLoad } from './$types'
import { prisma } from '$lib/config/prismaClient'

export const load: PageServerLoad = async ({ params }) => {
	const deck = await prisma.deck.findUnique({
		where: {
			id: params.deckId,
		},
	})
	const cards = prisma.card.findMany({
		where: {
			deckId: params.deckId,
		},
	})
	return {
		deck,
		lazy: {
			cards,
		},
	}
}
