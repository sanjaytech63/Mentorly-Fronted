import { FaClock, FaUser } from 'react-icons/fa';
import Card from './Card';
import { NewsCardProps } from '../types/newsTypes';
import Button from './Button';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { formatDate, getBadgeColor, getCategoryLabel, getReadTimeNumber } from '../utils';
import { Link } from 'react-router-dom';

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    
  return (
    <Card
      padding="sm"
      className="flex flex-col h-full min-h-[400px] transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-full mb-4">
        <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-xl" />
        {news.badge && (
          <span className="absolute top-2 right-2 capitalize bg-indigo-600 text-white/90 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
            {news.badge}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mb-3">
        {news.category && (
          <div className="">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(news.category)}`}>
              {getCategoryLabel(news.category)}
            </span>
          </div>
        )}
        <div className="text-xs text-gray-500">
          <div className="flex items-center space-x-1 ">
            <FiCalendar size={12} />
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </div>

      <Link to={`/blog/${news.slug}`}>
        <h3 className="font-semibold text-gray-900 text-lg hover:text-indigo-600 hover:underline leading-tight line-clamp-2 mb-2">
          {news.title}
        </h3>
      </Link>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
        {news.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center capitalize space-x-2">
          <FaUser className="text-gray-400" />
          <span>by {news.author}</span>
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <FaClock className="text-gray-400" />
          <span>{getReadTimeNumber(news.readTime)} min read</span>
        </div>
      </div>

      <Link to={`/blog/${news.slug}`}>
        <Button className=" py-3 w-full">
          <span>Read More</span> <FiArrowRight />
        </Button>
      </Link>
    </Card>
  );
};

export default NewsCard;
