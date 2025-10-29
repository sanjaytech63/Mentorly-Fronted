import React, { useState } from 'react';
import { Card, Button, InputField } from '../index';
import { FaUser } from 'react-icons/fa';
import TextArea from '../componets/TextArea';
import { MdMessage } from 'react-icons/md';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'sanjaywebdev@gmail.com',
      description: 'We reply within 24 hours'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+91-6376024125',
      description: 'Mon to Fri, 9AM to 6PM'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: 'Sector 62, Jaipur',
      description: 'Rajasthan 201309'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    alert('Thank you for your message! We will get back to you within 24 hours.');
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-26 mt-10 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We're here to help you on your learning journey. Reach out to us for any questions about courses, mentorship, or career guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 relative -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                hover={true}
                padding="lg"
              >
                <div className="text-3xl mb-3">
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{method.title}</h3>
                <p className="text-indigo-600 font-semibold mb-1">{method.details}</p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Card
              className=" relative overflow-hidden"
              hover={true}
              padding="lg"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full"></div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Send us a Message</h2>
                <p className="text-gray-600">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label='Full Name *'
                    icon={<FaUser className='text-gray-400' />}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                  <InputField label='Email Address *'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <TextArea
                    label='Message *'
                    id="message"
                    name="message"
                    required
                    rows={8}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className='flex justify-end'>
                  <Button
                    type="submit"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            <div className="space-y-8">
              <Card className='relative'
                hover={true}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-bl-full"></div>

                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                    <span className="text-3xl">📍</span>
                    Visit Our Campus
                  </h2>
                  <p className="text-gray-600">
                    Come visit our state-of-the-art learning facility in Noida
                  </p>
                </div>

                <div className="aspect-w-16 aspect-h-9 h-80 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.223234056201!2d77.3623885753338!3d28.502508875737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce8aa0c5e7c0f%3A0x1c1f74efc74f1b2e!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh%20201309!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mentorly Campus Location"
                  />
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="font-semibold">Mentorly Learning Center</p>
                      <p className="text-sm">Tech Park, Sector 62, Noida, Uttar Pradesh 201309</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;