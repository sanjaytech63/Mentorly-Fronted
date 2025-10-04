import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { Container, Button, InputField } from '../componets/index';
import { contactMethods, helpCategories } from '../constants/items';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <InputField
            type="search"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={e => setSearchQuery('')}
            className=""
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl  p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to="#"
                        className="text-indigo-600 hover:text-indigo-700 hover:underline text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* <div className="bg-white rounded-2xl  p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contact Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => {
                            const IconComponent = method.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                                    <p className="text-gray-600 mb-3 text-sm">{method.description}</p>
                                    <p className="text-indigo-600 font-medium mb-4">{method.contact}</p>
                                    <div className='flex items-center justify-center'>
                                        <Button
                                        size="small"
                                        onClick={() => window.open(method.action, '_self')}
                                    >
                                        Contact Now
                                    </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div> */}

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Check out our comprehensive FAQ section for more answers.
          </p>
          <div className="flex items-center justify-center">
            <Link to="/faq">
              <Button variant="primary" size="large">
                Visit FAQ Page
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Help;
