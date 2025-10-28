import React, { useState, useEffect } from 'react';
import { CourseCard, Container, Button, Badge, InputField, SelectField, Loader, } from '../../index';
import { listCourses, ListCoursesFilters, ListCoursesResponse } from '../../api/course.service';
import { Course } from '../../types/course.types';
import { FiSearch, FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';

const CourseListingPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ListCoursesFilters>({
        page: 1,
        limit: 12,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });
    const [pagination, setPagination] = useState<ListCoursesResponse['pagination'] | null>(null);
    const [availableFilters, setAvailableFilters] = useState<ListCoursesResponse['filters']['available'] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Fetch courses with filters
    const fetchCourses = async (filters: ListCoursesFilters) => {
        try {
            setLoading(true);
            setError(null);

            const response = await listCourses(filters);
            setCourses(response.courses);
            setPagination(response.pagination);
            setAvailableFilters(response.filters.available);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch courses');
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load and filter changes
    useEffect(() => {
        fetchCourses(filters);
    }, [filters]);

    // Handle search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== filters.search) {
                setFilters(prev => ({
                    ...prev,
                    search: searchQuery,
                    page: 1
                }));
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Filter handlers
    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({
            ...prev,
            category: category === 'all' ? undefined : category,
            page: 1
        }));
    };

    const handleLevelChange = (level: string) => {
        setFilters(prev => ({
            ...prev,
            level: level === 'all' ? undefined : level,
            page: 1
        }));
    };

    const handlePriceRangeChange = (range: string) => {
        setFilters(prev => ({
            ...prev,
            priceRange: range === 'all' ? undefined : range as any,
            page: 1
        }));
    };

    const handleRatingChange = (rating: number) => {
        setFilters(prev => ({
            ...prev,
            minRating: rating,
            page: 1
        }));
    };

    const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
        setFilters(prev => ({
            ...prev,
            sortBy: sortBy as any,
            sortOrder,
            page: 1
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setFilters({
            page: 1,
            limit: 12,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        });
        setSearchQuery('');
    };

    const handleEnroll = (courseId: string) => {
        console.log(`Enrolling in course: ${courseId}`);
        // Implement enrollment logic
    };

    // Active filters count
    const activeFiltersCount = Object.keys(filters).filter(key =>
        !['page', 'limit', 'sortBy', 'sortOrder'].includes(key) &&
        filters[key as keyof ListCoursesFilters] !== undefined
    ).length;

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <Container className="py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
                    <p className="text-gray-600">Discover the perfect course to advance your skills</p>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        <FiFilter className="w-4 h-4" />
                        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                        >
                            <FiGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                        >
                            <FiList className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden lg:block w-80 flex-shrink-0">
                        <FiltersSidebar
                            filters={filters}
                            availableFilters={availableFilters}
                            onCategoryChange={handleCategoryChange}
                            onLevelChange={handleLevelChange}
                            onPriceRangeChange={handlePriceRangeChange}
                            onRatingChange={handleRatingChange}
                            onClearFilters={clearFilters}
                            activeFiltersCount={activeFiltersCount}
                        />
                    </div>

                    {/* Mobile Filters Overlay */}
                    {showMobileFilters && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
                            <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
                                <FiltersSidebar
                                    filters={filters}
                                    availableFilters={availableFilters}
                                    onCategoryChange={handleCategoryChange}
                                    onLevelChange={handleLevelChange}
                                    onPriceRangeChange={handlePriceRangeChange}
                                    onRatingChange={handleRatingChange}
                                    onClearFilters={clearFilters}
                                    activeFiltersCount={activeFiltersCount}
                                    onClose={() => setShowMobileFilters(false)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Controls */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                <div className="flex-1 w-full lg:max-w-md">
                                    <InputField
                                        placeholder="Search courses..."
                                        value={searchQuery}
                                        onChange={(e: any) => setSearchQuery(e.target.value)}
                                        icon={<FiSearch className="w-4 h-4" />}
                                    />
                                </div>

                                <div className="flex items-center gap-4 w-full lg:w-auto">
                                    <SelectField
                                        value={`${filters.sortBy}-${filters.sortOrder}`}
                                        onChange={(value) => {
                                            const [sortBy, sortOrder] = value.split('-');
                                            handleSortChange(sortBy, sortOrder as 'asc' | 'desc');
                                        }}
                                        options={[
                                            { value: 'createdAt-desc', label: 'Newest First' },
                                            { value: 'createdAt-asc', label: 'Oldest First' },
                                            { value: 'rating-desc', label: 'Highest Rated' },
                                            { value: 'students-desc', label: 'Most Popular' },
                                            { value: 'price-asc', label: 'Price: Low to High' },
                                            { value: 'price-desc', label: 'Price: High to Low' },
                                            { value: 'discount-desc', label: 'Best Discount' }
                                        ]}
                                    />

                                    {/* View Toggle - Desktop */}
                                    <div className="hidden lg:flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
                                        >
                                            <FiGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
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
                                            <button onClick={() => handleCategoryChange('all')} className="ml-1">
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                    {filters.level && (
                                        <Badge variant="secondary" size="sm">
                                            Level: {filters.level}
                                            <button onClick={() => handleLevelChange('all')} className="ml-1">
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                    {filters.priceRange && (
                                        <Badge variant="success" size="sm">
                                            Price: {filters.priceRange}
                                            <button onClick={() => handlePriceRangeChange('all')} className="ml-1">
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                    {filters.minRating && (
                                        <Badge variant="warning" size="sm">
                                            Min Rating: {filters.minRating}+
                                            <button onClick={() => handleRatingChange(0)} className="ml-1">
                                                <FiX className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    )}
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-indigo-600 hover:text-indigo-800"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Results Count */}
                        {!loading && (
                            <div className="mb-6">
                                <p className="text-gray-600">
                                    Showing {courses.length} of {pagination?.totalItems || 0} courses
                                </p>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <Loader size='medium' />
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                <p className="text-red-800 mb-4">{error}</p>
                                <Button onClick={() => fetchCourses(filters)} variant="primary">
                                    Try Again
                                </Button>
                            </div>
                        )}

                        {/* Courses Grid/List */}
                        {!loading && !error && (
                            <>
                                <div className={
                                    viewMode === 'grid'
                                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                        : "space-y-6"
                                }>
                                    {courses.map(course => (
                                        <CourseCard
                                            key={course._id}
                                            course={course}
                                            onEnroll={handleEnroll}
                                        />
                                    ))}
                                </div>

                                {/* Empty State */}
                                {courses.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-6xl mb-4">📚</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                                        <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                                        <Button onClick={clearFilters} variant="primary">
                                            Clear Filters
                                        </Button>
                                    </div>
                                )}

                                {/* Pagination */}
                                {pagination && pagination.totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-12">
                                        <Button
                                            variant="outline"
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={!pagination.hasPrev}
                                        >
                                            Previous
                                        </Button>

                                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                                            .filter(page =>
                                                page === 1 ||
                                                page === pagination.totalPages ||
                                                Math.abs(page - pagination.currentPage) <= 1
                                            )
                                            .map((page, index, array) => (
                                                <React.Fragment key={page}>
                                                    {index > 0 && array[index - 1] !== page - 1 && (
                                                        <span className="px-2">...</span>
                                                    )}
                                                    <Button
                                                        variant={pagination.currentPage === page ? "primary" : "outline"}
                                                        onClick={() => handlePageChange(page)}
                                                    >
                                                        {page}
                                                    </Button>
                                                </React.Fragment>
                                            ))
                                        }

                                        <Button
                                            variant="outline"
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={!pagination.hasNext}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

// Filters Sidebar Component
interface FiltersSidebarProps {
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
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 h-full overflow-y-auto">
            {/* Mobile Header */}
            {onClose && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button onClick={onClose} className="p-1">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                    <div className="space-y-2">
                        <button
                            onClick={() => onCategoryChange('all')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${!filters.category
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All Categories
                        </button>
                        {availableFilters?.categories.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => onCategoryChange(cat.name)}
                                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm ${filters.category === cat.name
                                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{cat.name}</span>
                                <span className="text-gray-500 text-xs">({cat.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Levels */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Difficulty Level</h4>
                    <div className="space-y-2">
                        <button
                            onClick={() => onLevelChange('all')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${!filters.level
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All Levels
                        </button>
                        {availableFilters?.levels.map(level => (
                            <button
                                key={level.name}
                                onClick={() => onLevelChange(level.name)}
                                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm ${filters.level === level.name
                                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span>{level.name}</span>
                                <span className="text-gray-500 text-xs">({level.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-2">
                        <button
                            onClick={() => onPriceRangeChange('all')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${!filters.priceRange
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All Prices
                        </button>
                        <button
                            onClick={() => onPriceRangeChange('free')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${filters.priceRange === 'free'
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Free
                        </button>
                        <button
                            onClick={() => onPriceRangeChange('under-1000')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${filters.priceRange === 'under-1000'
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Under ₹1,000
                        </button>
                        <button
                            onClick={() => onPriceRangeChange('1000-5000')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${filters.priceRange === '1000-5000'
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            ₹1,000 - ₹5,000
                        </button>
                        <button
                            onClick={() => onPriceRangeChange('5000-10000')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${filters.priceRange === '5000-10000'
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            ₹5,000 - ₹10,000
                        </button>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
                    <div className="space-y-2">
                        {[4, 3, 2, 1].map(rating => (
                            <button
                                key={rating}
                                onClick={() => onRatingChange(rating)}
                                className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm ${filters.minRating === rating
                                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="flex items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    <span className="ml-2">& Up</span>
                                </span>
                            </button>
                        ))}
                        <button
                            onClick={() => onRatingChange(0)}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${!filters.minRating
                                ? 'bg-indigo-100 text-indigo-800 font-medium'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Any Rating
                        </button>
                    </div>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                    <div className="pt-4 border-t border-gray-300">
                        <Button
                            onClick={onClearFilters}
                            variant='danger'
                            className="w-full"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseListingPage;