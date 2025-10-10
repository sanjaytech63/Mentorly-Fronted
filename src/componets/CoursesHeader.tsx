import React from 'react';

export interface CoursesHeaderProps {
  title: string;
  description: string;
}

const CoursesHeader: React.FC<CoursesHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
      <p className="text-lg text-white/90 max-w-2xl mx-auto">{description}</p>
    </div>
  );
};

export default CoursesHeader;
