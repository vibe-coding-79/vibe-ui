import api from '@/lib/axios';

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export const getCategories = async (): Promise<{ data: Category[] }> => {
    return api.get<{ data: Category[] }>('/api/v1/categories');
};
