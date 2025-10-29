import React, { useState, useEffect } from 'react';
import { Card } from '../index';
import { socialLinks } from '../constants/items';

interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ComingSoon: React.FC = () => {
    const [countdown, setCountdown] = useState<CountdownTime>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate.getTime() - now;

            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: '🚀',
            title: 'AI-Powered Learning',
            description: 'Personalized learning paths with artificial intelligence'
        },
        {
            icon: '👨‍🏫',
            title: 'Expert Mentors',
            description: 'Learn from industry professionals and experienced mentors'
        },
        {
            icon: '💼',
            title: 'Career Support',
            description: 'Get job-ready with our comprehensive career services'
        },
        {
            icon: '📚',
            title: 'Rich Content',
            description: 'Access to extensive library of courses and resources'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center mt-16 p-4">
            <div className="max-w-6xl mx-auto text-center">

                {/* Main Content */}
                <div className="my-16 ">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                        <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse"></div>
                        <span className="text-white/80 text-sm font-medium">Coming Soon</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                        <span className="text-white/90">
                            Mentorly
                        </span>
                        <span className="block text-2xl md:text-3xl text-white/80 mt-4">
                            Next Generation Learning Platform
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                        We're building something amazing to revolutionize your learning experience.
                        Get ready to transform your career with cutting-edge technology and expert guidance.
                    </p>
                </div>

                {/* Countdown Timer */}
                <div className="mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        {Object.entries(countdown).map(([key, value]) => (
                            <Card
                                key={key}
                                className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500"
                                padding="lg"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {value.toString().padStart(2, '0')}
                                </div>
                                <div className="text-white/70 text-sm font-medium uppercase tracking-wider">
                                    {key}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                        What's Coming
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 "
                                hover={true}
                                padding="lg"
                            >
                                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className='flex justify-center items-center pt-2'>
                    <div className="flex flex-wrap gap-4">
                        {socialLinks &&
                            socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1  hover:scale-110`}
                                        aria-label={social.name}
                                    >
                                        <IconComponent className='text-white/80' size={20} />
                                    </a>
                                );
                            })}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <p className="text-white/50">
                        © 2025 Mentorly. All rights reserved.
                        <span className="block text-sm mt-2">
                            Transforming education through technology and mentorship.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;