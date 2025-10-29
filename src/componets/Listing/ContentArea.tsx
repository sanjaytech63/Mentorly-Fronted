import { ListCoursesResponse } from "../../api/course.service";
import { Course } from "../../types/course.types";
import CourseCard from "../CourseCard";
import { EmptyState } from "../EmptyState";
import { Loader, Button } from "../../index";
import { Pagination } from "./CourseListingPage";

interface ContentAreaProps {
    loading: boolean;
    error: string | null;
    courses: Course[];
    viewMode: 'grid' | 'list';
    pagination: ListCoursesResponse['pagination'] | null;
    onRetry: () => void;
    onEnroll: (courseId: string) => void;
    onPageChange: (page: number) => void;
    onClearFilters?: () => void | any;
}

const ContentArea: React.FC<ContentAreaProps> = ({
    loading,
    error,
    courses,
    viewMode,
    pagination,
    onRetry,
    onEnroll,
    onPageChange,
    onClearFilters
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader size='medium' />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800 mb-4">{error}</p>
                <Button onClick={onRetry} variant="primary">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="mb-6">
                <p className="text-gray-600">
                    Showing {courses.length} of {pagination?.totalItems || 0} courses
                </p>
            </div>

            {courses.length > 0 ? (
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
                                onEnroll={onEnroll}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={onPageChange}
                        />
                    )}
                </>
            ) : (
                <EmptyState onClearFilters={onClearFilters} />
            )}
        </>
    );
};

export default ContentArea;
