import React from 'react';
import { Container } from '../componets/index';
import { sections } from '../constants/items';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Container size="small">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl  p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Your privacy is important to us. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our service.
            </p>

            {sections?.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Contact Us</h3>
              <p className="text-blue-800">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@sanjay.dev" className="text-blue-600 hover:underline">
                  privacy@sanjay.dev
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;
