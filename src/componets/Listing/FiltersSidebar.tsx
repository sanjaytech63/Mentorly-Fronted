import { FiX } from "react-icons/fi";
import { ListCoursesFilters, ListCoursesResponse } from "../../api/course.service";
import { FilterSection, RatingFilter } from "./index";
import Button from "../Button";

export interface FiltersSidebarProps {
    filters: ListCoursesFilters;
    availableFilters: ListCoursesResponse['filters']['available'] | null;
    onCategoryChange: (category: string) => void;
    onLevelChange: (level: string) => void;
    onPriceRangeChange: (range: string) => void;
    onRatingChange: (rating: number) => void;
    onClearFilters: () => void;
    activeFiltersCount: number;
    onClose?: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
    filters,
    availableFilters,
    onCategoryChange,
    onLevelChange,
    onPriceRangeChange,
    onRatingChange,
    onClearFilters,
    activeFiltersCount,
    onClose
}) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full overflow-y-auto">
        {onClose && (
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={onClose} className="p-1">
                    <FiX className="w-5 h-5" />
                </button>
            </div>
        )}

        <div className="space-y-6">
            <FilterSection
                title="Categories"
                options={[
                    { value: 'all', label: 'All Categories' },
                    ...(availableFilters?.categories.map(cat => ({
                        value: cat.name,
                        label: cat.name,
                        count: cat.count
                    })) || [])
                ]}
                selectedValue={filters.category || 'all'}
                onSelect={onCategoryChange}
            />

            <FilterSection
                title="Difficulty Level"
                options={[
                    { value: 'all', label: 'All Levels' },
                    ...(availableFilters?.levels.map(level => ({
                        value: level.name,
                        label: level.name,
                        count: level.count
                    })) || [])
                ]}
                selectedValue={filters.level || 'all'}
                onSelect={onLevelChange}
            />

            <FilterSection
                title="Price Range"
                options={[
                    { value: 'all', label: 'All Prices' },
                    { value: 'free', label: 'Free' },
                    { value: 'under-1000', label: 'Under ₹1,000' },
                    { value: '1000-5000', label: '₹1,000 - ₹5,000' },
                    { value: '5000-10000', label: '₹5,000 - ₹10,000' }
                ]}
                selectedValue={filters.priceRange || 'all'}
                onSelect={onPriceRangeChange}
            />

            <RatingFilter
                selectedRating={filters.minRating || 0}
                onSelect={onRatingChange}
            />

            {activeFiltersCount > 0 && (
                <div className="pt-4 border-t border-gray-300">
                    <Button onClick={onClearFilters} variant='danger' className="w-full">
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    </div>
);


export default FiltersSidebar;