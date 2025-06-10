
import React from 'react';

interface QuestionCheckboxGridProps {
  options: string[];
  selectedValues: string[];
  onChange: (value: string) => void;
  columns?: number;
}

const QuestionCheckboxGrid: React.FC<QuestionCheckboxGridProps> = ({ 
  options, 
  selectedValues, 
  onChange, 
  columns = 3 
}) => {
  const gridClass = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-3`}>
      {options.map(option => (
        <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(option)}
            className="text-orange-500 focus:ring-orange-500"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default QuestionCheckboxGrid;
