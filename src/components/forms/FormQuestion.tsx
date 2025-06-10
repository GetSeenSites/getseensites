
import React from 'react';

interface FormQuestionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const FormQuestion: React.FC<FormQuestionProps> = ({ number, title, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        {number}. {title}
      </h3>
      {children}
    </div>
  );
};

export default FormQuestion;
