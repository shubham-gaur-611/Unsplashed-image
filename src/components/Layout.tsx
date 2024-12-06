import React from 'react';
import { Icons } from './icons';
import { useFavoriteStore } from '../store/favoriteStore';

interface LayoutProps {
  children: React.ReactNode;
  searchBar: React.ReactNode;
  showFavorites: boolean;
  onToggleFavorites: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  searchBar,
  showFavorites,
  onToggleFavorites,
}) => {
  const { favorites } = useFavoriteStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unsplash Photo Search</h1>
          <div className="flex items-center space-x-4 mb-6">
            {searchBar}
            <button
              onClick={onToggleFavorites}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                showFavorites
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {showFavorites ? (
                <>
                  <Icons.Image className="w-5 h-5 mr-2" />
                  Show All
                </>
              ) : (
                <>
                  <Icons.Heart className="w-5 h-5 mr-2" />
                  Favorites ({favorites.length})
                </>
              )}
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};