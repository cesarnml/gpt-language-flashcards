import { text, type RequestHandler, json } from '@sveltejs/kit'
import { PLAY_SECRET_KEY, PLAY_USER_ID } from '$env/static/private'

export const POST: RequestHandler = async ({ request, fetch }) => {
	const payload = await request.json()
	console.log('payload:', payload)

	try {
		const audio = await fetch(
			`https://play.ht/api/v1/articleStatus?transcriptionId=${payload.transcriptionId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: PLAY_SECRET_KEY,
					'X-User-ID': PLAY_USER_ID,
				},
			},
		)
		const result = await audio.json()
		console.log('voice:', result)
		return json(result)
	} catch (error) {
		console.log('error:', error)
	}

	return text('good')
}
