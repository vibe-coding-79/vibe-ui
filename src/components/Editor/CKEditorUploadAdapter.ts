import type { UploadAdapter, UploadResponse, FileLoader } from 'ckeditor5';
import { getPresignedUrl, uploadFileToS3, validateImageFile } from '@/features/Blog/api/upload';

/**
 * Custom CKEditor Upload Adapter that uses presigned S3 URLs.
 * This integrates with the existing upload API to handle image uploads
 * directly from the CKEditor content area.
 */
export class S3UploadAdapter implements UploadAdapter {
    private loader: FileLoader;
    private abortController: AbortController | null = null;

    constructor(loader: FileLoader) {
        this.loader = loader;
    }

    async upload(): Promise<UploadResponse> {
        this.abortController = new AbortController();

        const file = await this.loader.file;
        if (!file) {
            throw new Error('No file provided for upload.');
        }

        // Validate file before uploading
        const validationError = validateImageFile(file);
        if (validationError) {
            throw new Error(validationError);
        }

        try {
            // Step 1: Get presigned URL from the API
            const presign = await getPresignedUrl(file.name, file.type, 'content-images');

            // Step 2: Upload file to S3 using the presigned URL
            await uploadFileToS3(presign.data.url, file);

            // Step 3: Return the public URL for CKEditor to insert into content
            // Use public_url if available, otherwise construct from key
            const imageUrl = presign.data.public_url || `/${presign.data.key}`;

            return {
                default: imageUrl,
            };
        } catch (error) {
            // Re-throw with a user-friendly message
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Image upload failed. Please try again.');
        }
    }

    abort(): void {
        if (this.abortController) {
            this.abortController.abort();
        }
    }
}

/**
 * CKEditor plugin function that registers the custom S3 upload adapter.
 * Pass this to the editor's `extraPlugins` config.
 */
export function S3UploadAdapterPlugin(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
        return new S3UploadAdapter(loader);
    };
}
