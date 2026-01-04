<script>
	import { fade } from 'svelte/transition';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import Footer from '$lib/layouts/Footer.svelte';
	import GallerySection from '$lib/sections/GallerySection.svelte';
	import HeroSection from '$lib/sections/HeroSection.svelte';
	import LocationSection from '$lib/sections/LocationSection.svelte';
	import MenuSection from '$lib/sections/MenuSection.svelte';

	let loadingComplete = $state(false);

	function handleLoadingComplete() {
		loadingComplete = true;
	}
</script>

<LoadingScreen onLoadingComplete={handleLoadingComplete} />

{#if loadingComplete}
	<div in:fade={{ duration: 300 }}>
		<HeroSection />
		<MenuSection />
		<LocationSection />
		<GallerySection />
		<Footer />
	</div>
{/if}
