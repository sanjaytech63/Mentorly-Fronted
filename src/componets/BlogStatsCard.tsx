import { formatDate, getBadgeColor, getCategoryColor, getCategoryLabel, getReadTimeNumber } from "../utils";
import Card from "./Card";

export const BlogStatsCard: React.FC<{ blog: any }> = ({ blog }) => {
    return (
        <Card padding="md" className="rounded-2xl  border border-gray-200 shadow-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Details</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(blog.category)}`}>
                        {getCategoryLabel(blog.category)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Read Time</span>
                    <span className="text-sm font-medium text-gray-900">
                        {getReadTimeNumber(blog.readTime)} min
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Published</span>
                    <span className="text-sm font-medium text-gray-900">
                        {formatDate(blog.createdAt)}
                    </span>
                </div>
                {blog.badge && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`text-xs font-semibold px-2 py-1 capitalize rounded-full ${getBadgeColor(blog.badge)}`}>
                            {blog.badge}
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
};