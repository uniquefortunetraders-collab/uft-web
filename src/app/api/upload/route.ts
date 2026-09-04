import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary/upload';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images (PNG, JPG, WEBP, SVG, GIF) are allowed.' },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe filename
    const originalExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const cleanExt = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(originalExt)
      ? originalExt
      : 'png';
    const baseName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_');
    const fileName = `${Date.now()}_${baseName}.${cleanExt}`;

    // ── 1. PRIMARY: Store directly in Cloudinary ───────────────────
    if (isCloudinaryConfigured()) {
      try {
        const result = await uploadToCloudinary(buffer, {
          filename: fileName,
          folder: 'uft_uploads',
        });

        return NextResponse.json({
          url: result.url,
          publicId: result.publicId,
          fileName,
          success: true,
          storage: 'cloudinary',
        });
      } catch (cloudErr: any) {
        console.error('Cloudinary upload error:', cloudErr);
        return NextResponse.json(
          {
            error: `Cloudinary error: ${cloudErr.message || 'Failed to upload to Cloudinary'}. Check your .env.local credentials.`,
          },
          { status: 500 }
        );
      }
    }

    // ── 2. Fallback if Cloudinary credentials are not yet entered ──
    console.warn(
      '[Upload] Cloudinary credentials missing in .env.local. Saving to local /public/uploads as temporary fallback.'
    );

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const localFilePath = path.join(uploadDir, fileName);
    await fs.writeFile(localFilePath, buffer);

    const localUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      url: localUrl,
      fileName,
      success: true,
      storage: 'local',
      warning:
        'Stored locally. Add your NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.local to store in Cloudinary.',
    });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process image upload' },
      { status: 500 }
    );
  }
}
