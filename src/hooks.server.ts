import { AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private'
import { prisma } from '$lib/config/prismaClient'
import GitHub from '@auth/core/providers/github'
import { SvelteKitAuth } from '@auth/sveltekit'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { Handle } from '@sveltejs/kit'

export const handle = SvelteKitAuth({
	// @ts-expect-error ignore config warning
	providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
	adapter: PrismaAdapter(prisma),
	secret: AUTH_SECRET,
	callbacks: {
		async signIn({ user, account, profile }) {
			console.log('SIGNIN')

			console.log('profile:', profile)
			console.log('account:', account)
			console.log('user:', user)
			await prisma.profile.upsert({
				where: {
					id: user.id,
				},
				update: {},
				create: {
					userId: user.id,
					name: user.name,
				},
			})
			return true
		},
		async session({ session, user }) {
			console.log('CALLBACKING')
			console.log('user:', user)
			console.log('session:', session)
			return session
		},
	},
}) satisfies Handle
