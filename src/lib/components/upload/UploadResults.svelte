<script>
	// @ts-ignore
	import { getCloudinaryUrl, extractPublicId, CloudinaryPresets } from '$lib/utils/cloudinary';

	export let message = '';
	export let uploadedUrl = '';
	export let uploadedPublicId = '';

	let showModal = false;
	let lastUploadedUrl = '';
	let selectedPreset = 'gallery';

	// Generate optimized URLs for different presets
	$: optimizedUrls = uploadedPublicId
		? {
				thumbnail: getCloudinaryUrl(uploadedPublicId, 'thumbnail'),
				card: getCloudinaryUrl(uploadedPublicId, 'card'),
				gallery: getCloudinaryUrl(uploadedPublicId, 'gallery'),
				hero: getCloudinaryUrl(uploadedPublicId, 'hero'),
				menu: getCloudinaryUrl(uploadedPublicId, 'menu'),
				fullOptimized: getCloudinaryUrl(uploadedPublicId, 'fullOptimized'),
				auto: getCloudinaryUrl(uploadedPublicId, 'auto')
			}
		: {};

// @ts-ignore
		$: currentOptimizedUrl = optimizedUrls[selectedPreset] || uploadedUrl;

	// @ts-ignore
	function copyToClipboard(text) {
		navigator.clipboard.writeText(text);
		message = 'Copied to clipboard!';
		setTimeout(() => {
			if (message === 'Copied to clipboard!') message = '';
		}, 2000);
	}

	function closeModal() {
		showModal = false;
	}

	function openModal() {
		showModal = true;
	}

	// Auto open modal when new upload succeeds
// @ts-ignore
		$: if (uploadedUrl && uploadedUrl !== lastUploadedUrl) {
		lastUploadedUrl = uploadedUrl;
		showModal = true;
	}
</script>

<!-- Message -->
{#if message && !uploadedUrl}
	<div
		class="mt-6 rounded-lg border px-4 py-3 text-sm {message.includes('gagal') ||
		message.includes('kesalahan')
			? 'border-red-200 bg-red-50 text-red-800'
			: 'border-green-200 bg-green-50 text-green-800'}"
	>
		{message}
	</div>
{/if}

<!-- Button to show modal again -->
{#if uploadedUrl && !showModal}
	<button
		class="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all hover:scale-110 hover:bg-blue-700 hover:shadow-xl"
		on:click={openModal}
		title="Lihat hasil upload terakhir"
	>
		<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
			></path>
		</svg>
	</button>
{/if}

<!-- Modal -->
{#if showModal && uploadedUrl}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		on:click={closeModal}
		on:keydown={(e) => e.key === 'Escape' && closeModal()}
		role="button"
		tabindex="0"
	>
		<!-- Modal Content -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
			on:click|stopPropagation
			role="dialog"
			tabindex="-1"
		>
			<!-- Header -->
			<div class="sticky top-0 z-10 border-b border-gray-200 bg-blue-600 px-6 py-4">
				<div class="flex items-center justify-between">
					<h3 class="text-xl font-bold text-white">Upload Successful</h3>
					<button
						class="flex h-8 w-8 items-center justify-center rounded-full text-white transition-all hover:bg-white/20"
						on:click={closeModal}
						aria-label="Close modal"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Image Preview -->
			<div class="flex justify-center p-6 pb-4">
				<img
					src={currentOptimizedUrl}
					alt="Uploaded"
					class="max-h-64 w-auto rounded-lg border border-gray-200 object-contain shadow-sm"
				/>
			</div>

			<!-- Preset Selector -->
			<div class="border-t border-gray-200 px-6 pt-4">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
					>Optimization Preset</label
				>
				<select
					bind:value={selectedPreset}
					class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				>
					<option value="auto">Auto (q_auto, f_auto)</option>
					<option value="thumbnail">Thumbnail (150x150)</option>
					<option value="card">Card (400x300)</option>
					<option value="gallery">Gallery (800x600)</option>
					<option value="hero">Hero (1920x1080)</option>
					<option value="menu">Menu (600x400)</option>
					<option value="fullOptimized">Full Optimized (1600px)</option>
				</select>
				<p class="mt-1 text-xs text-gray-500">
					Pilih preset untuk melihat URL yang sudah dioptimasi
				</p>
			</div>

			<!-- URL Fields -->
			<div class="space-y-4 border-t border-gray-200 p-6">
				<div>
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="mb-2 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
						>Original URL</label
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

				<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="mb-2 block text-xs font-semibold tracking-wider text-blue-700 uppercase"
						>✨ Optimized URL (Recommended)</label
					>
					<div class="flex gap-2">
						<input
							type="text"
							value={currentOptimizedUrl}
							readonly
							class="flex-1 rounded-lg border border-blue-300 bg-white px-3 py-2 font-mono text-sm text-gray-700 focus:outline-none"
						/>
						<button
							class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
							on:click={() => copyToClipboard(currentOptimizedUrl)}
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
					<p class="mt-2 text-xs text-blue-700">
						<strong>💡 Gunakan URL ini untuk performa optimal!</strong> Auto-optimized dengan format WebP,
						quality auto, dan ukuran sesuai preset.
					</p>
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

			<!-- Footer -->
			<div class="sticky bottom-0 border-t border-gray-200 bg-gray-50 px-6 py-4">
				<button
					class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
					on:click={closeModal}
				>
					Tutup
				</button>
			</div>
		</div>
	</div>
{/if}
