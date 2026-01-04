<script>
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';

	const logo = getCloudinaryUrl('rihat/logo/logo.webp', 'thumbnail');

	const navItems = [
		{ name: 'Home', href: '#' },
		{ name: 'About', href: '#about' },
		{ name: 'Services', href: '#services' },
		{ name: 'Contact', href: '#contact' }
	];
</script>

<nav class="relative z-10 flex w-full items-center justify-end gap-14 px-20 pt-16">
	<ul class="flex gap-14">
		{#each navItems as item}
			<li>
				<a href={item.href} class="text-white transition-all duration-300 hover:underline">
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
	<img src={logo} alt="logo" class="size-16 object-cover" />
</nav>
