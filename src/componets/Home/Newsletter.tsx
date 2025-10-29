import React, { useState } from 'react';
import { Button, Container, InputField } from '../../index';
import { RiMailSendLine } from 'react-icons/ri';
import { handleError, handleSuccess } from '../../utils/toastHandler';
import { subscribeApi } from '../../api/subscribeService';

interface SimpleNewsletterProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
}

const Newsletter: React.FC<SimpleNewsletterProps> = ({
  title = 'Stay Ahead with Our Latest Updates',
  subtitle = 'Get exclusive access to new courses, study materials, and educational insights',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe Now',
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const msg: any = await subscribeApi(email);
      handleSuccess(msg.message || '');
      setEmail('');
    } catch (err: any) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (value: any) => {
    try {
      if (value && value.target && value.target.value !== undefined) {
        setEmail(value.target.value);
      } else if (typeof value === 'string') {
        setEmail(value);
      } else if (value && value.value !== undefined) {
        setEmail(value.value);
      } else if (value && value.detail && value.detail.value !== undefined) {
        setEmail(value.detail.value);
      } else {
        console.warn('Unexpected onChange value format:', value);
      }
    } catch (error) {
      console.error('Error handling email change:', error);
    }
  };

  return (
    <section className="w-full py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <RiMailSendLine className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>

            <p className="text-gray-100 mb-12 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-2xl"
              >
                <InputField
                  type="email"
                  placeholder={placeholder}
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="flex-1 rounded-lg placeholder:text-gray-900 text-gray-800 text-lg min-w-0 w-full sm:w-auto"
                />
                <Button
                  isLoading={loading}
                  type="submit"
                  variant="secondary"
                  className="whitespace-nowrap md:w-fit w-auto py-3 text-lg"
                >
                  {buttonText}
                </Button>
              </form>
            </div>

            <p className="text-gray-100 text-sm mt-6 max-w-md mx-auto">
              ✨ Join 10,000+ students who stay updated with our newsletter
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
