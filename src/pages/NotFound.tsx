import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { Container, Button } from '../componets/index';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Container size="small">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold text-gray-300">404</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Page not found</h2>
            <p className="text-gray-600 text-lg">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="large"
              onClick={() => window.history.back()}
              className="flex items-center space-x-2"
            >
              <FiArrowLeft size={18} />
              <span>Go back</span>
            </Button>

            <Link to="/">
              <Button
                variant="primary"
                size="large"
                className="flex items-center space-x-2 w-full md:w-auto"
              >
                <FiHome size={18} />
                <span>Go home</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
