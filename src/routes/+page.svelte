<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client'
	import { page } from '$app/stores'

	export let data
	const { decks } = data

	let title = ''

	const onSubmit = () => {
		fetch('/api/deck', {
			method: 'POST',
			body: JSON.stringify({
				title,
				ownerId: 1,
			}),
		})
	}
</script>

<div class="space-y-10">
	<h1 class="font-bold text-xl">Welcome to SvelteKit</h1>
	<div>DECKS: {JSON.stringify(decks, null, 2)}</div>
	<p>
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<img class="h-12 w-12 rounded-full" src={$page.data.session.user.image} alt="avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span>
			<button class="btn btn-warning" on:click={() => signOut()}>Sign out</button>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<button class="btn btn-primary" on:click={() => signIn('github')}>Sign In with GitHub</button>
		{/if}
	</p>
	<div class="space-y-3 border inline-block">
		<h2>Create A NEW DECK</h2>
		<form class="inline-flex flex-col items-start gap-5" on:submit={onSubmit}>
			<label class="space-x-4">
				<span>Title</span>
				<input type="text" bind:value={title} name="title" />
			</label>
			<button class="btn btn-primary self-end" type="submit">Create</button>
		</form>
	</div>
</div>
