import React from 'react';

export interface PriceProps {
  originalPrice: number;
  discountedPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}

const Price: React.FC<PriceProps> = ({ originalPrice, discountedPrice, size = 'md' }) => {
  const sizeClasses = {
    sm: {
      original: 'text-lg',
      discounted: 'text-base',
    },
    md: {
      original: 'text-xl',
      discounted: 'text-lg',
    },
    lg: {
      original: 'text-2xl',
      discounted: 'text-xl',
    },
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="flex items-center space-x-2">
      {discountedPrice ? (
        <>
          <span className={`font-bold text-gray-900 ${sizeClasses[size].original}`}>
            {formatPrice(discountedPrice)}
          </span>
          <span className={`text-gray-500 line-through ${sizeClasses[size].discounted}`}>
            {formatPrice(originalPrice)}
          </span>
        </>
      ) : (
        <span className={`font-bold text-gray-900 ${sizeClasses[size].original}`}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
};

export default Price;
