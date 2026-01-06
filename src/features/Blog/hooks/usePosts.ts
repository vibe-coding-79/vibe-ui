import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/posts';
import type { PostFormData } from '../schemas/postSchema';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PostFormData) => createPost(data),
        onSuccess: () => {
            // Invalidate posts list query if it exists
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};
