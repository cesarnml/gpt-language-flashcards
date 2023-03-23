import type { PageServerLoad } from './$types'
import { prisma } from '$lib/config/prismaClient'

export const load: PageServerLoad = async () => {
	const decks = await prisma.deck.findMany()
	const account = await prisma.account.findMany()
	console.log('account:', account)
	return { decks }
}
