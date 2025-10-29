import api from './axiosInstance';
import { Course, CourseFilters } from '../types/course.types';

interface GetCoursesOptions {
  signal?: AbortSignal;
}

// Existing functions...
export const getCourses = async (filters: CourseFilters = {}, options: GetCoursesOptions = {}): Promise<any> => {
  const params = new URLSearchParams();

  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.level) params.append('level', filters.level);
  if (filters.isFeatured !== undefined) params.append('featured', filters.isFeatured.toString());
  if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

  const config = {
    params,
    ...options,
  };

  const response = await api.get(`/courses?${params.toString()}`, config);
  return response.data;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

export const createCourse = async (formData: FormData): Promise<{ data: Course; message: string }> => {
  const response = await api.post('/courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
  return response.data;
};

export const updateCourse = async (id: string, formData: FormData): Promise<{ data: Course; message: string }> => {
  const response = await api.put(`/courses/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 30000,
  });
  return response.data;
};

export const deleteCourseById = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

export const getCourseStats = async (): Promise<any> => {
  const response = await api.get('/courses/stats');
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get('/courses/categories');
  return response.data.data;
};

export const getFeaturedCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses/featured');
  return response.data.data;
};

export const getDiscountedCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses/discounted');
  return response.data.data;
};

export const updateCourseStatus = async (id: string, isActive: boolean): Promise<{ message: string }> => {
  const response = await api.patch(`/courses/${id}/status`, { isActive });
  return response.data;
};

export const updateCourseFeatured = async (id: string, isFeatured: boolean): Promise<{ message: string }> => {
  const response = await api.patch(`/courses/${id}/featured`, { isFeatured });
  return response.data;
};

// ✅ NEW: Advanced Course Listing Service
export interface ListCoursesFilters {
  // Search and basic filters
  search?: string;
  category?: string | string[];
  level?: string | string[];
  instructor?: string;

  // Price filters
  minPrice?: number;
  maxPrice?: number;
  priceRange?: 'free' | 'under-1000' | '1000-5000' | '5000-10000' | 'above-10000';
  hasDiscount?: boolean;
  minDiscountPercentage?: number;
  maxDiscountPercentage?: number;

  // Rating filters
  minRating?: number;
  maxRating?: number;

  // Duration filters
  minDuration?: number;
  maxDuration?: number;
  durationRange?: 'short' | 'medium' | 'long' | 'extended';

  // Student count filters
  minStudents?: number;
  maxStudents?: number;

  // Status filters
  isFeatured?: boolean;
  isActive?: boolean;
  badge?: string | string[];

  // Pagination
  page?: number;
  limit?: number;

  // Sorting
  sortBy?: 'price' | 'discountedPrice' | 'rating' | 'students' | 'duration' | 'discount' | 'popularity' | 'trending' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';

  // Advanced filters
  tags?: string | string[];
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
}

export interface ListCoursesResponse {
  courses: Course[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
  filters: {
    available: {
      categories: Array<{ name: string; count: number }>;
      levels: Array<{ name: string; count: number }>;
      priceRange: { min: number; max: number } | null;
      ratingRange: { min: number; max: number } | null;
      durationRange: { min: number; max: number } | null;
    };
    applied: any;
    stats: {
      totalStudents: number;
      averageRating: number;
      averagePrice: number;
    };
  };
  meta: {
    searchQuery: string | null;
    sortBy: string;
    sortOrder: string;
    timestamp: string;
  };
}

/**
 * Advanced course listing with comprehensive filtering and pagination
 */
export const listCourses = async (
  filters: ListCoursesFilters = {},
  options: GetCoursesOptions = {}
): Promise<ListCoursesResponse> => {
  const params = new URLSearchParams();

  // Add all filters to params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => params.append(key, item.toString()));
      } else {
        params.append(key, value.toString());
      }
    }
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data;
};

/**
 * Quick search for autocomplete and instant results
 */
export interface QuickSearchResult {
  _id: string;
  title: string;
  instructor: string;
  category: string;
  image: string;
  rating: number;
  students: number;
  originalPrice: number;
  discountedPrice?: number;
}

export const quickSearchCourses = async (
  query: string,
  limit: number = 5,
  options: GetCoursesOptions = {}
): Promise<QuickSearchResult[]> => {
  const params = new URLSearchParams({
    q: query,
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/search/quick?${params.toString()}`, config);
  return response.data.data;
};

/**
 * Get similar courses based on various criteria
 */
export const getSimilarCourses = async (
  courseId: string,
  limit: number = 4,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    courseId,
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/similar?${params.toString()}`, config);
  return response.data.data;
};

/**
 * Get courses by multiple categories
 */
export const getCoursesByCategories = async (
  categories: string[],
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    category: categories.join(','),
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};

/**
 * Get trending courses (combination of recent and popular)
 */
export const getTrendingCourses = async (
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    sortBy: 'trending',
    sortOrder: 'desc',
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};

/**
 * Get courses with highest enrollment
 */
export const getPopularCourses = async (
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    sortBy: 'students',
    sortOrder: 'desc',
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};

/**
 * Get newly added courses
 */
export const getNewCourses = async (
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};

/**
 * Get courses with best ratings
 */
export const getTopRatedCourses = async (
  minRating: number = 4,
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    sortBy: 'rating',
    sortOrder: 'desc',
    minRating: minRating.toString(),
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};

/**
 * Get free courses
 */
export const getFreeCourses = async (
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    priceRange: 'free',
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};

/**
 * Get courses with highest discounts
 */
export const getBestDealCourses = async (
  minDiscount: number = 50,
  limit: number = 8,
  options: GetCoursesOptions = {}
): Promise<Course[]> => {
  const params = new URLSearchParams({
    sortBy: 'discount',
    sortOrder: 'desc',
    minDiscountPercentage: minDiscount.toString(),
    limit: limit.toString()
  });

  const config = {
    ...options,
  };

  const response = await api.get(`/courses/listing?${params.toString()}`, config);
  return response.data.data.courses;
};