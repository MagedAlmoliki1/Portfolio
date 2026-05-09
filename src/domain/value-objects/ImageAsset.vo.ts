// src/domain/value-objects/ImageAsset.vo.ts
// Responsibility: Represent a stored image with its metadata
export class ImageAsset {
  constructor(
    public readonly url: string,
    public readonly publicId: string,
    public readonly alt: string,
    public readonly width?: number,
    public readonly height?: number,
  ) {
    if (!url.startsWith('https://')) {
      throw new Error('Image URL must be HTTPS')
    }
  }

  get isCloudinary(): boolean {
    return this.publicId.length > 0
  }
}
