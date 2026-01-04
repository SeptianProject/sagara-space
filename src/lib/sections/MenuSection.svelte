<script>
	import { inView } from '$lib/utils/animations';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';
	import MenuCarousel from '$lib/components/MenuCarousel.svelte';
	import MenuCard from '$lib/components/MenuCard.svelte';

	const coffeeImage = getCloudinaryUrl('rihat/about/about.webp', 'fullOptimized');
	const rihatKopiSusu = getCloudinaryUrl('rihat/menu/rihat-kopi-susu.webp', 'fullOptimized');
	const mochaLatte = getCloudinaryUrl('rihat/menu/mocha-latte.webp', 'fullOptimized');
	const roseMatcha = getCloudinaryUrl('rihat/menu/rose-matcha.webp', 'fullOptimized');

	const cardMenus = [
		{
			name: 'Rihat Kopi Susu',
			image: rihatKopiSusu,
			price: '18K',
			description: 'Perpaduan kopi robusta pilihan dengan susu segar yang lembut.'
		},
		{
			name: 'Mocha Latte',
			image: mochaLatte,
			price: '23K',
			description: 'Kombinasi sempurna antara cokelat kaya dan espresso yang kuat.'
		},
		{
			name: 'Rose Matcha',
			image: roseMatcha,
			price: '25K',
			description: 'Teh hijau matcha berkualitas tinggi dengan sentuhan aroma mawar yang harum.'
		},
		{
			name: 'Rihat Kopi Susu',
			image: rihatKopiSusu,
			price: '18K',
			description: 'Perpaduan kopi robusta pilihan dengan susu segar yang lembut.'
		},
		{
			name: 'Mocha Latte',
			image: mochaLatte,
			price: '23K',
			description: 'Kombinasi sempurna antara cokelat kaya dan espresso yang kuat.'
		},
		{
			name: 'Rose Matcha',
			image: roseMatcha,
			price: '25K',
			description: 'Teh hijau matcha berkualitas tinggi dengan sentuhan aroma mawar yang harum.'
		},
		{
			name: 'Rihat Kopi Susu',
			image: rihatKopiSusu,
			price: '18K',
			description: 'Perpaduan kopi robusta pilihan dengan susu segar yang lembut.'
		},
		{
			name: 'Mocha Latte',
			image: mochaLatte,
			price: '23K',
			description: 'Kombinasi sempurna antara cokelat kaya dan espresso yang kuat.'
		},
		{
			name: 'Rose Matcha',
			image: roseMatcha,
			price: '25K',
			description: 'Teh hijau matcha berkualitas tinggi dengan sentuhan aroma mawar yang harum.'
		},
		{
			name: 'Rihat Kopi Susu',
			image: rihatKopiSusu,
			price: '18K',
			description: 'Perpaduan kopi robusta pilihan dengan susu segar yang lembut.'
		},
		{
			name: 'Mocha Latte',
			image: mochaLatte,
			price: '23K',
			description: 'Kombinasi sempurna antara cokelat kaya dan espresso yang kuat.'
		},
		{
			name: 'Rose Matcha',
			image: roseMatcha,
			price: '25K',
			description: 'Teh hijau matcha berkualitas tinggi dengan sentuhan aroma mawar yang harum.'
		}
	];
</script>

<section class="mt-40 space-y-20 px-20">
	<!-- text description / image -->
	<div class="flex items-center justify-between gap-20">
		<!-- text description -->
		<div class="slide-right animate-on-scroll flex w-1/2 flex-col items-start gap-4" use:inView>
			<h1 class="text-4xl font-bold text-[#333333]">Temukan Cita Rasa Kopi Terbaik.</h1>
			<p class="text-lg text-[#333333]/70">
				Temukan ruang untuk bernapas di tengah hiruk pikuk harimu. Kami hadir untuk menyajikan lebih
				dari sekadar minuman, sebuah pelukan hangat dalam cangkir.
			</p>
			<!-- button outline -->
			<button
				class="btn-outline mt-2 cursor-pointer rounded-md border-2 border-[#592602] bg-transparent px-16 py-2.5 font-semibold text-[#592602] transition-all duration-300"
			>
				Lihat Menu
			</button>
		</div>
		<!-- image -->
		<div class="slide-left animate-on-scroll w-1/2" use:inView={{ threshold: 0.3 }}>
			<img src={coffeeImage} alt="" class="h-full w-full rounded-xl object-cover" />
		</div>
	</div>

	<!-- best menu's -->
	<div class="mt-40 flex flex-col items-center justify-center gap-8">
		<!-- title -->
		<div class="slide-up animate-on-scroll flex flex-col items-center gap-2 text-center" use:inView>
			<h1 class="text-4xl font-bold text-[#333333]">Our Best Menu’s</h1>
			<p class="text-lg text-[#333333]/70">Deretan Menu Kami yang Paling Recommended!</p>
		</div>
		<!-- menu carousel -->
		<div class="fade-in animate-on-scroll w-full" use:inView={{ threshold: 0.2 }}>
			<MenuCarousel autoplay={true} autoplayDelay={3000}>
				{#each cardMenus as menu}
					<MenuCard
						name={menu.name}
						image={menu.image}
						price={menu.price}
						description={menu.description}
					/>
				{/each}
			</MenuCarousel>
		</div>
		<!-- button outline  -->
		<button
			class="btn-outline scale-in animate-on-scroll mt-2 cursor-pointer border-2 border-[#592602] bg-transparent px-16 py-2.5 font-semibold text-[#592602] transition-all duration-300"
			use:inView
		>
			Menu Lainnya
		</button>
	</div>
</section>
