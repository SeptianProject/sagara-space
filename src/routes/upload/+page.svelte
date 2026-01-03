<script>
	// @ts-nocheck
	import CategorySelector from '$lib/components/upload/CategorySelector.svelte';
	import FileUploadArea from '$lib/components/upload/FileUploadArea.svelte';
	import FolderPreview from '$lib/components/upload/FolderPreview.svelte';
	import PrefixInput from '$lib/components/upload/PrefixInput.svelte';
	import UploadHeader from '$lib/components/upload/UploadHeader.svelte';
	import UploadResults from '$lib/components/upload/UploadResults.svelte';

	let file;
	let prefix = 'rihat';
	let category = 'gallery';
	let uploading = false;
	let message = '';
	let uploadedUrl = '';
	let uploadedPublicId = '';

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
		<UploadHeader />

		<PrefixInput bind:prefix disabled={uploading} />

		<CategorySelector bind:category disabled={uploading} />

		<FolderPreview {prefix} {category} />

		<FileUploadArea bind:file disabled={uploading} onUpload={upload} />

		<UploadResults bind:message {uploadedUrl} {uploadedPublicId} />
	</div>
</div>
