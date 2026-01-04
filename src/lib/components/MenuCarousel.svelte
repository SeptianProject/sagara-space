<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import type { EmblaOptionsType } from 'embla-carousel';

	interface Props {
		children?: import('svelte').Snippet;
		options?: EmblaOptionsType;
		autoplay?: boolean;
		autoplayDelay?: number;
	}

	let {
		children,
		options = { loop: true, align: 'start', slidesToScroll: 1 },
		autoplay = true,
		autoplayDelay = 3000
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	const plugins = autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : [];

	let emblaApi = $state<any>(null);

	function onInit(event: CustomEvent) {
		emblaApi = event.detail;
	}

	function scrollPrev() {
		if (emblaApi) emblaApi.scrollPrev();
	}

	function scrollNext() {
		if (emblaApi) emblaApi.scrollNext();
	}
</script>

<div class="embla relative">
	<div
		class="embla__viewport overflow-hidden"
		use:emblaCarouselSvelte={{ options, plugins }}
		onemblaInit={onInit}
	>
		<div class="embla__container flex [touch-action:pan-y_pinch-zoom] gap-16 backface-hidden">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>

	<!-- Navigation Buttons -->
	<button
		onclick={scrollPrev}
		class="embla__prev absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
		aria-label="Previous slide"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="h-6 w-6 text-[#592602]"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	</button>

	<button
		onclick={scrollNext}
		class="embla__next absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full bg-white/90 p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
		aria-label="Next slide"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="h-6 w-6 text-[#592602]"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</button>
</div>
