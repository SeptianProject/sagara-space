/**
 * Configuration for upload categories
 * Defines which categories support multiple file uploads (list) vs single file (single)
 */

export type CategoryType = 'single' | 'list';

export interface CategoryConfig {
	value: string;
	label: string;
	type: CategoryType;
	description?: string;
	maxFiles?: number; // Only for list type
}

export const CATEGORY_CONFIGS: CategoryConfig[] = [
	{
		value: 'gallery',
		label: 'Gallery',
		type: 'list',
		description: 'Multiple images for gallery section',
		maxFiles: 10
	},
	{
		value: 'menu',
		label: 'Menu',
		type: 'list',
		description: 'Multiple menu item images',
		maxFiles: 20
	},
	{
		value: 'hero',
		label: 'Hero',
		type: 'single',
		description: 'Hero section background image'
	},
	{
		value: 'about',
		label: 'About',
		type: 'single',
		description: 'About section image'
	},
	{
		value: 'logo',
		label: 'Logo',
		type: 'single',
		description: 'Logo image'
	},
	{
		value: 'backgrounds',
		label: 'Backgrounds',
		type: 'list',
		description: 'Background image'
	},
	{
		value: 'uploads',
		label: 'Other',
		type: 'single',
		description: 'Other uploads'
	}
];

// Helper functions
export function getCategoryConfig(categoryValue: string): CategoryConfig | undefined {
	return CATEGORY_CONFIGS.find((cat) => cat.value === categoryValue);
}

export function isCategoryList(categoryValue: string): boolean {
	const config = getCategoryConfig(categoryValue);
	return config?.type === 'list';
}

export function getCategoryMaxFiles(categoryValue: string): number {
	const config = getCategoryConfig(categoryValue);
	return config?.maxFiles || 1;
}

export const VALID_CATEGORIES = CATEGORY_CONFIGS.map((cat) => cat.value);
