<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client'
	import { page } from '$app/stores'

	export let data
	const { decks } = data
</script>

<h1 class="font-bold text-xl">Welcome to SvelteKit</h1>
<div>DECKS: {JSON.stringify(decks, null, 2)}</div>
<button class="btn btn-primary">Test</button>
<p>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('github')}>Sign In with GitHub</button>
	{/if}
</p>
