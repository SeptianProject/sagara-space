<script lang="ts">
	import { getCloudinaryUrl, getResponsiveSrcSet, type PresetKey } from '$lib/utils/cloudinary';

	// Props
	export let publicId: string; // Public ID dari Cloudinary (e.g., "rihat/about/coffee.png")
	export let alt: string = '';
	export let preset: PresetKey = 'auto';
	export let responsive: boolean = false;
	export let className: string = '';
	export let loading: 'lazy' | 'eager' = 'lazy';

	// Generate URLs
	$: src = getCloudinaryUrl(publicId, preset);
	$: srcset = responsive ? getResponsiveSrcSet(publicId) : undefined;
</script>

<img
	{src}
	{srcset}
	sizes={responsive ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined}
	{alt}
	{loading}
	class={className}
	{...$$restProps}
/>
