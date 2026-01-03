<script>
	export let prefix = '';
	export let category = '';
</script>

<div class="mb-5 rounded-lg border border-gray-200 bg-white px-4 py-3">
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
