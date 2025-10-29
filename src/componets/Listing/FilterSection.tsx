interface FilterSectionProps {
    title: string;
    options: Array<{ value: string; label: string; count?: number }>;
    selectedValue: string | string[];
    onSelect: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    options,
    selectedValue,
    onSelect
}) => (
    <div>
        <h4 className="font-semibold text-gray-900 mb-3">{title}</h4>
        <div className="space-y-2">
            {options?.map(option => (
                <button
                    key={option.value}
                    onClick={() => onSelect(option.value)}
                    className={`flex items-center justify-between w-full capitalize text-left px-3 py-2 rounded-lg text-sm ${selectedValue === option.value
                        ? 'bg-indigo-100 text-indigo-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                        <span className="text-gray-500 text-xs">({option.count})</span>
                    )}
                </button>
            ))}
        </div>
    </div>
);

export default FilterSection;