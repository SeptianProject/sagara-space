<script>
	import { isCategoryList } from '$lib/config/categories';

	export let filename = '';
	export let disabled = false;
	export let category = 'gallery';

	$: isListCategory = isCategoryList(category);

	// Auto-set filename for single categories
	$: if (!isListCategory && category) {
		filename = category;
	}

	// Clear filename for list categories (will be auto-numbered)
	$: if (isListCategory) {
		filename = '';
	}

	// Sanitize filename on input (only for single categories that allow custom names)
	// @ts-ignore
	function sanitizeFilename(value) {
		// Remove special characters, keep only alphanumeric, dash, underscore
		return value.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
	}

	// @ts-ignore
	function handleInput(e) {
		if (!isListCategory) {
			filename = sanitizeFilename(e.target.value);
		}
	}
</script>

<div class="mb-5">
	<label for="filename" class="mb-2 block text-sm font-semibold text-gray-900">
		Nama File {isListCategory ? '(Auto-generated)' : ''}
	</label>

	{#if isListCategory}
		<div
			class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
		>
			File akan dinamai otomatis: {category}-1, {category}-2, ...
		</div>
	{:else}
		<input
			id="filename"
			type="text"
			value={filename}
			on:input={handleInput}
			placeholder="Nama file otomatis sesuai kategori"
			class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
			{disabled}
		/>
		<p class="mt-1 text-xs text-gray-500">
			File akan dinamai: <span class="font-mono font-semibold">{filename || category}</span>
		</p>
	{/if}
</div>
