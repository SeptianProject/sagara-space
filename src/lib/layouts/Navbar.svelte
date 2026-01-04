<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';

	const logo = getCloudinaryUrl('rihat/logo/logo.webp', 'thumbnail');

	const navItems = [
		{ name: 'Home', href: '#' },
		{ name: 'About', href: '#about' },
		{ name: 'Services', href: '#services' },
		{ name: 'Contact', href: '#contact' }
	];

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav
	class="relative z-20 flex w-full items-center justify-between gap-4 px-4 pt-8 sm:gap-8 sm:px-8 md:gap-14 md:px-20 md:pt-16"
	in:fade={{ duration: 600, delay: 200 }}
>
	<!-- Mobile Menu Button -->
	<button
		title="toggler"
		class="z-20 flex flex-col gap-1.5 md:hidden"
		onclick={toggleMobileMenu}
		in:fly={{ x: -20, duration: 500, delay: 700 }}
	>
		<span
			class="block h-0.5 w-6 bg-white transition-all duration-300"
			class:rotate-45={mobileMenuOpen}
			class:translate-y-2={mobileMenuOpen}
		></span>
		<span
			class="block h-0.5 w-6 bg-white transition-all duration-300"
			class:opacity-0={mobileMenuOpen}
		></span>
		<span
			class="block h-0.5 w-6 bg-white transition-all duration-300"
			class:-rotate-45={mobileMenuOpen}
			class:-translate-y-2={mobileMenuOpen}
		></span>
	</button>

	<!-- Desktop Menu -->
	<ul class="hidden gap-6 md:flex lg:gap-14">
		{#each navItems as item, i}
			<li in:fly={{ y: -20, duration: 500, delay: 300 + i * 100 }}>
				<a
					href={item.href}
					class="nav-link text-sm text-white transition-all duration-300 lg:text-base"
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>

	<!-- Logo -->
	<img
		src={logo}
		alt="logo"
		class="logo-hover z-20 size-12 cursor-pointer object-cover sm:size-14 md:size-16"
		in:fly={{ x: 20, duration: 500, delay: 700 }}
	/>

	<!-- Mobile Menu Overlay -->
	{#if mobileMenuOpen}
		<button
			type="button"
			class="fixed inset-0 z-10 bg-black/90 md:hidden"
			transition:fade={{ duration: 300 }}
			onclick={toggleMobileMenu}
		>
			<ul class="flex h-full flex-col items-center justify-center gap-8">
				{#each navItems as item, i}
					<li transition:fly={{ y: -20, duration: 400, delay: i * 100 }}>
						<a
							href={item.href}
							class="nav-link text-2xl text-white transition-all duration-300"
							onclick={toggleMobileMenu}
						>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</button>
	{/if}
</nav>
