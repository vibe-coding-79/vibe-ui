import axios from 'axios';
import type { ApiError } from '@/types/api';

export const isApiError = (error: unknown): error is ApiError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'message' in error
    );
};

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as ApiError | undefined;
        return data?.message || error.message || 'An unexpected error occurred';
    }
    return 'An unexpected error occurred';
};
