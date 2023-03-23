import { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private'
import { prisma } from '$lib/config/prismaClient'
import GitHub from '@auth/core/providers/github'
import { SvelteKitAuth } from '@auth/sveltekit'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { Handle } from '@sveltejs/kit'

export const handle = (async (...args) => {
	return SvelteKitAuth({
		// @ts-expect-error ignore config warning
		providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
		adapter: PrismaAdapter(prisma),
		secret: AUTH_SECRET,
		callbacks: {
			async signIn({ user }) {
				await prisma.profile.upsert({
					where: {
						userId: user.id,
					},
					update: {},
					create: {
						userId: user.id,
						name: user.name,
					},
				})
				return true
			},
			async session({ session }) {
				return session
			},
		},
	})(...args)
}) satisfies Handle
