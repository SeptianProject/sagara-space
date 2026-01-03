<script>
	// @ts-nocheck

	let file;
	let category = 'gallery';
	let uploading = false;
	let message = '';
	let uploadedUrl = '';
	let uploadedPublicId = '';
	let fileInputElement;
	let isDragging = false;

	const categories = [
		{ value: 'gallery', label: '🖼️ Gallery', icon: '🖼️' },
		{ value: 'menu', label: '🍽️ Menu', icon: '🍽️' },
		{ value: 'hero', label: '🌟 Hero/Banner', icon: '🌟' },
		{ value: 'about', label: 'ℹ️ About/Info', icon: 'ℹ️' },
		{ value: 'logos', label: '🎨 Logos', icon: '🎨' },
		{ value: 'backgrounds', label: '🎭 Backgrounds', icon: '🎭' },
		{ value: 'uploads', label: '📁 Lainnya', icon: '📁' }
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
		message = '✓ Copied to clipboard!';
		setTimeout(() => {
			if (message === '✓ Copied to clipboard!') message = '';
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
				message = `✓ Upload berhasil ke folder ${data.category}!`;
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

<div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-4 md:p-8">
	<div class="mx-auto max-w-3xl">
		<!-- Header -->
		<div class="mb-10 text-center">
			<div class="mb-2 animate-bounce text-5xl">☁️</div>
			<h1 class="mb-2 text-4xl font-bold text-white drop-shadow-lg">Upload to Cloudinary</h1>
			<p class="text-white/90">Upload dan kelola gambar dengan mudah</p>
		</div>

		<!-- Category Selector -->
		<div class="mb-4 grid grid-cols-4 gap-3 sm:grid-cols-7">
			{#each categories as cat}
				<button
					class="flex flex-col items-center gap-2 rounded-xl border-2 bg-white p-3 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 {category ===
					cat.value
						? 'border-white bg-gradient-to-br from-indigo-500 to-purple-600 [&>*]:brightness-0 [&>*]:invert'
						: 'border-transparent'}"
					on:click={() => (category = cat.value)}
					disabled={uploading}
				>
					<span class="text-2xl">{cat.icon}</span>
					<span class="text-xs font-medium text-gray-600"
						>{cat.label.split(' ')[1] || cat.label}</span
					>
				</button>
			{/each}
		</div>

		<div
			class="mb-6 flex items-center gap-2 rounded-lg bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm"
		>
			<span class="text-xl">📂</span>
			<span class="font-mono text-sm font-medium text-gray-600">rihat/{category}/</span>
		</div>

		<!-- File Upload Area -->
		<div
			class="mb-6 cursor-pointer rounded-2xl border-3 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:bg-gray-50 {isDragging
				? 'scale-105 border-indigo-500 bg-purple-50'
				: file
					? 'border-solid border-green-500 bg-green-50'
					: 'border-dashed border-gray-300 hover:border-indigo-500'}"
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
					<div class="mb-4 text-5xl">📤</div>
					<p class="mb-2 text-lg font-semibold text-gray-900">Drag & drop gambar di sini</p>
					<p class="mb-4 text-sm text-gray-500">atau klik untuk memilih file</p>
					<span class="inline-block rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-600"
						>PNG, JPG, GIF, WebP • Max 10MB</span
					>
				</div>
			{:else}
				<div class="flex items-center gap-4 rounded-lg bg-white p-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-2xl text-white"
					>
						✓
					</div>
					<div class="flex-1 text-left">
						<p class="truncate font-semibold text-gray-900">{file.name}</p>
						<p class="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
					</div>
					<button
						class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600 transition-all hover:scale-110 hover:bg-red-200"
						on:click|stopPropagation={() => (file = null)}
						disabled={uploading}
					>
						×
					</button>
				</div>
			{/if}
		</div>

		<!-- Upload Button -->
		<button
			class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
			on:click={upload}
			disabled={uploading || !file}
		>
			{#if uploading}
				<span class="h-5 w-5 animate-spin rounded-full border-3 border-white/30 border-t-white"
				></span>
				<span>Uploading...</span>
			{:else}
				<span>Upload Image</span>
			{/if}
		</button>

		<!-- Message -->
		{#if message}
			<div
				class="animate-slideIn mt-6 rounded-xl px-5 py-4 font-medium shadow-lg {message.includes(
					'gagal'
				) || message.includes('kesalahan')
					? 'border-l-4 border-red-600 bg-white text-red-600'
					: 'border-l-4 border-green-600 bg-white text-green-600'}"
			>
				{message}
			</div>
		{/if}

		<!-- Result -->
		{#if uploadedUrl}
			<div class="animate-fadeIn mt-8 overflow-hidden rounded-2xl bg-white shadow-lg">
				<div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6 text-white">
					<h3 class="text-2xl font-semibold">✨ Upload Successful</h3>
				</div>

				<div class="bg-gray-50 p-6">
					<img src={uploadedUrl} alt="Uploaded" class="w-full rounded-xl shadow-md" />
				</div>

				<div class="space-y-4 p-6">
					<div>
						<span class="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
							>Image URL</span
						>
						<div class="flex gap-2">
							<input
								type="text"
								value={uploadedUrl}
								readonly
								class="flex-1 rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-700"
							/>
							<button
								class="rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2 text-lg transition-all hover:scale-105 hover:bg-gray-200 active:scale-95"
								on:click={() => copyToClipboard(uploadedUrl)}
							>
								📋
							</button>
						</div>
					</div>

					<div>
						<span class="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
							>Public ID</span
						>
						<div class="flex gap-2">
							<input
								type="text"
								value={uploadedPublicId}
								readonly
								class="flex-1 rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-gray-700"
							/>
							<button
								class="rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2 text-lg transition-all hover:scale-105 hover:bg-gray-200 active:scale-95"
								on:click={() => copyToClipboard(uploadedPublicId)}
							>
								📋
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-slideIn {
		animation: slideIn 0.3s ease-out;
	}

	.animate-fadeIn {
		animation: fadeIn 0.5s ease-out;
	}
</style>
