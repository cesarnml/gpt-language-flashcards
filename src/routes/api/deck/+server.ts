import type { RequestHandler } from './$types'
import { json, text } from '@sveltejs/kit'
import { prisma } from '$lib/config/prismaClient'

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession()
	if (session?.user?.email) {
		const dbUser = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
		})
		if (dbUser) {
			const dbProfile = await prisma.profile.findUnique({
				where: {
					userId: dbUser.id,
				},
			})
			const newDeck = await request.json()
			newDeck.ownerId = dbProfile?.id
			const created = await prisma.deck.create({
				data: newDeck,
			})
			return json(created)
		}
	}
	return text('')
}
