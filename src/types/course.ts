export interface Course {
  id: string;
  category: string;
  title: string;
  instructor: string;
  originalPrice: number;
  discountedPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  students: number;
  icon?: string;
  badge?: string;
  image:string;
  iconType?: 'ai' | 'cloud' | 'code' | 'chart' | 'design' | 'business';
}

export interface CoursesProps {
  courses?: Course[];
  categories?: string[];
  title?: string;
  description?: string;
  showViewAllButton?: boolean;
}