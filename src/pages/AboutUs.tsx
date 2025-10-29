import React from 'react';
import Section from '../componets/About/Section';
import ContactInfo from '../componets/About/ContactInfo';
import FeatureCard from '../componets/About/FeatureCard';
import { features, missionContent, socialLinks } from '../constants/items';

const AboutUs: React.FC = () => {

    return (
        <div className="about-us">
            <Section
                className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white my-10"
                padding='large'
            >
                <div className="text-center max-w-4xl mx-auto animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        About us
                    </h1>
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
                                            className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1  hover:scale-110`}
                                            aria-label={social.name}
                                        >
                                            <IconComponent className='text-white/80' size={20} />
                                        </a>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </Section>

            <Section padding="large">
                <div className="max-w-4xl mx-auto animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                        {missionContent.title}
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        {missionContent.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </Section>

            <Section
                className="bg-gray-50"
                padding="large"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 animate-fade-in">
                        Why Choose Mentorly?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <FeatureCard {...feature} />
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
            <ContactInfo />
        </div>
    );
};

export default AboutUs;