import React from 'react';
import {
    FaRobot,
    FaCloud,
    FaCode,
    FaChartLine,
    FaPalette,
    FaBriefcase,
    FaStar
} from 'react-icons/fa';

export interface CourseIconProps {
    type?: 'ai' | 'cloud' | 'code' | 'chart' | 'design' | 'business' | 'default';
    icon?: string;
    size?: 'sm' | 'md' | 'lg';
}

const CourseIcon: React.FC<CourseIconProps> = ({
    type = 'default',
    icon,
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const iconClasses = {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl'
    };

    const getIcon = () => {
        if (icon) {
            return <span className={`font-bold ${iconClasses[size]}`}>{icon}</span>;
        }

        const iconProps = { className: iconClasses[size] };

        switch (type) {
            case 'ai':
                return <FaRobot {...iconProps} />;
            case 'cloud':
                return <FaCloud {...iconProps} />;
            case 'code':
                return <FaCode {...iconProps} />;
            case 'chart':
                return <FaChartLine {...iconProps} />;
            case 'design':
                return <FaPalette {...iconProps} />;
            case 'business':
                return <FaBriefcase {...iconProps} />;
            default:
                return <FaStar {...iconProps} />;
        }
    };

    return (
        <div className={`${sizeClasses[size]} bg-blue-100 rounded-lg flex items-center justify-center text-blue-600`}>
            {getIcon()}
        </div>
    );
};

export default CourseIcon;