import type { PageServerLoad } from './$types'
import { prisma } from '$lib/config/prismaClient'

export const load: PageServerLoad = async () => {
	const decks = await prisma.deck.findMany()
	return { decks }
}
