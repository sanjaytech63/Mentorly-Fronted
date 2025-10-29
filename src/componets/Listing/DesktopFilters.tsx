import { ListCoursesFilters, ListCoursesResponse } from '../../api/course.service';
import FiltersSidebar from './FiltersSidebar';

interface DesktopFiltersProps {
  filters: ListCoursesFilters;
  availableFilters: ListCoursesResponse['filters']['available'] | null;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onPriceRangeChange: (range: string) => void;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const DesktopFilters: React.FC<DesktopFiltersProps> = props => (
  <div className="hidden lg:block w-80 flex-shrink-0">
    <FiltersSidebar {...props} />
  </div>
);

export default DesktopFilters;
