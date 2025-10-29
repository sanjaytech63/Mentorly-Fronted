import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

interface MobileFilterToggleProps {
  activeFiltersCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onShowFilters: () => void;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({
  activeFiltersCount,
  viewMode,
  onViewModeChange,
  onShowFilters,
}) => (
  <div className="lg:hidden flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm">
    <button
      onClick={onShowFilters}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
    >
      <FiFilter className="w-4 h-4" />
      Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
    </button>

    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
      >
        <FiGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600'}`}
      >
        <FiList className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default MobileFilterToggle;
