// Mock Image Upload Service - Can be replaced with real Cloudinary/AWS S3 integration
// This provides image upload functionality for testing and development

export interface UploadOptions {
  file: File;
  folder?: string;
  tags?: string[];
  transformation?: ImageTransformation;
}

export interface ImageTransformation {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  quality?: 'auto' | 'eco' | 'good' | 'best';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
}

export interface UploadResponse {
  success: boolean;
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
  timestamp: string;
}

export interface ImageInfo {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  size: number;
  tags?: string[];
  createdAt: string;
}

// Mock image storage (in production, this would be Cloudinary/AWS S3)
const mockImages: Map<string, ImageInfo> = new Map();

class ImageUploadService {
  private maxFileSize = 5 * 1024 * 1024; // 5MB
  private allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  /**
   * Upload an image
   * In production, this would upload to Cloudinary/AWS S3
   */
  async uploadImage(options: UploadOptions): Promise<UploadResponse> {
    const { file, folder = 'vehicles', tags = [], transformation } = options;

    // Validate file
    this.validateFile(file);

    // Simulate upload delay
    await this.simulateDelay(1500);

    // Generate mock image data
    const publicId = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const url = `https://res.cloudinary.com/mock/image/upload/${publicId}`;

    // Simulate image dimensions (in production, these would come from the actual image)
    const width = transformation?.width || 1200;
    const height = transformation?.height || 800;
    const format = transformation?.format || 'webp';

    const imageInfo: ImageInfo = {
      url,
      publicId,
      width,
      height,
      format,
      size: file.size,
      tags,
      createdAt: new Date().toISOString(),
    };

    mockImages.set(publicId, imageInfo);

    console.log('🖼️ Image uploaded (mock):', {
      publicId,
      size: this.formatFileSize(file.size),
      dimensions: `${width}x${height}`,
    });

    return {
      success: true,
      url,
      publicId,
      width,
      height,
      format,
      size: file.size,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(files: File[], folder?: string): Promise<UploadResponse[]> {
    const uploadPromises = files.map((file) =>
      this.uploadImage({ file, folder })
    );

    return Promise.all(uploadPromises);
  }

  /**
   * Delete an image
   */
  async deleteImage(publicId: string): Promise<boolean> {
    await this.simulateDelay(500);

    if (!mockImages.has(publicId)) {
      throw new Error('Image not found');
    }

    mockImages.delete(publicId);

    console.log('🗑️ Image deleted (mock):', publicId);

    return true;
  }

  /**
   * Get image info
   */
  async getImageInfo(publicId: string): Promise<ImageInfo> {
    await this.simulateDelay(300);

    const image = mockImages.get(publicId);
    if (!image) {
      throw new Error('Image not found');
    }

    return image;
  }

  /**
   * Get optimized URL for different sizes
   */
  getOptimizedUrl(publicId: string, options?: ImageTransformation): string {
    const image = mockImages.get(publicId);
    if (!image) {
      throw new Error('Image not found');
    }

    // Build transformation string (Cloudinary-style)
    const transforms: string[] = [];
    
    if (options?.width) transforms.push(`w_${options.width}`);
    if (options?.height) transforms.push(`h_${options.height}`);
    if (options?.crop) transforms.push(`c_${options.crop}`);
    if (options?.quality) transforms.push(`q_${options.quality}`);
    if (options?.format) transforms.push(`f_${options.format}`);

    const transformString = transforms.length > 0 ? transforms.join(',') : '';
    const baseUrl = `https://res.cloudinary.com/mock/image/upload`;
    
    return transformString 
      ? `${baseUrl}/${transformString}/${publicId}`
      : `${baseUrl}/${publicId}`;
  }

  /**
   * Get thumbnail URL
   */
  getThumbnailUrl(publicId: string): string {
    return this.getOptimizedUrl(publicId, {
      width: 200,
      height: 200,
      crop: 'thumb',
      quality: 'auto',
      format: 'webp',
    });
  }

  /**
   * Get medium size URL
   */
  getMediumUrl(publicId: string): string {
    return this.getOptimizedUrl(publicId, {
      width: 800,
      height: 600,
      crop: 'fill',
      quality: 'auto',
      format: 'webp',
    });
  }

  /**
   * Get full size URL
   */
  getFullUrl(publicId: string): string {
    return this.getOptimizedUrl(publicId, {
      quality: 'auto',
      format: 'webp',
    });
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): void {
    // Check file size
    if (file.size > this.maxFileSize) {
      throw new Error(
        `File size exceeds maximum limit of ${this.formatFileSize(this.maxFileSize)}`
      );
    }

    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      throw new Error(
        `Invalid file type. Allowed types: ${this.allowedTypes.join(', ')}`
      );
    }
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  /**
   * Simulate API delay
   */
  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get all uploaded images (for testing/debugging)
   */
  getAllImages(): ImageInfo[] {
    return Array.from(mockImages.values());
  }

  /**
   * Clear mock images (for testing)
   */
  clearMockData(): void {
    mockImages.clear();
  }

  /**
   * Generate a placeholder image URL (for development)
   */
  getPlaceholderUrl(width = 800, height = 600): string {
    return `https://via.placeholder.com/${width}x${height}/2563eb/ffffff?text=Vehicle+Image`;
  }
}

export const imageUploadService = new ImageUploadService();
