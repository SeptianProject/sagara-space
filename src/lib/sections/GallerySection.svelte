<script>
	import { inView } from '$lib/utils/animations';
	import { env } from '$env/dynamic/public';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';

	const galleryImage1 = getCloudinaryUrl('rihat/gallery/gallery-1.webp', 'fullOptimized');
	const galleryImage2 = getCloudinaryUrl('rihat/gallery/gallery-2.webp', 'fullOptimized');
	const galleryImage3 = getCloudinaryUrl('rihat/gallery/gallery-3.webp', 'fullOptimized');
	const galleryImage4 = getCloudinaryUrl('rihat/gallery/gallery-4.webp', 'fullOptimized');
	const galleryImage5 = getCloudinaryUrl('rihat/gallery/gallery-5.webp', 'fullOptimized');
	const galleryImages = [galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5];
</script>

<section
	id="gallery"
	class="mt-20 flex flex-col items-center justify-center space-y-8 px-4 sm:mt-32 sm:space-y-12 sm:px-0 md:mt-40 md:space-y-14"
>
	<!-- title -->
	<div
		class="slide-up animate-on-scroll flex flex-col items-center justify-center gap-1 px-4 text-center sm:gap-2"
		use:inView
	>
		<h4 class="text-base text-[#333333]/80 sm:text-lg">Ukir Cerita Bersama Rihat</h4>
		<h1 class="text-2xl font-bold text-[#333333] sm:text-3xl md:text-4xl">#Happy Customer</h1>
	</div>
	<!-- card carousel -->
	<div class="flex w-full gap-4 overflow-x-auto px-4 sm:gap-6 sm:overflow-hidden md:gap-8 md:px-0">
		{#each galleryImages as gallery, i}
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img
				src={gallery}
				alt="Gallery Image"
				class="gallery-img-hover stagger-item animate-on-scroll h-80 w-64 object-cover object-center shadow-md sm:h-96 sm:w-72 md:h-130 md:w-80 delay-{i *
					100}"
				use:inView={{ threshold: 0.3 }}
			/>
		{/each}
	</div>
	<!-- button outline -->
	<a
		href="#location"
		class="btn-outline scale-in animate-on-scroll mx-4 w-full cursor-pointer border-2 border-[#592602] bg-transparent px-8 py-2.5 text-center font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-10"
		use:inView
	>
		Reservasi Sekarang
	</a>
</section>
