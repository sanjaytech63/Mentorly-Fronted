import React from 'react';
import { Loader } from '../index';

const GlobalLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader size="medium" label="Loading..." />{' '}
    </div>
  );
};

export default GlobalLoader;
