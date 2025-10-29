import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'small' | 'medium' | 'large';
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', padding = 'medium', id }) => {
  const paddingClasses = {
    small: 'py-8',
    medium: 'py-12',
    large: 'py-16 md:py-24',
  };

  return (
    <section id={id} className={`${paddingClasses[padding]} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

export default Section;
