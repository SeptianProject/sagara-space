<script>
	export let filename = '';
	export let disabled = false;
	export let originalFilename = '';

	// Extract original filename without extension
	// @ts-ignore
	$: if (originalFilename && !filename) {
		const nameWithoutExt =
			originalFilename.substring(0, originalFilename.lastIndexOf('.')) || originalFilename;
		filename = nameWithoutExt;
	}

	// Sanitize filename on input
	// @ts-ignore
	function sanitizeFilename(value) {
		// Remove special characters, keep only alphanumeric, dash, underscore
		return value.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
	}

	// @ts-ignore
	function handleInput(e) {
		filename = sanitizeFilename(e.target.value);
	}
</script>

<div class="mb-5">
	<label for="filename" class="mb-2 block text-sm font-semibold text-gray-900">
		Nama File (Opsional)
	</label>
	<input
		id="filename"
		type="text"
		value={filename}
		on:input={handleInput}
		placeholder="Kosongkan untuk nama otomatis"
		class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
		{disabled}
	/>
</div>
