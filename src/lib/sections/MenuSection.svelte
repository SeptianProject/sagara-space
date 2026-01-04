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

<section
	id="menu"
	class="mt-20 space-y-12 px-4 sm:mt-32 sm:space-y-16 sm:px-8 md:mt-40 md:space-y-20 md:px-20"
>
	<!-- text description / image -->
	<div class="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-20">
		<!-- text description -->
		<div
			class="slide-right animate-on-scroll flex w-full flex-col items-start gap-3 md:w-1/2 md:gap-4"
			use:inView
		>
			<h1 class="text-2xl font-bold text-[#333333] sm:text-3xl md:text-4xl">
				Temukan Cita Rasa Kopi Terbaik.
			</h1>
			<p class="text-base text-[#333333]/70 sm:text-lg">
				Temukan ruang untuk bernapas di tengah hiruk pikuk harimu. Kami hadir untuk menyajikan lebih
				dari sekadar minuman, sebuah pelukan hangat dalam cangkir.
			</p>
			<!-- button outline -->
			<a
				href="#menu-list"
				class="btn-outline mt-2 w-full cursor-pointer rounded-md border-2 border-[#592602] bg-transparent px-8 py-2.5 text-center font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-16"
			>
				Lihat Menu
			</a>
		</div>
		<!-- image -->
		<div class="slide-left animate-on-scroll w-full md:w-1/2" use:inView={{ threshold: 0.3 }}>
			<img src={coffeeImage} alt="" class="h-64 w-full rounded-xl object-cover sm:h-80 md:h-full" />
		</div>
	</div>

	<!-- best menu's -->
	<div
		id="menu-list"
		class="mt-20 flex flex-col items-center justify-center gap-6 sm:mt-32 sm:gap-8 md:mt-40"
	>
		<!-- title -->
		<div
			class="slide-up animate-on-scroll flex flex-col items-center gap-1 text-center sm:gap-2"
			use:inView
		>
			<h1 class="text-2xl font-bold text-[#333333] sm:text-3xl md:text-4xl">Our Best Menu's</h1>
			<p class="text-base text-[#333333]/70 sm:text-lg">
				Deretan Menu Kami yang Paling Recommended!
			</p>
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
		<a
			href="#location"
			class="btn-outline scale-in animate-on-scroll mt-2 w-full cursor-pointer border-2 border-[#592602] bg-transparent px-8 py-2.5 text-center font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-16"
			use:inView
		>
			Menu Lainnya
		</a>
	</div>
</section>
