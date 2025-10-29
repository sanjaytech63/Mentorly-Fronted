import React from 'react';

type IconName = 'course' | 'trainer' | 'location' | 'calendar' | 'phone' | 'email' | 'website';

interface IconProps {
  name: IconName;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  const icons: Record<IconName, string> = {
    course: '🎯',
    trainer: '👨‍🏫',
    location: '📍',
    calendar: '📅',
    phone: '📞',
    email: '✉️',
    website: '🌐',
  };

  return (
    <span className={`${sizeClasses[size]} ${className} inline-flex items-center justify-center`}>
      {icons[name]}
    </span>
  );
};

export default Icon;
