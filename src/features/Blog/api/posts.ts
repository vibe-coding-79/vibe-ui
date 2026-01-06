import api from '@/lib/axios';
import type { PostFormData } from '../schemas/postSchema';

export interface PostResponse extends PostFormData {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const createPost = async (data: PostFormData): Promise<PostResponse> => {
    return api.post<PostResponse>('/posts', data);
};

export const getPosts = async (): Promise<PostResponse[]> => {
    return api.get<PostResponse[]>('/posts');
};

export const getPostBySlug = async (slug: string): Promise<PostResponse> => {
    return api.get<PostResponse>(`/posts/${slug}`);
};
