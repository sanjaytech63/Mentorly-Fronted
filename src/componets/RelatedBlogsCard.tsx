import { FiClock } from "react-icons/fi";
import { getReadTimeNumber } from "../utils";
import Card from "./Card";

export const RelatedBlogsCard: React.FC<{
    blogs: any[];
    onBlogClick: (slug: string) => void;
}> = ({ blogs, onBlogClick }) => {
    return (
        <Card padding="md" className="rounded-2xl  border border-gray-200 shadow-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Posts</h3>
            <div className="space-y-4">
                {blogs.map(blog => (
                    <div
                        key={blog._id}
                        onClick={() => onBlogClick(blog.slug)}
                        className="group cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-transparent "
                    >
                        <div className="flex space-x-3">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
                                    {blog.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <FiClock size={12} />
                                    <span>{getReadTimeNumber(blog.readTime)} min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
