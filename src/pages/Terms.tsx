import React from 'react';
import { Container } from '../index';
import { sectionstrems } from '../constants/items';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50  py-28">
      <Container size="small">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Effective date:{' '}
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
              Please read these terms of service carefully before using our service operated by us.
            </p>

            {sectionstrems.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}

            <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
              <p className="text-yellow-800">
                If you do not agree with any of these terms, you are prohibited from using or
                accessing this service. The materials contained in this service are protected by
                applicable copyright and trademark law.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Terms;
