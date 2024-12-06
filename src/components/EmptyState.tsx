import React from 'react';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="text-gray-600 bg-gray-50 p-4 rounded-lg text-center">
    <p>{message}</p>
  </div>
);