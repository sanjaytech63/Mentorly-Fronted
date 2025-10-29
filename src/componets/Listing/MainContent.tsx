import { ListCoursesFilters, ListCoursesResponse } from "../../api/course.service";
import { Course } from "../../types/course.types";
import { ContentArea, SearchControls } from "./index";

interface MainContentProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filters: ListCoursesFilters;
    onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
    activeFiltersCount: number;
    onClearFilter: () => void;
    onCategoryChange: (category: string) => void;
    onLevelChange: (level: string) => void;
    onPriceRangeChange: (range: string) => void;
    onRatingChange: (rating: number) => void;
    loading: boolean;
    error: string | null;
    courses: Course[];
    pagination: ListCoursesResponse['pagination'] | null;
    onRetry: () => void;
    onEnroll: (courseId: string) => void;
    onPageChange: (page: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({
    searchQuery,
    onSearchChange,
    filters,
    onSortChange,
    viewMode,
    onViewModeChange,
    activeFiltersCount,
    onClearFilter,
    onCategoryChange,
    onLevelChange,
    onPriceRangeChange,
    onRatingChange,
    loading,
    error,
    courses,
    pagination,
    onRetry,
    onEnroll,
    onPageChange
}) => (
    <div className="flex-1">
        <SearchControls
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            sortValue={`${filters.sortBy}-${filters.sortOrder}`}
            onSortChange={(value) => {
                const [sortBy, sortOrder] = value.split('-');
                onSortChange(sortBy, sortOrder as 'asc' | 'desc');
            }}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            activeFiltersCount={activeFiltersCount}
            filters={filters}
            onClearFilter={onClearFilter}
            onCategoryChange={onCategoryChange}
            onLevelChange={onLevelChange}
            onPriceRangeChange={onPriceRangeChange}
            onRatingChange={onRatingChange}
        />

        <ContentArea
            loading={loading}
            error={error}
            courses={courses}
            viewMode={viewMode}
            pagination={pagination}
            onRetry={onRetry}
            onEnroll={onEnroll}
            onPageChange={onPageChange}
            onClearFilters={onClearFilter}
        />
    </div>
);

export default MainContent;