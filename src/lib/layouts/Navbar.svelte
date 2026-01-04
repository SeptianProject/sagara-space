<script>
	import { fade, fly } from 'svelte/transition';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';

	const logo = getCloudinaryUrl('rihat/logo/logo.webp', 'thumbnail');

	const navItems = [
		{ name: 'Home', href: '#' },
		{ name: 'About', href: '#about' },
		{ name: 'Services', href: '#services' },
		{ name: 'Contact', href: '#contact' }
	];
</script>

<nav
	class="relative z-10 flex w-full items-center justify-end gap-14 px-20 pt-16"
	in:fade={{ duration: 600, delay: 200 }}
>
	<ul class="flex gap-14">
		{#each navItems as item, i}
			<li in:fly={{ y: -20, duration: 500, delay: 300 + i * 100 }}>
				<a href={item.href} class="nav-link text-white transition-all duration-300">
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
	<img
		src={logo}
		alt="logo"
		class="logo-hover size-16 cursor-pointer object-cover"
		in:fly={{ x: 20, duration: 500, delay: 700 }}
	/>
</nav>
