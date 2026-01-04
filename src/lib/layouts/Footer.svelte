<script>
	import { inView } from '$lib/utils/animations';

	const linkMenus = [
		{ name: 'Home', href: '#' },
		{ name: 'Menu', href: '#' },
		{ name: 'Order', href: '#' },
		{ name: 'Customer', href: '#' }
	];

	const helpMenus = [
		{ name: 'Payment Options', href: '#' },
		{ name: 'Customer Service', href: '#' }
	];

	const year = new Date().getFullYear();
</script>

<footer
	class="mt-20 w-full space-y-6 border-t border-black/15 py-6 sm:mt-40 sm:space-y-8 sm:py-8 md:mt-60 md:space-y-10 md:py-10"
>
	<div
		class="mx-auto flex w-[90%] flex-col gap-8 border-b border-[#D9D9D9] py-6 sm:gap-12 sm:py-8 md:flex-row md:gap-40 md:py-10"
	>
		<div class="slide-up animate-on-scroll flex w-full flex-col gap-3 md:w-80 md:gap-4" use:inView>
			<h1 class="text-xl font-bold text-[#333333] sm:text-2xl">Rihat Toko Kopi</h1>
			<p class="text-sm text-[#333333]/70 sm:text-base">
				400 University Drive Suite 200 Coral Gables,<br /> FL 33134 USA
			</p>
		</div>
		<div
			class="slide-up animate-on-scroll flex flex-col gap-6 delay-100 sm:gap-8 md:gap-10"
			use:inView
		>
			<h4 class="font-medium text-[#9F9F9F]">Links</h4>
			<div class="flex flex-col gap-4 sm:gap-6 md:gap-10">
				{#each linkMenus as item}
					<a href={item.href} class="footer-link w-fit font-medium">{item.name}</a>
				{/each}
			</div>
		</div>
		<div
			class="slide-up animate-on-scroll flex flex-col gap-6 delay-200 sm:gap-8 md:gap-10"
			use:inView
		>
			<h4 class="font-medium text-[#9F9F9F]">Help</h4>
			<div class="flex flex-col gap-4 sm:gap-6 md:gap-10">
				{#each helpMenus as item}
					<a href={item.href} class="footer-link w-fit font-medium">{item.name}</a>
				{/each}
			</div>
		</div>
	</div>
	<p
		class="fade-in animate-on-scroll mx-auto w-[90%] text-center text-sm text-[#333333] sm:text-left sm:text-base"
		use:inView
	>
		{year} sagara. All rights reverved
	</p>
</footer>
