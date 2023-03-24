<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	export let data: PageData
	$: deck = data.deck
	$: cards = data.lazy.cards

	let front_content = ''
	let back_content = ''

	const onSubmit = async () => {
		await fetch('/api/openai', {
			method: 'POST',
			body: JSON.stringify({
				text: front_content,
				back_content,
				deckId: $page.params.deckId,
			}),
		})

		await invalidateAll()
	}
</script>

<div class="space-y-6">
	<div>
		<h2>DeckID</h2>
		<div>{deck?.title}</div>
		<div>{deck?.ownerId}</div>
		<div>{deck?.id}</div>
	</div>

	<div class="space-y-3 border inline-block">
		<h2 class="hero">Create A NEW Card</h2>
		<form class="inline-flex flex-col items-start gap-5" on:submit|preventDefault={onSubmit}>
			<label class="space-x-4">
				<span>Front</span>
				<input type="text" bind:value={front_content} name="front_content" />
			</label>
			<label class="space-x-4">
				<span>Back</span>
				<input type="text" bind:value={back_content} name="back_content" />
			</label>
			<button class="btn btn-primary self-end" type="submit">Create</button>
		</form>
	</div>

	<div class="grid grid-cols-4 gap-6">
		{#await cards}
			<!-- promise is pending -->
			<div>Loading...</div>
		{:then cardsArray}
			<!-- promise was fulfilled -->
			{#each cardsArray as card}
				<div class="card card-normal card-body border">
					<div>FRONT:{card.front_content}</div>
					<div>BACK: {card.back_content}</div>
				</div>
			{/each}
		{/await}
	</div>
</div>
