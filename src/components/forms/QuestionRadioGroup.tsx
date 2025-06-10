
import React from 'react';

interface QuestionRadioGroupProps {
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  columns?: number;
}

const QuestionRadioGroup: React.FC<QuestionRadioGroupProps> = ({ 
  name, 
  options, 
  selectedValue, 
  onChange, 
  columns = 1 
}) => {
  const gridClass = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-2 md:grid-cols-3' : 'space-y-2';
  const containerClass = columns > 1 ? `grid ${gridClass} gap-3` : 'space-y-2';

  return (
    <div className={containerClass}>
      {options.map(option => (
        <label key={option} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={(e) => onChange(e.target.value)}
            className="text-orange-500 focus:ring-orange-500"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default QuestionRadioGroup;
