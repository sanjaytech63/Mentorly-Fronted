import { FaCalendar, FaClock, FaUser } from 'react-icons/fa';
import Card from './Card';
import { NewsCardProps } from '../types/newsTypes';
import Button from './Button';
import { FiArrowRight } from 'react-icons/fi';

const NewsCard: React.FC<NewsCardProps> = ({ news, onReadMore }) => {
  const handleReadMore = () => {
    onReadMore?.(news.id);
  };

  return (
    <Card
      padding="sm"
      className="flex flex-col h-full min-h-[400px] transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-full mb-4">
        <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-xl" />
        {news.badge && (
          <span className="absolute top-2 right-2 bg-indigo-600 text-white/90 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
            {news.badge}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mb-3">
        <p className="text-xs bg-[#F1EEFF] text-indigo-600 font-semibold px-4 py-1.5 rounded-full">
          {news.category}
        </p>
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <FaCalendar className="text-gray-400" />
          <span>{news.date}</span>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 mb-2">
        {news.title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
        {news.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-400" />
          <span>by {news.author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock className="text-gray-400" />
          <span>{news.readTime}</span>
        </div>
      </div>

      <Button className=" py-3 w-full">
        <span>Read More</span> <FiArrowRight />
      </Button>
    </Card>
  );
};

export default NewsCard;
