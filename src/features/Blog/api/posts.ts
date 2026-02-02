import api from '@/lib/axios';
import type { PostFormData } from '../schemas/postSchema';

export interface Author {
    id: string;
    first_name: string;
    last_name: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    content?: string;
    status?: string;
    thumbnail?: string;
    view_count?: number;
    created_at: string;
    updated_at: string;
    author?: Author;
    // Legacy fields for backwards compatibility
    fake_id?: string;
    content_snippet?: string;
    published_at?: string;
    image_url?: string;
    category_name?: string;
    author_name?: string;
}

export interface PostResponse extends PostFormData {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface PopularPost {
    id: number;
    fake_id: string;
    title: string;
    content_snippet: string;
    view_count_this_week: number;
    link: string;
    slug: string;
    published_at: string;
}

export const createPost = async (data: PostFormData): Promise<PostResponse> => {
    return api.post<PostResponse>('/posts', data);
};

export const getPosts = async (): Promise<{ data: Post[] }> => {
    return api.get<{ data: Post[] }>('/api/v1/posts');
};

export const getPostsByCategory = async (categorySlug: string): Promise<{ data: Post[] }> => {
    return api.get<{ data: Post[] }>(`/api/v1/posts?category=${categorySlug}`);
};

export const getPostBySlug = async (slug: string): Promise<{ data: Post & { content: string } }> => {
    return api.get<{ data: Post & { content: string } }>(`/api/v1/posts/${slug}`);
};

export const getPopularPost = async (): Promise<{ data: PopularPost }> => {
    return api.get<{ data: PopularPost }>('/api/v1/posts/popular');
};

export const recordPostView = async (id: number): Promise<void> => {
    return api.post(`/api/v1/posts/${id}/views`);
};
