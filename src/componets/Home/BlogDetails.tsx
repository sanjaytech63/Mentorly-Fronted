import { useParams, useNavigate } from 'react-router-dom';
import { useBlogDetails } from '../../hooks/useBlogDetails';
import { BlogHeader } from '../BlogHeader';
import { BlogContent } from '../BlogContent';
import { BlogSidebar } from '../BlogSidebar';
import Loader from '../Loader';
import { ErrorState } from '../ErrorState';
import { EmptyState } from '../EmptyState';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blog, loading, error } = useBlogDetails(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader size="medium" label="Loading blog post..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <ErrorState
          error={error || "The blog post you're looking for doesn't exist or has been removed."}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <EmptyState title="No blogs found" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader blog={blog} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <BlogContent blog={blog} />
          <BlogSidebar blog={blog} navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
