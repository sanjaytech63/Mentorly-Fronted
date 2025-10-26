import { useState, useEffect } from 'react';
import { Blog } from '../types/blog.types';
import { getBlogById } from '../api/blogService';

interface UseBlogDetailsReturn {
    blog: Blog | null;
    loading: boolean;
    error: string | null;
}

export const useBlogDetails = (blogId: string): UseBlogDetailsReturn => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getBlogById(blogId);
                setBlog(response);

            } catch (err: any) {
                setError(err.message || 'Failed to fetch blog');
                console.error('Error fetching blog details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchBlogDetails();
        }
    }, [blogId]);

    return {
        blog,
        loading,
        error,
    };
};