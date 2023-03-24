import { openai } from '$lib/config/openai'
import type { RequestHandler } from './$types'
import { json, text } from '@sveltejs/kit'
import { prisma } from '$lib/config/prismaClient'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'

export const POST: RequestHandler = async ({ request, fetch }) => {
	const translate = await request.json()
	console.log('translate:', translate)

	const prompt = `You are a virtual assistant for a company that creates flash cards to help people learn 
  a new language. Your job is to translate the following word/phrases into Spanish. Limit all 
  responses to a semicolon separated list with the following format: english phrase, spanish phrase.`

	const messages: ChatCompletionRequestMessage[] = [
		{ role: 'system', content: prompt },
		{ role: 'user', content: translate.text },
	]

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages,
		})
		const response = completion.data.choices[0].message?.content.split(';') as string[]

		await fetch('/api/cards', {
			method: 'POST',
			body: JSON.stringify({
				front_content: response[0],
				back_content: `${response[1]}`,
				deckId: translate.deckId,
			}),
		})
		console.log('completion:', completion.data.choices[0].message?.content)
	} catch (error) {
		console.log('error:', error)
	}

	return text('good')
}
