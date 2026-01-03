<script>
	// @ts-nocheck
	import { isCategoryList } from '$lib/config/categories';
	import { getCloudinaryUrl, extractPublicId } from '$lib/utils/cloudinary';
	import CategorySelector from '$lib/components/upload/CategorySelector.svelte';
	import FileUploadArea from '$lib/components/upload/FileUploadArea.svelte';
	import FilenameInput from '$lib/components/upload/FilenameInput.svelte';
	import FolderPreview from '$lib/components/upload/FolderPreview.svelte';
	import PrefixInput from '$lib/components/upload/PrefixInput.svelte';
	import UploadHeader from '$lib/components/upload/UploadHeader.svelte';
	import UploadResults from '$lib/components/upload/UploadResults.svelte';

	let files = [];
	let prefix = 'rihat';
	let category = 'gallery';
	let filename = '';
	let uploading = false;
	let message = '';
	let uploadedUrls = [];
	let uploadedPublicIds = [];
	let uploadedOptimizedUrls = []; // New: for optimized URLs

	$: isListCategory = isCategoryList(category);

	$: if (category) {
		files = [];
		message = '';
		uploadedUrls = [];
		uploadedPublicIds = [];
		uploadedOptimizedUrls = [];
	}

	async function upload() {
		if (!files || files.length === 0) {
			message = 'Pilih file terlebih dahulu';
			return;
		}

		uploading = true;
		message = '';
		uploadedUrls = [];
		uploadedPublicIds = [];
		uploadedOptimizedUrls = [];

		try {
			const results = [];

			// Upload each file
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const form = new FormData();
				form.append('file', file);
				form.append('prefix', prefix);
				form.append('category', category);

				// For list categories, use auto-numbering; for single, use category name
				if (isListCategory) {
					// The server will handle numbering based on existing files
					form.append('fileIndex', (i + 1).toString());
				} else {
					// For single categories, use the category name as filename
					form.append('filename', filename || category);
				}

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
					break;
				}

				if (data.success) {
					results.push(data);
					uploadedUrls.push(data.url);
					uploadedPublicIds.push(data.public_id);

					// Generate optimized URL using utility function
					const publicId = extractPublicId(data.url) || data.public_id;
					const optimizedUrl = getCloudinaryUrl(publicId, 'gallery');
					uploadedOptimizedUrls.push(optimizedUrl);
				}
			}

			if (results.length > 0) {
				message = `Upload berhasil: ${results.length} file ke folder ${category}`;
				console.log('Uploaded:', results);

				// Reset form
				files = [];
				filename = '';
			}
		} catch (error) {
			console.error('Upload error:', error);
			message = 'Terjadi kesalahan saat upload: ' + error.message;
		} finally {
			uploading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center bg-gray-50 p-4 md:p-8">
	<div class="mx-auto w-full max-w-6xl">
		<UploadHeader />

		<div class="grid gap-6 md:grid-cols-2">
			<!-- Left Column -->
			<div class="space-y-0">
				<PrefixInput bind:prefix disabled={uploading} />
				<CategorySelector bind:category disabled={uploading} />
				<FilenameInput bind:filename {category} disabled={uploading} />
				<FolderPreview {prefix} {category} />
			</div>

			<!-- Right Column -->
			<div>
				<FileUploadArea bind:files {category} disabled={uploading} onUpload={upload} />
			</div>
		</div>

		<UploadResults
			bind:message
			uploadedUrl={uploadedUrls[0] || ''}
			uploadedPublicId={uploadedPublicIds[0] || ''}
		/>

		<!-- Show all uploaded URLs for list categories -->
		{#if uploadedUrls.length > 1}
			<div class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
				<h3 class="mb-2 font-semibold text-green-900">Uploaded Files ({uploadedUrls.length}):</h3>
				<div class="space-y-1">
					{#each uploadedUrls as url, index}
						<div class="flex items-center gap-2 text-sm">
							<span class="font-mono text-green-700">{index + 1}.</span>
							<a href={url} target="_blank" class="truncate text-blue-600 hover:underline">{url}</a>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
