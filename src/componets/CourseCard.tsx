import React from 'react';
import { Button, Card, Rating } from '../index';
import { Course } from '../types/course.types';
import { FiClock, FiUsers, FiBook } from 'react-icons/fi';
import {
  getBadgeColor,
  getBadgeLabel,
  getCategoryColor,
  getCategoryLabel,
  getLevelColor,
  getLevelLabel,
} from '../utils';
import { Link } from 'react-router-dom';

export interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onView?: (courseId: string) => void;
  variant?: 'grid' | 'list';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll, onView, variant = 'grid' }) => {
  const hasDiscount = course.discountedPrice && course.discountedPrice < course.originalPrice;

  const handleEnroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEnroll?.(course._id);
  };

  const handleView = () => {
    onView?.(course._id);
  };

  if (variant === 'list') {
    return (
      <Card
        padding="md"
        className="flex border border-gray-200 shadow-none flex-col lg:flex-row gap-6  transition-shadow cursor-pointer"
        // onClick={handleView}
      >
        {/* Image Section */}
        <div className="lg:w-64 flex-shrink-0 relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 lg:h-full object-cover rounded-lg"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {course.badge && (
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(course.badge)}`}
              >
                {getBadgeLabel(course.badge)}
              </span>
            )}
            {course.isFeatured && (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(course.category)}`}
                >
                  {getCategoryLabel(course.category)}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(course.level)}`}
                >
                  {getLevelLabel(course.level)}
                </span>
              </div>

              <Link to={`/courses/${course?._id}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  {course.title}
                </h2>
              </Link>

              <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
            </div>

            {/* Price Section */}
            <div className="lg:text-right lg:ml-4 mb-4 lg:mb-0">
              {hasDiscount ? (
                <div className="flex lg:flex-col items-center lg:items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{course.discountedPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{course.originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                    {course.discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">₹{course.originalPrice}</span>
              )}
            </div>
          </div>

          {/* Instructor and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                {course.instructor?.[0]?.toUpperCase() || 'I'}
              </div>
              <div>
                <p className="text-gray-700 font-medium">By {course.instructor}</p>
                <Rating rating={course.rating} reviewCount={course.reviewCount} />
              </div>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-auto">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                <span>{course.totalHours}h</span>
              </div>
              <div className="flex items-center gap-1">
                <FiBook className="w-4 h-4" />
                <span>{course.lectures} lectures</span>
              </div>
              <div className="flex items-center gap-1">
                <FiUsers className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleView}>
                View Details
              </Button>
              <Button>Enroll Now</Button>
            </div>
          </div>

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              {course.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 4 && (
                <span className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  +{course.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Grid View (Original)
  return (
    <Card padding="sm" className="h-full flex flex-col">
      <div className="mb-4 overflow-hidden rounded-xl relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        {course.badge && (
          <div className="absolute top-1 right-1">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(course.badge)}`}
            >
              {getBadgeLabel(course.badge)}
            </span>
          </div>
        )}

        {course.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex-grow space-y-3 mb-0">
        <div className="flex justify-between items-center ">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(course.category)}`}
          >
            {getCategoryLabel(course.category)}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(course.level)}`}
          >
            {getLevelLabel(course.level)}
          </span>
        </div>

        <Link to={`/courses/${course._id}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
            {course.title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{course.description}</p>

        <div className="flex items-center mb-3 justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
              {course.instructor?.[0]?.toUpperCase() || 'I'}
            </div>
            <p className="text-gray-700 text-sm font-medium truncate">By {course.instructor}</p>
          </div>

          <div className="flex items-center space-x-1">
            <Rating rating={course.rating} reviewCount={course.reviewCount} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <FiClock size={12} />
            <span>{course.totalHours}h</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiUsers size={12} />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>📚 {course.lectures} lectures</span>
          </div>
        </div>

        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center space-x-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                <span>₹</span> {course.discountedPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                <span>₹</span> {course.originalPrice}
              </span>
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                {course.discountPercentage}% OFF
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              <span>₹</span> {course.originalPrice}
            </span>
          )}
        </div>

        <Button className="w-full">Enroll Now</Button>
      </div>
    </Card>
  );
};

export default CourseCard;
