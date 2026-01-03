/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from '$lib/server/cloudinary';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.formData();
		const file = data.get('file') as File;
		const category = (data.get('category') as string) || 'uploads';

		if (!file) {
			return Response.json({ error: 'File tidak ditemukan' }, { status: 400 });
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

		const result = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: `rihat/${category}`,
						resource_type: 'image'
					},
					(error, result) => {
						if (error) reject(error);
						else resolve(result);
					}
				)
				.end(buffer);
		});

		return Response.json({
			success: true,
			url: result.secure_url,
			public_id: result.public_id,
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
