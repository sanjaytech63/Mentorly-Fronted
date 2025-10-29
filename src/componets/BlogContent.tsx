import {
  formatDate,
  getCategoryLabel,
  getCategoryColor,
  getBadgeColor,
  getReadTimeNumber,
} from '../utils/index';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

interface BlogContentProps {
  blog: {
    image: string;
    title: string;
    description: string;
    category: string;
    readTime: string;
    author: string;
    createdAt: string;
    badge?: string;
  };
}

export const BlogContent: React.FC<BlogContentProps | any> = ({ blog }) => {
  return (
    <main className="lg:col-span-3">
      <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {blog.badge && (
            <span
              className={`absolute top-4 right-4 capitalize text-sm font-semibold px-3 py-1.5 rounded-full border backdrop-blur-sm ${getBadgeColor(blog.badge)}`}
            >
              {blog.badge}
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryColor(blog.category)}`}
            >
              {getCategoryLabel(blog.category)}
            </span>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <FiCalendar size={14} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>

              <div className="flex items-center space-x-1">
                <FiClock size={14} />
                <span>{getReadTimeNumber(blog.readTime)} min read</span>
              </div>

              <div className="flex items-center space-x-1">
                <FiUser size={14} />
                <span className="capitalize">by {blog.author}</span>
              </div>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl line-clamp-2 lg:text-xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
            {blog.description}
          </p>
        </div>
      </article>
    </main>
  );
};
