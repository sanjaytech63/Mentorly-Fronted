import React from 'react';
import { FaUser, FaClock, FaArrowRight } from 'react-icons/fa';
import { Card, Button, Rating, Price } from './index';
import { Course } from '../types/course';

export interface CourseCardProps {
    course: Course;
    onEnroll?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
    const handleEnroll = () => {
        onEnroll?.(course.id);
    };

    return (
        <Card
            padding="sm"
            className="flex flex-col h-full min-h-[450px] transition-transform duration-300 hover:scale-105"
        >
            <div className="relative w-full mb-4">
                <img
                    src={course?.image}
                    alt={course?.title || "Course"}
                    className="w-full h-48 object-cover rounded-xl"
                />
                {course.badge && (
                    <span className="absolute top-2 right-2 bg-indigo-600 text-white/90 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                        {course.badge}
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center mb-3">
                <p className="text-xs bg-[#F1EEFF] text-indigo-600 font-semibold px-4 py-1.5 rounded-full">
                    {course.category}
                </p>
                <Price
                    originalPrice={course.originalPrice}
                    discountedPrice={course.discountedPrice}
                />
            </div>

            <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
                {course.title}
            </h3>

            <div className="flex justify-between items-center my-3">
                <p className="text-gray-600 text-sm truncate">{course.instructor}</p>
                <Rating rating={course.rating} reviewCount={course.reviewCount} />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-2">
                    <FaClock className="text-gray-400" />
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-400" />
                    <span>{course.students}</span>
                </div>
            </div>

            <div className="pt-2">
                <Button
                    size="small"
                    className="w-full py-2 !rounded-full space-x-2 font-semibold shadow-md flex items-center justify-center gap-2"
                    onClick={handleEnroll}
                >
                    <span>Enroll Now</span> <FaArrowRight className="text-sm" />
                </Button>
            </div>

        </Card>
    );
};

export default CourseCard;
