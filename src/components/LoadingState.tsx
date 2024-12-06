import React from 'react';

export const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center w-full py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);