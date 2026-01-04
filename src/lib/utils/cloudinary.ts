const CLOUD_NAME = 'dzekvtj80';

export const CloudinaryPresets = {
	auto: 'q_auto,f_auto',

	// Thumbnail - small preview
	thumbnail: 'w_150,h_150,c_fill,q_auto,f_auto',

	// Card/Grid - medium size for cards
	card: 'w_400,h_300,c_fill,q_auto,f_auto',

	// Gallery - larger preview
	gallery: 'w_800,h_600,c_fill,q_auto,f_auto',

	// Hero/Banner - full width
	hero: 'w_1920,h_1080,c_fill,q_auto,f_auto',

	// Menu item - optimized for menu display
	menu: 'w_600,h_400,c_fill,q_auto,f_auto',

	// Full size but optimized
	fullOptimized: 'w_1600,q_auto,f_auto',

	// Responsive - with dpr auto
	responsive: 'w_auto,dpr_auto,q_auto,f_auto'
} as const;

export type PresetKey = keyof typeof CloudinaryPresets;

export function getCloudinaryUrl(publicId: string, transformation?: PresetKey | string): string {
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');

	const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

	const transforms = transformation
		? transformation in CloudinaryPresets
			? CloudinaryPresets[transformation as PresetKey]
			: transformation
		: CloudinaryPresets.auto;

	return `${baseUrl}/${transforms}/${cleanPublicId}`;
}

export function getCloudinaryUrlChained(publicId: string, transformations: string[]): string {
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');
	const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
	const transforms = transformations.join('/');

	return `${baseUrl}/${transforms}/${cleanPublicId}`;
}

export function extractPublicId(url: string): string | null {
	try {
		const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
		return match ? match[1] : null;
	} catch {
		return null;
	}
}

export function getResponsiveSrcSet(
	publicId: string,
	widths: number[] = [400, 800, 1200, 1600],
	transformation?: string
): string {
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');
	const baseTransform = transformation ? `${transformation},` : '';

	return widths
		.map((width) => {
			const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${baseTransform}w_${width},q_auto,f_auto/${cleanPublicId}`;
			return `${url} ${width}w`;
		})
		.join(', ');
}

export function getCloudinaryVideoUrl(publicId: string, transformation?: string): string {
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');
	const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;
	const transforms = transformation || 'q_auto,f_auto';

	return `${baseUrl}/${transforms}/${cleanPublicId}`;
}
