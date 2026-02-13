import api from '@/lib/axios';

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];

export interface PresignResponse {
    data: {
        url: string;
        key: string;
        public_url: string;
        expires_in: number;
    };
}

export const validateImageFile = (file: File): string | null => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return 'Invalid file type. Only JPG, PNG, GIF, SVG, and WebP are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
        return `File size exceeds 8MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`;
    }
    return null;
};

export const getPresignedUrl = async (
    file_name: string,
    contentType: string,
    folder: string = 'images',
): Promise<PresignResponse> => {
    return api.post<PresignResponse>('/api/v1/upload/presign', {
        file_name,
        content_type: contentType,
        folder,
    });
};

export const uploadFileToS3 = async (presignedUrl: string, file: File): Promise<void> => {
    const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });
    if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
    }
};
