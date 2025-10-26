import { FiUser } from "react-icons/fi";
import Card from "./Card";
import { getCategoryLabel } from "../utils";

const AuthorInfoCard = ({ blog }: any) => {
    return (
        <Card padding="md" className="rounded-2xl  border border-gray-200 shadow-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FiUser size={18} />
                <span>About The Author</span>
            </h3>
            <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                    {blog.author.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900 capitalize">{blog.author}</h4>
                    <p className="text-sm text-gray-600">Tech Writer</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
                Passionate about {getCategoryLabel(blog.category).toLowerCase()} and sharing knowledge with the developer community.
            </p>
        </Card>
    );
};

export default AuthorInfoCard;