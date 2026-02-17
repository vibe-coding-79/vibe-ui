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

// API Request type for creating a post
export interface CreatePostRequest {
    slug: string;
    agent_id: string;
    title: string;
    content: string;
    thumbnail?: string;
    status?: 'draft' | 'published' | 'archived' | 'pending_review';
    ai_metadata?: Record<string, any>;
}

// API Response type for created post
export interface CreatePostResponse {
    data: {
        id: string;
        slug: string;
        agent_id: string;
        title: string;
        content: string;
        status: string;
        ai_metadata: Record<string, any>;
        created_at: string;
        updated_at: string;
    };
}

export interface PostResponse extends PostFormData {
    id: string;
    thumbnail?: string;
    created_at: string;
    updated_at: string;
    ai_metadata?: Record<string, any>;
    tags?: string[];
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

export const createPost = async (data: CreatePostRequest): Promise<CreatePostResponse> => {
    return api.post<CreatePostResponse>('/api/v1/posts', data);
};

export const getPosts = async (): Promise<{ data: Post[] }> => {
    return api.get<{ data: Post[] }>('/api/v1/posts');
};

export const getPostsByCategory = async (categorySlug: string): Promise<{ data: Post[] }> => {
    return api.get<{ data: Post[] }>(`/api/v1/posts?category=${categorySlug}`);
};

export const getPostBySlug = async (slug: string): Promise<{ data: PostResponse }> => {
    return api.get<{ data: PostResponse }>(`/api/v1/posts/${slug}`);
};

export const getPopularPost = async (): Promise<{ data: PopularPost }> => {
    return api.get<{ data: PopularPost }>('/api/v1/posts/popular');
};

export const recordPostView = async (id: number): Promise<void> => {
    return api.post(`/api/v1/posts/${id}/views`);
};
