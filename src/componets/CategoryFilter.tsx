import React from 'react';
import { Button } from '../index';

export interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
      {categories.map(category => (
        <Button
          key={category}
          variant={activeCategory === category ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onCategoryChange(category)}
          className="mb-2"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
