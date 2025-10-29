import { FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import { ListCoursesFilters } from '../../api/course.service';
import { InputField, SelectField, Badge } from '../../index';

interface SearchControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  activeFiltersCount: number;
  filters: ListCoursesFilters;
  onClearFilter: () => void;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onPriceRangeChange: (range: string) => void;
  onRatingChange: (rating: number) => void;
}

const SearchControls: React.FC<SearchControlsProps> = ({
  searchQuery,
  onSearchChange,
  sortValue,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFiltersCount,
  filters,
  onClearFilter,
  onCategoryChange,
  onLevelChange,
  onPriceRangeChange,
  onRatingChange,
}) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
      <div className="flex-1 w-full lg:max-w-md">
        <InputField
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(value: string) => onSearchChange(value)}
          icon={<FiSearch className="w-4 h-4" />}
        />
      </div>

      <div className="flex items-center gap-4 w-full lg:w-auto">
        <SelectField
          value={sortValue}
          onChange={onSortChange}
          options={[
            { value: 'createdAt-desc', label: 'Newest First' },
            { value: 'createdAt-asc', label: 'Oldest First' },
            { value: 'rating-desc', label: 'Highest Rated' },
            { value: 'students-desc', label: 'Most Popular' },
            { value: 'price-asc', label: 'Price: Low to High' },
            { value: 'price-desc', label: 'Price: High to Low' },
            { value: 'discount-desc', label: 'Best Discount' },
          ]}
        />

        {/* View Toggle - Desktop */}
        <div className="hidden lg:flex items-center gap-1 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
          >
            <FiGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
          >
            <FiList className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Active Filters */}
    {activeFiltersCount > 0 && (
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <span className="text-sm text-gray-600">Active filters:</span>
        {filters.category && (
          <Badge variant="primary" size="sm">
            Category: {filters.category}
            <button onClick={() => onCategoryChange('all')} className="ml-1">
              <FiX className="w-3 h-3" />
            </button>
          </Badge>
        )}
        {filters.level && (
          <Badge variant="secondary" size="sm">
            Level: {filters.level}
            <button onClick={() => onLevelChange('all')} className="ml-1">
              <FiX className="w-3 h-3" />
            </button>
          </Badge>
        )}
        {filters.priceRange && (
          <Badge variant="success" size="sm">
            Price: {filters.priceRange}
            <button onClick={() => onPriceRangeChange('all')} className="ml-1">
              <FiX className="w-3 h-3" />
            </button>
          </Badge>
        )}
        {filters.minRating && (
          <Badge variant="warning" size="sm">
            Min Rating: {filters.minRating}+
            <button onClick={() => onRatingChange(0)} className="ml-1">
              <FiX className="w-3 h-3" />
            </button>
          </Badge>
        )}
        <button onClick={onClearFilter} className="text-sm text-indigo-600 hover:text-indigo-800">
          Clear all
        </button>
      </div>
    )}
  </div>
);

export default SearchControls;
