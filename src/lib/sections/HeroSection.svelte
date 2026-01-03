<script>
	import background from '$lib/assets/rihat/background.webp';
	import arrowRight from '$lib/assets/rihat/arrow-right.svg';
	import Navbar from '$lib/layouts/Navbar.svelte';
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

	<div class="relative z-10 flex flex-col items-end justify-end px-20 py-20 text-right">
		<h1 class="max-w-220 text-6xl font-bold text-white">
			Istirahat Sejenak, Nikmati Kehangatan di Rihat.
		</h1>
		<p class="mt-5 max-w-200 text-xl font-light text-white/70">
			Dibuat dengan sepenuh hati dari bahan pilihan untuk menemani setiap cerita dan momen santaimu
			menjadi lebih bermakna.
		</p>
		<!-- button default -->
		<button
			class="group mt-20 flex w-80 cursor-pointer items-center justify-between rounded-md bg-[#473BF0] px-8 py-4 font-semibold text-white transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:bg-[#3229C9]"
		>
			Eksplore Rihat
			<img
				src={arrowRight}
				alt="arrow right"
				class="size-4 object-cover transition duration-300 select-none group-hover:translate-x-2"
			/>
		</button>
	</div>
</section>
