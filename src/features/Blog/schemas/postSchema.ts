import * as yup from 'yup';

export const postSchema = yup.object({
    title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
    content: yup.string().required('Content is required'),
    publishDate: yup.string().optional(),
    visibility: yup.string().required('Visibility is required'),
    categories: yup.array().min(1, 'Select at least one category'),
    tags: yup.array().of(yup.string()),
    author: yup.string().required('Author is required'),
}).required();

export type PostFormData = yup.InferType<typeof postSchema>;
