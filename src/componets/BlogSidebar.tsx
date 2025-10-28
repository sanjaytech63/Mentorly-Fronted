import { useFetchBlogs } from '../hooks/useFetchBlogs';
import AuthorInfoCard from './AuthorInfoCard';
import { BlogStatsCard } from './BlogStatsCard';
import { RelatedBlogsCard } from './RelatedBlogsCard';

interface BlogSidebarProps {
    blog: any;
    navigate: (path: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ blog, navigate }) => {
    const { blogsData } = useFetchBlogs();

    return (
        <aside className="lg:col-span-1 space-y-6">
            <AuthorInfoCard blog={blog} />
            <RelatedBlogsCard
                blogs={blogsData}
                onBlogClick={(slug) => navigate(`/blog/${slug}`)}
            />
            <BlogStatsCard blog={blog} />
        </aside>
    );
};