<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';

	let { onLoadingComplete = () => {} } = $props();

	const logo = getCloudinaryUrl('rihat/logo/logo.webp', 'thumbnail');
	let isVisible = $state(true);

	onMount(() => {
		// Minimal loading time untuk smooth experience
		const timer = setTimeout(() => {
			isVisible = false;
			setTimeout(onLoadingComplete, 500); // Delay untuk animasi fade out
		}, 2000); // 2 detik loading

		return () => clearTimeout(timer);
	});
</script>

{#if isVisible}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-[#161C2D] via-[#1a2235] to-[#161C2D]"
		transition:fade={{ duration: 500 }}
	>
		<div class="flex flex-col items-center gap-6">
			<!-- Logo dengan animasi -->
			<div class="animate-bounce-slow">
				<img src={logo} alt="Rihat Logo" class="h-32 w-32 object-contain drop-shadow-2xl" />
			</div>

			<!-- Loading bar -->
			<div class="h-1 w-48 overflow-hidden rounded-full bg-white/20">
				<div class="animate-loading-bar h-full bg-linear-to-r from-[#473BF0] to-[#592602]"></div>
			</div>

			<!-- Text -->
			<p class="animate-pulse text-lg font-light text-white/80">Loading...</p>
		</div>
	</div>
{/if}

<style>
	@keyframes bounce-slow {
		0%,
		100% {
			transform: translateY(-5%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}

	.animate-bounce-slow {
		animation: bounce-slow 2s infinite;
	}

	@keyframes loading-bar {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.animate-loading-bar {
		animation: loading-bar 1.5s ease-in-out infinite;
	}
</style>
