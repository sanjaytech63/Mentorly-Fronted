import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group" aria-label="Home">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center   duration-300">
        <span className="text-white font-bold text-xl sm:text-xl">M</span>
      </div>
      <span className="text-lg sm:text-xl uppercase font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text flex">
        Mentorly
      </span>
    </Link>
  );
};

export default Logo;
