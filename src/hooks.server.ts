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
}) satisfies Handle
