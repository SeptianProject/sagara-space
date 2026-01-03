/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from '$lib/server/cloudinary';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.formData();
		const file = data.get('file') as File;
		const prefix = (data.get('prefix') as string) || 'uploads';
		const category = (data.get('category') as string) || 'uploads';
		const customFilename = data.get('filename') as string;

		if (!file) {
			return Response.json({ error: 'File tidak ditemukan' }, { status: 400 });
		}

		// Validasi prefix
		if (!prefix || prefix.trim() === '') {
			return Response.json({ error: 'Prefix tidak boleh kosong' }, { status: 400 });
		}

		// Validasi prefix format (hanya huruf, angka, dash, underscore)
		const prefixRegex = /^[a-zA-Z0-9_-]+$/;
		if (!prefixRegex.test(prefix)) {
			return Response.json(
				{ error: 'Prefix hanya boleh mengandung huruf, angka, dash (-), dan underscore (_)' },
				{ status: 400 }
			);
		}

		// Validasi kategori/folder
		const validCategories = ['gallery', 'menu', 'hero', 'about', 'logos', 'backgrounds', 'uploads'];
		if (!validCategories.includes(category)) {
			return Response.json(
				{ error: `Kategori tidak valid. Pilih dari: ${validCategories.join(', ')}` },
				{ status: 400 }
			);
		}

		// Validasi tipe file
		const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
		if (!validTypes.includes(file.type)) {
			return Response.json(
				{ error: 'Tipe file tidak valid. Hanya menerima JPEG, PNG, GIF, atau WebP' },
				{ status: 400 }
			);
		}

		// Validasi ukuran file (max 10MB)
		const maxSize = 10 * 1024 * 1024; // 10MB
		if (file.size > maxSize) {
			return Response.json({ error: 'Ukuran file terlalu besar. Maksimal 10MB' }, { status: 400 });
		}

		const buffer = await Buffer.from(await file.arrayBuffer());

		// Prepare upload options
		const uploadOptions: any = {
			folder: `${prefix}/${category}`,
			resource_type: 'image'
		};

		// Add custom filename if provided
		if (customFilename && customFilename.trim() !== '') {
			// Sanitize filename
			const sanitized = customFilename
				.trim()
				.replace(/[^a-zA-Z0-9_-]/g, '-')
				.toLowerCase();
			uploadOptions.public_id = sanitized;
			uploadOptions.use_filename = false;
		}

		const result = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(uploadOptions, (error, result) => {
					if (error) reject(error);
					else resolve(result);
				})
				.end(buffer);
		});

		return Response.json({
			success: true,
			url: result.secure_url,
			public_id: result.public_id,
			prefix: prefix,
			category: category
		});
	} catch (error: any) {
		console.error('Upload error:', error);

		// Handle specific Cloudinary errors
		if (error.http_code) {
			return Response.json(
				{
					error: 'Gagal upload ke Cloudinary',
					details: error.message
				},
				{ status: error.http_code }
			);
		}

		return Response.json(
			{
				error: 'Terjadi kesalahan saat upload',
				details: error.message
			},
			{ status: 500 }
		);
	}
};
