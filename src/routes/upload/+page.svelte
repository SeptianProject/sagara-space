<script>
	// @ts-nocheck

	let file;
	let prefix = 'rihat';
	let category = 'gallery';
	let uploading = false;
	let message = '';
	let uploadedUrl = '';
	let uploadedPublicId = '';
	let fileInputElement;
	let isDragging = false;

	const categories = [
		{ value: 'gallery', label: 'Gallery' },
		{ value: 'menu', label: 'Menu' },
		{ value: 'hero', label: 'Hero' },
		{ value: 'about', label: 'About' },
		{ value: 'logos', label: 'Logos' },
		{ value: 'backgrounds', label: 'Backgrounds' },
		{ value: 'uploads', label: 'Other' }
	];

	function handleDragOver(e) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(e) {
		e.preventDefault();
		isDragging = false;
	}

	function handleDrop(e) {
		e.preventDefault();
		isDragging = false;
		const droppedFile = e.dataTransfer?.files[0];
		if (droppedFile && droppedFile.type.startsWith('image/')) {
			file = droppedFile;
		}
	}

	function copyToClipboard(text) {
		navigator.clipboard.writeText(text);
		message = 'Copied to clipboard!';
		setTimeout(() => {
			if (message === 'Copied to clipboard!') message = '';
		}, 2000);
	}

	async function upload() {
		if (!file) {
			message = 'Pilih file terlebih dahulu';
			return;
		}

		uploading = true;
		message = '';
		uploadedUrl = '';
		uploadedPublicId = '';

		try {
			const form = new FormData();
			form.append('file', file);
			form.append('prefix', prefix);
			form.append('category', category);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: form
			});

			const data = await response.json();

			if (!response.ok) {
				message = data.error || 'Upload gagal';
				if (data.details) {
					message += `: ${data.details}`;
				}
				return;
			}

			if (data.success) {
				message = `Upload berhasil ke folder ${data.category}`;
				uploadedUrl = data.url;
				uploadedPublicId = data.public_id;
				console.log('Uploaded:', data);

				// Reset form
				file = null;
			}
		} catch (error) {
			console.error('Upload error:', error);
			message = 'Terjadi kesalahan saat upload: ' + error.message;
		} finally {
			uploading = false;
		}
	}
</script>

<div class="min-h-screen bg-gray-50 p-4 md:p-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-gray-900">Image Upload</h1>
			<p class="text-gray-600">Upload dan kelola gambar untuk website</p>
		</div>

		<!-- Prefix Input -->
		<div class="mb-6">
			<label for="prefix" class="mb-2 block text-sm font-semibold text-gray-900"
				>Folder Prefix</label
			>
			<input
				id="prefix"
				type="text"
				bind:value={prefix}
				placeholder="e.g., rihat, yumgap, project-name"
				class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
				disabled={uploading}
			/>
			<p class="mt-1.5 text-xs text-gray-500">
				Prefix untuk folder penyimpanan di Cloudinary (tanpa spasi atau karakter khusus)
			</p>
		</div>
		<!-- Category Selector -->
		<div class="mb-6">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="mb-3 block text-sm font-semibold text-gray-900">Pilih Kategori</label>
			<div class="flex flex-wrap gap-2">
				{#each categories as cat}
					<button
						class="rounded-lg border px-4 py-2 text-sm font-medium transition-all {category ===
						cat.value
							? 'border-blue-600 bg-blue-600 text-white'
							: 'border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50'} disabled:cursor-not-allowed disabled:opacity-50"
						on:click={() => (category = cat.value)}
						disabled={uploading}
					>
						{cat.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="mb-6 rounded-lg border border-gray-200 bg-white px-4 py-3">
			<div class="flex items-center gap-2 text-sm">
				<svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
					></path>
				</svg>
				<span class="font-mono text-gray-600">{prefix || 'folder'}/{category}/</span>
			</div>
		</div>

		<!-- File Upload Area -->
		<div
			class="relative mb-6 cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50 {uploading
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
				disabled={uploading}
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
						title="button"
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 transition-all hover:scale-110 hover:bg-red-200"
						on:click|stopPropagation={() => (file = null)}
						disabled={uploading}
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
			class="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
			on:click={upload}
			disabled={uploading || !file}
		>
			{#if uploading}
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

		<!-- Message -->
		{#if message}
			<div
				class="mt-6 rounded-lg border px-4 py-3 text-sm {message.includes('gagal') ||
				message.includes('kesalahan')
					? 'border-red-200 bg-red-50 text-red-800'
					: 'border-green-200 bg-green-50 text-green-800'}"
			>
				{message}
			</div>
		{/if}

		<!-- Result -->
		{#if uploadedUrl}
			<div class="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-200 bg-blue-600 px-6 py-4">
					<h3 class="text-lg font-semibold text-white">Upload Successful</h3>
				</div>

				<div class="p-6">
					<img
						src={uploadedUrl}
						alt="Uploaded"
						class="w-full rounded-lg border border-gray-200 object-cover"
					/>
				</div>

				<div class="space-y-4 border-t border-gray-200 p-6">
					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
							>Image URL</label
						>
						<div class="flex gap-2">
							<input
								type="text"
								value={uploadedUrl}
								readonly
								class="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-700 focus:outline-none"
							/>
							<button
								class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
								on:click={() => copyToClipboard(uploadedUrl)}
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									></path>
								</svg>
								Copy
							</button>
						</div>
					</div>

					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
							>Public ID</label
						>
						<div class="flex gap-2">
							<input
								type="text"
								value={uploadedPublicId}
								readonly
								class="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-700 focus:outline-none"
							/>
							<button
								class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
								on:click={() => copyToClipboard(uploadedPublicId)}
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
									></path>
								</svg>
								Copy
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Keep minimal animations for smooth transitions */
</style>
