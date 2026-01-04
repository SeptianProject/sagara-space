<script lang="ts">
	import './layout.css';
	import '$lib/styles/animations.css';
	import '$lib/styles/hover-effects.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import favicon from '$lib/assets/favicon.svg';
	import { dev } from '$app/environment';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
