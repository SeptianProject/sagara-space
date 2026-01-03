<script>
	import { CATEGORY_CONFIGS } from '$lib/config/categories';

	export let category = 'gallery';
	export let disabled = false;

	const categories = CATEGORY_CONFIGS;
</script>

<div class="mb-5">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="mb-2 block text-sm font-semibold text-gray-900">Pilih Kategori</label>
	<div class="flex flex-wrap gap-2">
		{#each categories as cat}
			<button
				class="rounded-lg border px-4 py-2 text-sm font-medium transition-all {category ===
				cat.value
					? 'border-blue-600 bg-blue-600 text-white'
					: 'border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50'} disabled:cursor-not-allowed disabled:opacity-50"
				on:click={() => (category = cat.value)}
				{disabled}
				title={cat.description || ''}
			>
				{cat.label}
				{#if cat.type === 'list'}
					<span class="ml-1 text-xs opacity-75">(Multiple)</span>
				{/if}
			</button>
		{/each}
	</div>
</div>
