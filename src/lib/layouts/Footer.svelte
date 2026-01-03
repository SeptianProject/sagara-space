<script>
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

<footer class="mt-60 w-full space-y-10 border-t border-black/15 py-10">
	<div class="mx-auto flex w-[90%] gap-40 border-b border-[#D9D9D9] py-10">
		<div class="flex w-80 flex-col gap-4">
			<h1 class="text-2xl font-bold text-[#333333]">Rihat Toko Kopi</h1>
			<p class="text-[#333333]/70">
				400 University Drive Suite 200 Coral Gables,<br /> FL 33134 USA
			</p>
		</div>
		<div class="flex flex-col gap-10">
			<h4 class="font-medium text-[#9F9F9F]">Links</h4>
			{#each linkMenus as item}
				<a href={item.href} class="font-medium">{item.name}</a>
			{/each}
		</div>
		<div class="flex flex-col gap-10">
			<h4 class="font-medium text-[#9F9F9F]">Help</h4>
			{#each helpMenus as item}
				<a href={item.href} class="font-medium">{item.name}</a>
			{/each}
		</div>
	</div>
	<p class="mx-auto w-[90%] text-[#333333]">{year} sagara. All rights reverved</p>
</footer>
