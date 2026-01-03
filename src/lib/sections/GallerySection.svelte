<script>
	import galleryImage1 from '$lib/assets/rihat/gallery/image1.webp';
	import galleryImage2 from '$lib/assets/rihat/gallery/image2.webp';
	import galleryImage3 from '$lib/assets/rihat/gallery/image3.webp';
	import galleryImage4 from '$lib/assets/rihat/gallery/image4.webp';
	import galleryImage5 from '$lib/assets/rihat/gallery/image5.webp';

	const galleryImages = [galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5];
</script>

<section class="mt-40 space-y-14 flex flex-col items-center justify-center">
	<!-- title -->
	<div class="flex flex-col items-center justify-center text-center">
		<h4 class="text-lg text-[#333333]/80">Ukir Cerita Bersama Rihat</h4>
		<h1 class="text-4xl font-bold text-[#333333]">#Happy Customer</h1>
	</div>
	<!-- card carousel -->
	<div class="overflow-hidde flex gap-8">
		{#each galleryImages as gallery}
			<img src={gallery} alt="Gallery Image" class="h-130 w-80 object-cover object-center shadow-md" />
		{/each}
	</div>
	<!-- button outline -->
	<button
		class="cursor-pointer border-2 border-[#592602] bg-transparent px-10 py-2.5 font-semibold text-[#592602] transition-all duration-300 hover:bg-[#592602] hover:text-white"
	>
		Reservasi Sekarang
	</button>
</section>
