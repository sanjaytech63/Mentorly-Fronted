import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group" aria-label="Home">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <span className="text-white font-bold text-xl sm:text-2xl">S</span>
      </div>
      <span className="text-lg sm:text-2xl uppercase font-bold text-gray-800">Sanjay</span>
    </Link>
  );
};

export default Logo;
