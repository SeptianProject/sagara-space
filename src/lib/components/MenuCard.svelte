<script lang="ts">
	interface Props {
		name: string;
		image: string;
		price: string;
		description: string;
	}

	let { name, image, price, description }: Props = $props();
</script>

<div
	class="embla__slide flex h-140 w-100 shrink-0 flex-col items-center gap-4 border border-[#2424242B] transition-shadow duration-300 hover:shadow-lg"
>
	<img src={image} alt={name} class="top-0 right-0 h-3/4 w-full object-cover" />
	<div class="px-5">
		<p class="text-lg font-bold text-[#592602]">Rp {price}</p>
		<h2 class="text-lg font-semibold text-[#333333]">{name}</h2>
		<p class="text-sm text-[#333333]/70">{description}</p>
	</div>
</div>
