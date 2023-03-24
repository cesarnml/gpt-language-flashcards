import { openai } from '$lib/config/openai'
import { text } from '@sveltejs/kit'
import type { ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { PLAY_SECRET_KEY, PLAY_USER_ID } from '$env/static/private'

export const POST: RequestHandler = async ({ request, fetch }) => {
	const translate = await request.json()
	console.log('translate:', translate)

	const prompt = `You are a virtual assistant for a company that creates flash cards to help people learn 
  a new language. Your job is to translate the following word/phrases into Spanish. Limit all 
  responses to a semicolon separated list with the following format: english phrase, spanish phrase.`

	const messages: ChatCompletionRequestMessage[] = [
		{ role: 'system', content: prompt },
		{ role: 'user', content: `Translate the following text to Spanish: ${translate.text}` },
	]

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages,
		})
		const response = completion.data.choices[0].message?.content.split(';') as string[]

		console.log('completion:', completion.data.choices[0].message?.content)

		const voice = await fetch('https://play.ht/api/v1/convert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: PLAY_SECRET_KEY,
				'X-User-ID': PLAY_USER_ID,
			},
			body: JSON.stringify({
				voice: 'Miguel',
				content: [`${response[1]}`],
			}),
		})
		const result = await voice.json()
		console.log('voice:', result)

		await fetch('/api/cards', {
			method: 'POST',
			body: JSON.stringify({
				front_content: response[0],
				back_content: `${response[1]}`,
				deckId: translate.deckId,
				transcriptionId: result.transcriptionId,
			}),
		})
	} catch (error) {
		console.log('error:', error)
	}

	return text('good')
}
