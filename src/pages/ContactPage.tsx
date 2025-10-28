import React, { useState } from 'react';
import {
    Container,
    Card,
    Button,

    Badge,
    InputField,
    Loader
} from '../index';
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiClock,
    FiSend,
    FiCheckCircle,
    FiAlertCircle
} from 'react-icons/fi';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Replace with actual API call
            // await submitContactForm(formData);

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: FiMail,
            title: 'Email Us',
            details: 'support@edupath.com',
            description: 'Send us an email anytime',
            badge: 'Fast Response'
        },
        {
            icon: FiPhone,
            title: 'Call Us',
            details: '+1 (555) 123-4567',
            description: 'Mon to Fri, 9am to 6pm',
            badge: '24/7 Support'
        },
        {
            icon: FiClock,
            title: 'Business Hours',
            details: 'Monday - Friday: 9:00 - 18:00',
            description: 'Weekend: 10:00 - 16:00',
            badge: 'Available'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Container>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <Badge variant="primary" className="mb-4">
                        Get In Touch
                    </Badge>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions about our courses? We're here to help and answer any questions you might have.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <item.icon className="w-6 h-6 text-indigo-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                                <Badge variant="success" size="sm">
                                                    {item.badge}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-900 font-medium mb-1">{item.details}</p>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Send us a Message
                                </h2>
                                <p className="text-gray-600">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                    <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-green-800">Message sent successfully!</p>
                                        <p className="text-green-700 text-sm">
                                            Thank you for contacting us. We'll get back to you within 24 hours.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                    <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-red-800">Failed to send message</p>
                                        <p className="text-red-700 text-sm">
                                            Please try again later or contact us directly.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />

                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />

                                    <InputField
                                        label="Subject"
                                        name="subject"
                                        type="text"
                                        placeholder="What is this regarding?"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <InputField
                                    label="Your Message"
                                    name="message"
                                    placeholder="Tell us how we can help you..."
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />

                                <Button
                                    type="submit"
                                    className="w-full md:w-auto min-w-[200px]"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader size="medium" className="mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="w-4 h-4 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Card>
                      
                    </div>
                </div>

                {/* Map Section */}
                <section className="mt-16">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Location</h2>
                                <p className="text-gray-600">Visit our office for a personal consultation</p>
                            </div>
                            <Button variant="outline">
                                <FiMapPin className="w-4 h-4 mr-2" />
                                Get Directions
                            </Button>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                            <div className="text-center">
                                <FiMapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 font-medium">Interactive Map</p>
                                <p className="text-gray-400 text-sm">123 Education Street, Learning City</p>
                            </div>
                        </div>
                    </Card>
                </section>
            </Container>
        </div>
    );
};

export default ContactPage;