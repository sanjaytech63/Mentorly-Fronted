import React from 'react';
import { Card, Button } from '../index';
import Section from '../componets/About/Section';
import { featuredResources, resourceCategories } from '../constants/items';
import { useNavigate } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNaviget = () => {
        navigate("/courses")
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative py-40 bg-gradient-to-r from-indigo-600 to-purple-700">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Learning Resources
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Discover expertly curated resources, guides, and learning paths to accelerate your career in technology
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button variant="secondary" size='large' className='!rounded-full'>
                                🚀 Start Learning Free
                            </Button>
                            <Button onClick={handleNaviget} variant='secondary' size='large' className='!rounded-full'>
                                📚 Browse All Courses
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative -mt-16">
                <Section padding="large" className='bg-gray-50'>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Featured Learning Paths
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Hand-picked resources to kickstart your journey in high-demand tech fields
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                            {featuredResources.map((resource, index) => (
                                <Card
                                    key={index}
                                    className="group relative overflow-hidden border border-gray-200 shadow-none  duration-500"
                                    hover={true}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full"></div>
                                    <div className="text-4xl mb-4 transform  transition-transform duration-300">
                                        {resource.icon}
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${resource.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                                            resource.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {resource.level}
                                        </span>
                                        <span className="text-sm text-gray-500">{resource.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {resource.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {resource.description}
                                    </p>
                                    <Button size='small' onClick={handleNaviget} className="w-full -mb-2">
                                        Explore Path
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* All Categories */}
                <Section className="bg-white/50 backdrop-blur-sm" padding="large">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Explore All Categories
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Comprehensive resources across all major technology domains
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {resourceCategories.map((category, index) => (
                                <Card
                                    key={index}
                                    className="group relative overflow-hidden border border-gray-200 shadow-none  duration-500"
                                    hover={true}
                                    padding="lg"
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full"></div>
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {category.icon}
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                            Category
                                        </span>
                                        <span className="text-sm text-gray-500">{category.items.length} Resources</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {category.description}
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {category.items.slice(0, 3).map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start">
                                                <div className="flex-shrink-0 w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                                </div>
                                                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                        {category.items.length > 3 && (
                                            <li className="text-indigo-600 text-sm font-medium">
                                                +{category.items.length - 3} more resources...
                                            </li>
                                        )}
                                    </ul>
                                    <Button onClick={handleNaviget} className="w-full -mb-2">
                                        Explore {category.title}
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* CTA Section */}
                <div className="">
                    <Card className="group relative overflow-hidden border-0 py-10 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-none  transition-all duration-500" padding="lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
                        <div className="relative text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Transform Your Career?
                            </h2>
                            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of learners who have accelerated their careers with Mentorly's expert-guided resources and community support.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    variant='secondary'
                                    size="large"
                                >
                                    🚀 Get Started Free
                                </Button>
                                <Button
                                    size="large" variant='secondary'
                                >
                                    📞 Book Career Consultation
                                </Button>
                            </div>
                            <div className="mt-8 text-white/90">
                                <p>⭐ 4.9/5 rating from 10,000+ students</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;