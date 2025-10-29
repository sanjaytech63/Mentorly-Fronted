import { Link } from 'react-router-dom';
import { Button } from '../index';
import { FiArrowLeft, FiHome, FiChevronRight } from 'react-icons/fi';

interface BlogHeaderProps {
  blog: {
    slug?: string;
    title?: string;
  };
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({ blog }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border border-gray-200 mt-18 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="font-medium hidden sm:block">Back</span>
          </Button>

          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-indigo-600 transition-colors"
            >
              <FiHome size={16} />
              <span>Home</span>
            </Link>
            <FiChevronRight size={16} className="text-gray-400 md:block hidden" />
            <span className="text-gray-500 md:block hidden font-medium truncate max-w-xs">
              {blog.slug || blog.title}
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
};
