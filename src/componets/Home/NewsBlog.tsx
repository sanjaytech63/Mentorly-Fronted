import React from 'react';
import { Button, Loader, NewsCard } from '../../index';
import { FiArrowRight } from 'react-icons/fi';
import { useFetchBlogs } from '../../hooks/useFetchBlogs';
import { ErrorState } from '../ErrorState';
import { EmptyState } from '../EmptyState';

const NewsBlogs: React.FC = () => {
  const {
    blogsData,
    blogLoading,
    fetchErrors,
    refetch,
    hasNextPage,
    setFilters,
  } = useFetchBlogs();

  const handleLoadMore = () => {
    if (hasNextPage) {
      setFilters((prev: any) => ({
        ...prev,
        page: prev.page + 1
      }));
    }
  };

  if (blogLoading && blogsData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <Loader size="medium" label="Loading blogs..." />
        </div>
      </div>
    );
  }

  if (fetchErrors && blogsData.length === 0) {
    return (
      <ErrorState
        onRetry={refetch}
        error={fetchErrors}
      />
    );
  }

  if (!blogsData || blogsData.length === 0) {
    return (
      <EmptyState
        title="No blogs found"
      />
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            News & Blogs
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Our Latest News Feed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {blogsData.map((blog) => (
            <NewsCard
              key={blog._id}
              news={{
                id: blog._id,
                title: blog.title,
                description: blog.description,
                image: blog.image,
                author: blog.author,
                category: blog.category,
                readTime: blog.readTime || "5",
                badge: blog.badge,
                slug:blog.slug,
                createdAt: blog.createdAt,
              }}
            />
          ))}
        </div>

        {blogLoading && (
          <div className="flex justify-center mt-6">
            <Loader size="small" label="Loading more..." />
          </div>
        )}

        {hasNextPage && !blogLoading && (
          <div className="text-center mt-12 flex justify-center">
            <Button
              className="py-3"
              onClick={handleLoadMore}
            >
              <span>Load More</span>
              <FiArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsBlogs;