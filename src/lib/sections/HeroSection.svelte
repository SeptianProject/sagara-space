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
<section class="relative size-full min-h-screen space-y-20 overflow-hidden">
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
			class="relative z-10 flex flex-col items-end justify-end px-20 py-20 text-right"
			in:fade={{ duration: 800, delay: 200 }}
		>
			<h1
				class="max-w-220 text-6xl font-bold text-white"
				in:fly={{ y: 30, duration: 700, delay: 400 }}
			>
				Istirahat Sejenak, Nikmati Kehangatan di Rihat.
			</h1>
			<p
				class="mt-5 max-w-200 text-xl font-light text-white/70"
				in:fly={{ y: 30, duration: 700, delay: 600 }}
			>
				Dibuat dengan sepenuh hati dari bahan pilihan untuk menemani setiap cerita dan momen
				santaimu menjadi lebih bermakna.
			</p>
			<!-- button default -->
			<button
				class="btn-primary group mt-20 flex w-80 cursor-pointer items-center justify-between rounded-md bg-[#473BF0] px-8 py-4 font-semibold text-white transition-all duration-300"
				in:fly={{ y: 30, duration: 700, delay: 800 }}
			>
				Eksplore Rihat
				<img src={arrowRight} alt="arrow right" class="btn-icon size-4 object-cover select-none" />
			</button>
		</div>
	{/if}
</section>
