interface RatingFilterProps {
  selectedRating: number;
  onSelect: (rating: number) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({ selectedRating, onSelect }) => (
  <div>
    <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
    <div className="space-y-2">
      {[4, 3, 2, 1].map(rating => (
        <button
          key={rating}
          onClick={() => onSelect(rating)}
          className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm ${
            selectedRating === rating
              ? 'bg-indigo-100 text-indigo-800 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
            <span className="ml-2">& Up</span>
          </span>
        </button>
      ))}
      <button
        onClick={() => onSelect(0)}
        className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
          selectedRating === 0
            ? 'bg-indigo-100 text-indigo-800 font-medium'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Any Rating
      </button>
    </div>
  </div>
);

export default RatingFilter;
