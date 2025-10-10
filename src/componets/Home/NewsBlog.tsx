import React from 'react';
import { Button, Card, NewsCard } from '../../index';
import { newsData } from '../../constants/items';
import { FiArrowRight } from 'react-icons/fi';

const NewsBlogs: React.FC = () => {
  const handleReadMore = (newsId: string) => {
    console.log('Read more clicked for news:', newsId);
  };

  return (
    <div className=" bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
          {newsData &&
            newsData.map(newsItem => (
              <NewsCard key={newsItem.id} news={newsItem} onReadMore={handleReadMore} />
            ))}
        </div>

        <div className="text-center mt-12 flex justify-center">
          <Button className=" py-3">
            <span>Load More Articles</span> <FiArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsBlogs;
