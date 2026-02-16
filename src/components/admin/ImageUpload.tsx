'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Loader2, ImageIcon, Link2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket = 'images',
  folder = 'blog'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleUpload(file);
    } else {
      setError('Please drop an image file');
    }
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      // Basic URL validation
      try {
        new URL(urlInput);
        onChange(urlInput.trim());
        setError(null);
      } catch {
        setError('Please enter a valid URL');
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Mode Toggle */}
      {!value && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
              mode === 'upload'
                ? 'bg-terracotta text-white'
                : 'bg-sand text-gray-700 hover:bg-taupe'
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-2" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
              mode === 'url'
                ? 'bg-terracotta text-white'
                : 'bg-sand text-gray-700 hover:bg-taupe'
            }`}
          >
            <Link2 className="w-4 h-4 inline mr-2" />
            Paste URL
          </button>
        </div>
      )}

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-sand">
          <div className="relative aspect-[16/9]">
            <Image
              src={value}
              alt="Cover image"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : mode === 'upload' ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200
            ${dragActive
              ? 'border-terracotta bg-terracotta/5'
              : 'border-sand hover:border-taupe hover:bg-cream/50'
            }
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-terracotta animate-spin" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-terracotta" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Drop an image here, or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF, WebP up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlSubmit())}
              placeholder="https://imgur.com/... or any image URL"
              className="flex-1 px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta text-gray-900"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Paste an image URL from Imgur, Unsplash, or any public image host
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
