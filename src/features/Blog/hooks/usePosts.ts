import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, recordPostView, getPosts, getPostsByCategory, getPostBySlug } from '../api/posts';
import type { CreatePostRequest } from '../api/posts';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePostRequest) => createPost(data),
        onSuccess: () => {
            // Invalidate posts list query if it exists
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

export const useRecordView = () => {
    return useMutation({
        mutationFn: (id: number) => recordPostView(id),
    });
};

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });
};

export const usePostsByCategory = (categorySlug: string) => {
    return useQuery({
        queryKey: ['posts', 'category', categorySlug],
        queryFn: () => getPostsByCategory(categorySlug),
        enabled: !!categorySlug,
    });
};
export const usePost = (slug: string) => {
    return useQuery({
        queryKey: ['post', slug],
        queryFn: () => getPostBySlug(slug),
        enabled: !!slug,
    });
};
