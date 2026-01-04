<script>
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import arrowRight from '$lib/assets/rihat/arrow-right.svg';
	import Navbar from '$lib/layouts/Navbar.svelte';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';

	const background = getCloudinaryUrl('rihat/hero/hero.webp', 'fullOptimized');
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<!-- hero section -->
<section
	class="relative size-full min-h-screen space-y-8 overflow-hidden sm:space-y-12 md:space-y-20"
>
	<img
		src={background}
		alt="background"
		class="absolute inset-0 -z-10 h-full min-h-screen w-full object-cover"
	/>

	<div
		class="from-opacity-30 0 absolute z-10 h-full w-full bg-linear-to-l from-black/60 from-60% to-[#161C2D]/40"
	></div>

	<!-- navbar -->
	<Navbar />

	{#if mounted}
		<div
			class="relative z-10 flex flex-col items-center justify-center px-4 py-10 text-center sm:px-8 md:items-end md:justify-end md:px-20 md:py-20 md:text-right"
			in:fade={{ duration: 800, delay: 200 }}
		>
			<h1
				class="max-w-full text-3xl font-bold text-white sm:text-4xl md:max-w-220 md:text-5xl lg:text-6xl"
				in:fly={{ y: 30, duration: 700, delay: 400 }}
			>
				Istirahat Sejenak, Nikmati Kehangatan di Rihat.
			</h1>
			<p
				class="mt-4 max-w-full text-base font-light text-white/70 sm:text-lg md:mt-5 md:max-w-200 md:text-xl"
				in:fly={{ y: 30, duration: 700, delay: 600 }}
			>
				Dibuat dengan sepenuh hati dari bahan pilihan untuk menemani setiap cerita dan momen
				santaimu menjadi lebih bermakna.
			</p>
			<!-- button default -->
			<button
				class="btn-primary group mt-8 flex w-full max-w-xs cursor-pointer items-center justify-between rounded-md bg-[#473BF0] px-6 py-3 font-semibold text-white transition-all duration-300 sm:px-8 sm:py-4 md:mt-20 md:w-80"
				in:fly={{ y: 30, duration: 700, delay: 800 }}
			>
				Eksplore Rihat
				<img src={arrowRight} alt="arrow right" class="btn-icon size-4 object-cover select-none" />
			</button>
		</div>
	{/if}
</section>
