<script>
	// @ts-nocheck
	import { isCategoryList, getCategoryMaxFiles } from '$lib/config/categories';

	// @ts-ignore
	export let files = [];
	export let category = 'gallery';
	export let disabled = false;
	export let onUpload = () => {};

	// @ts-ignore
	/**
	 * @type {HTMLInputElement}
	 */
	let fileInputElement;
	// @ts-ignore
	let isDragging = false;

	$: isListCategory = isCategoryList(category);
	$: maxFiles = getCategoryMaxFiles(category);

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
		const droppedFiles = Array.from(e.dataTransfer?.files || []);
		const imageFiles = droppedFiles.filter((f) => f.type.startsWith('image/'));

		if (isListCategory) {
			// Add files to list (up to max)
			const remaining = maxFiles - files.length;
			files = [...files, ...imageFiles.slice(0, remaining)];
		} else {
			// Single file only
			if (imageFiles.length > 0) {
				files = [imageFiles[0]];
			}
		}
	}

	// @ts-ignore
	function handleFileSelect(e) {
		const selectedFiles = Array.from(e.target?.files || []);
		if (isListCategory) {
			// Add files to list (up to max)
			const remaining = maxFiles - files.length;
			files = [...files, ...selectedFiles.slice(0, remaining)];
		} else {
			// Single file only
			files = selectedFiles.slice(0, 1);
		}
	}

	// @ts-ignore
	function removeFile(index) {
		files = files.filter((_, i) => i !== index);
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
			multiple={isListCategory}
			on:change={handleFileSelect}
			{disabled}
			hidden
		/>

		{#if files.length === 0}
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
				<p class="mb-2 text-base font-semibold text-gray-900">
					Drag & drop gambar {isListCategory ? '(multiple)' : ''} di sini
				</p>
				<p class="mb-4 text-sm text-gray-600">atau klik untuk memilih file</p>
				<span class="inline-block rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-600">
					PNG, JPG, GIF, WebP • Max 10MB
					{#if isListCategory}
						<br />Maks. {maxFiles} file
					{/if}
				</span>
			</div>
		{:else}
			<div class="space-y-2">
				{#each files as file, index}
					<div class="flex items-center gap-4 rounded-lg bg-white p-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500"
						>
							<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
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
							title="Remove file"
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 transition-all hover:scale-110 hover:bg-red-200"
							on:click|stopPropagation={() => removeFile(index)}
							{disabled}
						>
							<svg
								class="h-5 w-5 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</button>
					</div>
				{/each}

				{#if isListCategory && files.length < maxFiles}
					<button
						class="w-full rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition-all hover:border-blue-500 hover:bg-blue-100"
						on:click|stopPropagation={() => fileInputElement?.click()}
					>
						+ Tambah file lagi ({files.length}/{maxFiles})
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Upload Button -->
	<button
		class="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
		on:click={onUpload}
		disabled={disabled || files.length === 0}
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
			<span>Upload {isListCategory ? `${files.length} Images` : 'Image'}</span>
		{/if}
	</button>
</div>
