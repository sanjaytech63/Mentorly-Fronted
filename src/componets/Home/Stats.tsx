import React from 'react';
import { FaChalkboardTeacher, FaUsers, FaStar } from 'react-icons/fa';
import Container from '../Container';

interface StatItem {
    id: string;
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface StatsProps {
    title?: string;
    subtitle?: string;
    stats?: StatItem[];
    background?: 'light' | 'dark' | 'gradient';
    centered?: boolean;
}

const Stats: React.FC<StatsProps> = ({
    title = "Thousands Of",
    subtitle = "Authored By Industry Experts",
    stats = defaultStats,
    background = 'light',
    centered = true
}) => {
    const backgroundClasses = {
        light: 'bg-white',
        dark: 'bg-gray-900',
        gradient: 'bg-gradient-to-r from-blue-50 to-indigo-100'
    };

    const textClasses = {
        light: 'text-gray-900',
        dark: 'text-white',
        gradient: 'text-gray-900'
    };

    const subtitleClasses = {
        light: 'text-gray-600',
        dark: 'text-gray-300',
        gradient: 'text-gray-600'
    };

    return (
        <section className={`w-full py-6 lg:py-0 mb-10 md:mb-20 ${backgroundClasses[background]}`}>
            <Container >
                <div className={`text-${centered ? 'center' : 'left'} mb-12 lg:mb-16`}>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textClasses[background]} mb-4`}>
                        {title} <span className="bg-[#FFC224] px-2 rounded-md">Courses</span>
                    </h2>
                    <p className={`text-lg md:text-xl ${subtitleClasses[background]} max-w-2xl ${centered ? 'mx-auto' : ''}`}>
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className={`text-${centered ? 'center' : 'left'} group hover:transform hover:scale-105 transition-all duration-300`}
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="text-2xl text-white" />
                            </div>

                            <div className={`text-4xl md:text-5xl lg:text-6xl font-bold ${textClasses[background]} mb-2`}>
                                {stat.value}
                            </div>

                            <div className={`text-lg md:text-xl font-semibold ${subtitleClasses[background]}`}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

const defaultStats: StatItem[] = [
    {
        id: '1',
        value: '45K+',
        label: 'Active Students',
        icon: FaUsers,
        color: 'bg-blue-600'
    },
    {
        id: '2',
        value: '328+',
        label: 'Best Instructors',
        icon: FaChalkboardTeacher,
        color: 'bg-green-600'
    },
    {
        id: '3',
        value: '1K+',
        label: 'Premium Courses',
        icon: FaStar,
        color: 'bg-purple-600'
    }
];

export default Stats;