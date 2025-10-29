import React, { useState, useEffect } from 'react';
import { Button, Container } from '../../index';
import { listCourses, ListCoursesFilters, ListCoursesResponse } from '../../api/course.service';
import { Course } from '../../types/course.types';
import { useDebounce } from '../../hooks/useDebounce';
import {
  DesktopFilters,
  MainContent,
  MobileFiltersOverlay,
  MobileFilterToggle,
  PageHeader,
} from './index';

const CourseListingPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListCoursesFilters>({
    page: 1,
    limit: 6,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState<ListCoursesResponse['pagination'] | null>(null);
  const [availableFilters, setAvailableFilters] = useState<
    ListCoursesResponse['filters']['available'] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

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

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: debouncedSearchQuery || undefined,
      page: 1,
    }));
  }, [debouncedSearchQuery]);

  useEffect(() => {
    fetchCourses(filters);
  }, [filters]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category === 'all' ? undefined : category,
      page: 1,
    }));
  };

  const handleLevelChange = (level: string) => {
    setFilters(prev => ({
      ...prev,
      level: level === 'all' ? undefined : level,
      page: 1,
    }));
  };

  const handlePriceRangeChange = (range: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range === 'all' ? undefined : (range as any),
      page: 1,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      minRating: rating,
      page: 1,
    }));
  };

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortBy as any,
      sortOrder,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 6,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    setSearchQuery('');
  };

  const handleEnroll = (courseId: string) => {
    console.log(`Enrolling in course: ${courseId}`);
  };

  const activeFiltersCount = Object.keys(filters).filter(
    key =>
      !['page', 'limit', 'sortBy', 'sortOrder'].includes(key) &&
      filters[key as keyof ListCoursesFilters] !== undefined
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Container className="py-8">
        <PageHeader />

        <MobileFilterToggle
          activeFiltersCount={activeFiltersCount}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onShowFilters={() => setShowMobileFilters(true)}
        />

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <DesktopFilters
            filters={filters}
            availableFilters={availableFilters}
            onCategoryChange={handleCategoryChange}
            onLevelChange={handleLevelChange}
            onPriceRangeChange={handlePriceRangeChange}
            onRatingChange={handleRatingChange}
            onClearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Mobile Filters Overlay */}
          <MobileFiltersOverlay
            show={showMobileFilters}
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

          {/* Main Content */}
          <MainContent
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            activeFiltersCount={activeFiltersCount}
            onClearFilter={clearFilters}
            onCategoryChange={handleCategoryChange}
            onLevelChange={handleLevelChange}
            onPriceRangeChange={handlePriceRangeChange}
            onRatingChange={handleRatingChange}
            loading={loading}
            error={error}
            courses={courses}
            pagination={pagination}
            onRetry={() => fetchCourses(filters)}
            onEnroll={handleEnroll}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
    </div>
  );
};

export default CourseListingPage;

interface PaginationProps {
  pagination: ListCoursesResponse['pagination'];
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => (
  <div className="flex justify-center items-center gap-2 mt-12">
    <Button
      variant="outline"
      onClick={() => onPageChange(pagination.currentPage - 1)}
      disabled={!pagination.hasPrev}
    >
      Previous
    </Button>

    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
      .filter(
        page =>
          page === 1 ||
          page === pagination.totalPages ||
          Math.abs(page - pagination.currentPage) <= 1
      )
      .map((page, index, array) => (
        <React.Fragment key={page}>
          {index > 0 && array[index - 1] !== page - 1 && <span className="px-2">...</span>}
          <Button
            variant={pagination.currentPage === page ? 'primary' : 'outline'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        </React.Fragment>
      ))}

    <Button
      variant="outline"
      onClick={() => onPageChange(pagination.currentPage + 1)}
      disabled={!pagination.hasNext}
    >
      Next
    </Button>
  </div>
);
