import { useQuery } from '@tanstack/react-query';
import { getPopularPost } from '../api/posts';

export const usePopularPost = () => {
    return useQuery({
        queryKey: ['posts', 'popular'],
        queryFn: getPopularPost,
    });
};
