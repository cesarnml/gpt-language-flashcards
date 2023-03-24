<script lang="ts">
	import { onMount } from 'svelte'

	export let card: Record<string, string>
	let src: Record<string, string> = {}
	onMount(async () => {
		const audio = await fetch('/api/audio', {
			method: 'POST',
			body: JSON.stringify({
				transcriptionId: card.transcriptionId,
			}),
		})
		src = await audio.json()
		console.log('srSRCSJDKFJKSc:', src)
	})
</script>

<div class="card card-normal card-body border">
	<div>FRONT:{card.front_content}</div>
	<div>BACK: {card.back_content}</div>
	<audio controls src={src.audioUrl} />
</div>
