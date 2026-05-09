import { IStorageService, UploadOptions, UploadResult } from "@/contracts/services/IStorageService";

export class MockStorageService implements IStorageService {
  async upload(file: Buffer, options: UploadOptions): Promise<UploadResult> {
    return {
      url: "https://via.placeholder.com/150",
      publicId: "mock_public_id",
      width: 150,
      height: 150,
      format: "png",
      bytes: file.length,
    };
  }

  async delete(publicId: string): Promise<void> {
    // Mock delete
  }

  getOptimizedUrl(publicId: string, preset: "thumbnail" | "card" | "hero"): string {
    return "https://via.placeholder.com/150";
  }
}
