import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export interface RatingProps {
  rating: number;
  reviewCount: number;
  showReviewCount?: boolean;
  size?: 'sm' | 'md';
}

const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  showReviewCount = true,
  size = 'md',
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1 text-sm">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-400" />
        ))}

        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}

        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <FaStar key={`empty-${index}`} className="text-gray-300" />
        ))}
      </div>

      <span className={`font-medium text-sm text-gray-700 ${sizeClasses[size]}`}>
        {rating.toFixed(1)}
      </span>

      {/* {showReviewCount && (
        <span className={`text-gray-500 text-sm ${sizeClasses[size]}`}>
          ({reviewCount} Reviews)
        </span>
      )} */}
    </div>
  );
};

export default Rating;
