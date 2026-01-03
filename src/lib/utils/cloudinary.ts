/**
 * Cloudinary utilities for image optimization and delivery
 */

// Cloudinary configuration
const CLOUD_NAME = 'dzekvtj80'; // Your cloud name from the URL

/**
 * Transformation presets for different use cases
 */
export const CloudinaryPresets = {
	// Auto-optimized with quality and format detection
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

/**
 * Generate Cloudinary URL with transformations
 * @param publicId - The public_id from Cloudinary (e.g., "rihat/about/coffee")
 * @param transformation - Preset key or custom transformation string
 * @returns Optimized Cloudinary URL
 *
 * @example
 * // Using preset
 * getCloudinaryUrl('rihat/about/coffee.png', 'gallery')
 *
 * // Using custom transformation
 * getCloudinaryUrl('rihat/about/coffee.png', 'w_1000,h_800,c_scale,q_auto')
 *
 * // No transformation (just auto-optimize)
 * getCloudinaryUrl('rihat/about/coffee.png')
 */
export function getCloudinaryUrl(publicId: string, transformation?: PresetKey | string): string {
	// Remove file extension if present in publicId (Cloudinary handles this)
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');

	const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

	// Use preset or custom transformation or default auto-optimization
	const transforms = transformation
		? transformation in CloudinaryPresets
			? CloudinaryPresets[transformation as PresetKey]
			: transformation
		: CloudinaryPresets.auto;

	return `${baseUrl}/${transforms}/${cleanPublicId}`;
}

/**
 * Generate Cloudinary URL with multiple transformations (chained)
 * @param publicId - The public_id from Cloudinary
 * @param transformations - Array of transformation strings
 * @returns Cloudinary URL with chained transformations
 *
 * @example
 * getCloudinaryUrlChained('rihat/gallery/image.jpg', [
 *   'w_1000,c_scale',
 *   'q_auto',
 *   'f_auto'
 * ])
 */
export function getCloudinaryUrlChained(publicId: string, transformations: string[]): string {
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');
	const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
	const transforms = transformations.join('/');

	return `${baseUrl}/${transforms}/${cleanPublicId}`;
}

/**
 * Extract public_id from Cloudinary URL
 * @param url - Full Cloudinary URL
 * @returns Public ID or null if invalid
 *
 * @example
 * extractPublicId('https://res.cloudinary.com/dzekvtj80/image/upload/v1767482812/rihat/about/coffee.png')
 * // Returns: 'rihat/about/coffee.png'
 */
export function extractPublicId(url: string): string | null {
	try {
		const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
		return match ? match[1] : null;
	} catch {
		return null;
	}
}

/**
 * Generate srcset for responsive images
 * @param publicId - The public_id from Cloudinary
 * @param widths - Array of widths for responsive images
 * @param transformation - Additional transformations (optional)
 * @returns srcset string
 *
 * @example
 * getResponsiveSrcSet('rihat/gallery/image.jpg', [400, 800, 1200])
 */
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

/**
 * Generate Cloudinary video URL
 * @param publicId - The public_id from Cloudinary
 * @param transformation - Transformation string (optional)
 * @returns Cloudinary video URL
 */
export function getCloudinaryVideoUrl(publicId: string, transformation?: string): string {
	const cleanPublicId = publicId.replace(/\.[^/.]+$/, '');
	const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;
	const transforms = transformation || 'q_auto,f_auto';

	return `${baseUrl}/${transforms}/${cleanPublicId}`;
}
