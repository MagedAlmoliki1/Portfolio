// src/contracts/services/IStorageService.ts

export interface UploadOptions {
  folder: string
  filename?: string
  maxWidth?: number
  tags?: string[]
}

export interface UploadResult {
  url: string             // Always HTTPS
  publicId: string        // Always non-empty for deletion
  width: number           // Always > 0
  height: number          // Always > 0
  format: string          // Always a valid image format
  bytes: number           // Always > 0
}

export interface IStorageWriter {
  upload(file: Buffer, options: UploadOptions): Promise<UploadResult>
  delete(publicId: string): Promise<void>
}

export interface IStorageReader {
  getOptimizedUrl(publicId: string, preset: 'thumbnail' | 'card' | 'hero'): string
}

export interface IStorageService extends IStorageWriter, IStorageReader {}
