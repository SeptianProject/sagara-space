<script>
	// @ts-nocheck

	// @ts-ignore
	export let file = null;
	export let disabled = false;
	export let onUpload = () => {};

	// @ts-ignore
	/**
	 * @type {HTMLInputElement}
	 */
	let fileInputElement;
	// @ts-ignore
	let isDragging = false;

	// @ts-ignore
	function handleDragOver(e) {
		e.preventDefault();
		isDragging = true;
	}

	// @ts-ignore
	function handleDragLeave(e) {
		e.preventDefault();
		isDragging = false;
	}

	// @ts-ignore
	function handleDrop(e) {
		e.preventDefault();
		isDragging = false;
		const droppedFile = e.dataTransfer?.files[0];
		if (droppedFile && droppedFile.type.startsWith('image/')) {
			file = droppedFile;
		}
	}
</script>

<div class="mb-5">
	<!-- File Upload Area -->
	<div
		class="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50 {disabled
			? 'pointer-events-none opacity-50'
			: ''}"
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:drop={handleDrop}
		role="button"
		tabindex="0"
		on:click={() => fileInputElement?.click()}
		on:keydown={(e) => e.key === 'Enter' && fileInputElement?.click()}
	>
		<input
			bind:this={fileInputElement}
			type="file"
			accept="image/*"
			on:change={(e) => (file = e.target.files[0])}
			{disabled}
			hidden
		/>

		{#if !file}
			<div class="pointer-events-none">
				<svg
					class="mx-auto mb-4 h-12 w-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
					></path>
				</svg>
				<p class="mb-2 text-base font-semibold text-gray-900">Drag & drop gambar di sini</p>
				<p class="mb-4 text-sm text-gray-600">atau klik untuk memilih file</p>
				<span class="inline-block rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-600"
					>PNG, JPG, GIF, WebP • Max 10MB</span
				>
			</div>
		{:else}
			<div class="flex items-center gap-4 rounded-lg bg-white p-4">
				<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500">
					<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
						></path>
					</svg>
				</div>
				<div class="flex-1 text-left">
					<p class="truncate font-semibold text-gray-900">{file.name}</p>
					<p class="text-sm text-gray-600">
						{(file.size / 1024 / 1024).toFixed(2)} MB
					</p>
				</div>
				<button
					title="button"
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 transition-all hover:scale-110 hover:bg-red-200"
					on:click|stopPropagation={() => (file = null)}
					{disabled}
				>
					<svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
			</div>
		{/if}
	</div>

	<!-- Upload Button -->
	<button
		class="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
		on:click={onUpload}
		disabled={disabled || !file}
	>
		{#if disabled}
			<span class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
			></span>
			<span>Uploading...</span>
		{:else}
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				></path>
			</svg>
			<span>Upload Image</span>
		{/if}
	</button>
</div>
