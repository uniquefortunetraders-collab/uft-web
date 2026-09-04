'use client';

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Link as LinkIcon, Check, Loader2, Image as ImageIcon, Pencil, Trash2 } from 'lucide-react';

interface ImageUploadProps {
  name: string;
  label: string;
  defaultValue?: string | null;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'avatar';
  required?: boolean;
}

export function ImageUpload({
  name,
  label,
  defaultValue = '',
  helperText,
  aspectRatio = 'video',
  required = false,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || '');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if defaultValue changes (e.g. when editing a different item)
  useEffect(() => {
    setImageUrl(defaultValue || '');
    setCustomUrl(defaultValue || '');
    setUploadError(null);
  }, [defaultValue]);

  // Listen to parent form reset event so the image clears automatically when the form is submitted/reset
  useEffect(() => {
    const handleFormReset = () => {
      setImageUrl('');
      setCustomUrl('');
      setUploadError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const form = fileInputRef.current?.closest('form');
    if (form) {
      form.addEventListener('reset', handleFormReset);
      return () => form.removeEventListener('reset', handleFormReset);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files (PNG, JPG, WEBP, SVG) are allowed.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size cannot exceed 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setImageUrl(data.url);
      setCustomUrl(data.url);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setImageUrl('');
    setCustomUrl('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      setImageUrl(customUrl.trim());
      setShowUrlInput(false);
      setUploadError(null);
    }
  };

  // Determine aspect ratio class for preview thumbnail
  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'avatar':
        return 'w-16 h-16 rounded-full';
      case 'square':
        return 'w-20 h-20 rounded-lg';
      case 'video':
      default:
        return 'w-32 sm:w-40 aspect-video rounded-lg';
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700">
          {label} {required && <span className="text-[#e6005c]">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-gray-500 hover:text-[#e6005c] flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL input' : 'Paste image URL instead'}</span>
        </button>
      </div>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={imageUrl} />

      {/* Direct URL input accordion */}
      {showUrlInput && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
          <input
            type="url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-[#e6005c] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Apply
          </button>
        </div>
      )}

      {/* Main Upload / Preview Area */}
      {imageUrl ? (
        /* Image Preview State */
        <div className="relative p-3.5 border border-gray-200 rounded-xl bg-white shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
            {/* Image Thumbnail */}
            <div className={`relative overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0 shadow-2xs ${getAspectClass()}`}>
              <Image
                src={imageUrl}
                alt={label}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Details and Action Buttons */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  <Check className="w-3 h-3" /> Uploaded
                </span>
                {imageUrl.includes('res.cloudinary.com') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                    Cloudinary CDN
                  </span>
                )}
              </div>

              <p className="text-[11px] text-gray-500 font-mono truncate block max-w-full" title={imageUrl}>
                {imageUrl}
              </p>

              <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#e6005c] bg-gray-100 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer border border-gray-200/80"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Change Image</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 rounded-lg transition-colors cursor-pointer border border-red-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
            isDragging
              ? 'border-[#e6005c] bg-pink-50/40 scale-[0.99]'
              : 'border-gray-200 hover:border-pink-300 hover:bg-slate-50/60'
          }`}
        >
          {isUploading ? (
            <div className="py-4 flex flex-col items-center gap-2">
              <Loader2 className="w-7 h-7 text-[#e6005c] animate-spin" />
              <p className="text-xs font-semibold text-gray-700">Uploading image, please wait...</p>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-pink-50 text-[#e6005c] flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">
                  <span className="text-[#e6005c]">Click to upload</span> or drag and drop
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  PNG, JPG, WEBP, SVG or GIF (up to 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error Message */}
      {uploadError && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1">
          <X className="w-3.5 h-3.5" />
          {uploadError}
        </p>
      )}

      {/* Helper text */}
      {helperText && !uploadError && (
        <p className="text-[11px] text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
