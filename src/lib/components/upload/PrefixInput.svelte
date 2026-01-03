<script>
	export let prefix = '';
	export let disabled = false;
</script>

<div class="mb-6">
	<label for="prefix" class="mb-2 block text-sm font-semibold text-gray-900">Folder Prefix</label>
	<input
		id="prefix"
		type="text"
		bind:value={prefix}
		placeholder="e.g., rihat, yumgap, project-name"
		class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
		{disabled}
	/>
	<p class="mt-1.5 text-xs text-gray-500">
		Prefix untuk folder penyimpanan di Cloudinary (tanpa spasi atau karakter khusus)
	</p>
</div>
