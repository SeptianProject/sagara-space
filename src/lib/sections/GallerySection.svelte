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

<section class="mt-40 flex flex-col items-center justify-center space-y-14">
	<!-- title -->
	<div
		class="slide-up animate-on-scroll flex flex-col items-center justify-center text-center"
		use:inView
	>
		<h4 class="text-lg text-[#333333]/80">Ukir Cerita Bersama Rihat</h4>
		<h1 class="text-4xl font-bold text-[#333333]">#Happy Customer</h1>
	</div>
	<!-- card carousel -->
	<div class="overflow-hidde flex gap-8">
		{#each galleryImages as gallery, i}
			<!-- svelte-ignore a11y_img_redundant_alt -->
			<img
				src={gallery}
				alt="Gallery Image"
				class="gallery-img-hover stagger-item animate-on-scroll h-130 w-80 object-cover object-center shadow-md delay-{i *
					100}"
				use:inView={{ threshold: 0.3 }}
			/>
		{/each}
	</div>
	<!-- button outline -->
	<button
		class="btn-outline scale-in animate-on-scroll cursor-pointer border-2 border-[#592602] bg-transparent px-10 py-2.5 font-semibold text-[#592602] transition-all duration-300"
		use:inView
	>
		Reservasi Sekarang
	</button>
</section>
