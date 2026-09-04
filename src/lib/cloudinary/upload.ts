import crypto from 'crypto';

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
}

export interface UploadOptions {
  filename?: string;
  folder?: string;
}

/**
 * Uploads an image buffer directly to Cloudinary using their REST API.
 * Works with both signed API Key + Secret authentication, and unsigned upload presets.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  let cloudName = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '').trim();
  let apiKey = (process.env.CLOUDINARY_API_KEY || '').trim();
  let apiSecret = (process.env.CLOUDINARY_API_SECRET || '').trim();
  const uploadPreset = (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '').trim();

  // Support CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (cloudinaryUrl && (!cloudName || !apiKey || !apiSecret)) {
    try {
      const parsed = new URL(cloudinaryUrl);
      apiKey = parsed.username || apiKey;
      apiSecret = parsed.password || apiSecret;
      cloudName = parsed.hostname || cloudName;
    } catch {
      // fallback to separate env variables
    }
  }

  if (!cloudName) {
    throw new Error(
      'Missing Cloudinary Cloud Name. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local'
    );
  }

  const folder = options.folder || 'uft_uploads';
  const timestamp = Math.round(Date.now() / 1000);

  const formData = new FormData();
  const blob = new Blob([new Uint8Array(buffer)]);
  formData.append('file', blob, options.filename || 'upload.png');

  // 1. Preferred: Signed upload using API Key and Secret
  if (apiKey && apiSecret) {
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + apiSecret)
      .digest('hex');

    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('folder', folder);
  }
  // 2. Alternative: Unsigned upload using Upload Preset
  else if (uploadPreset) {
    formData.append('upload_preset', uploadPreset);
    if (folder) formData.append('folder', folder);
  } else {
    throw new Error(
      'Cloudinary credentials missing. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET (or NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) in .env.local'
    );
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error?.message || 'Cloudinary upload failed');
  }

  return {
    url: data.secure_url || data.url,
    publicId: data.public_id,
    format: data.format,
    width: data.width,
    height: data.height,
  };
}

/**
 * Checks whether Cloudinary credentials are fully configured.
 */
export function isCloudinaryConfigured(): boolean {
  const cloudName = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '').trim();
  const apiKey = (process.env.CLOUDINARY_API_KEY || '').trim();
  const apiSecret = (process.env.CLOUDINARY_API_SECRET || '').trim();
  const uploadPreset = (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '').trim();
  const cloudinaryUrl = (process.env.CLOUDINARY_URL || '').trim();

  if (cloudinaryUrl) return true;
  return Boolean(cloudName && ((apiKey && apiSecret) || uploadPreset));
}
