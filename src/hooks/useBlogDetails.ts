import { useState, useEffect } from 'react';
import { Blog } from '../types/blog.types';
import { getBlogById } from '../api/blogService';

interface UseBlogDetailsReturn {
    blog: Blog | null;
    loading: boolean;
    error: string | null;
}

export const useBlogDetails = (slug: string): UseBlogDetailsReturn => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    if (!slug) return;

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getBlogById(slug);
                setBlog(response);

            } catch (err: any) {
                setError(err.message || 'Failed to fetch blog');
                console.error('Error fetching blog details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlogDetails();
        }
    }, [slug]);

    return {
        blog,
        loading,
        error,
    };
};