import React from 'react';
import { Icons } from './icons';
import { UnsplashPhoto } from '../types/photo';
import { useFavoriteStore } from '../store/favoriteStore';

interface PhotoGridProps {
  photos: UnsplashPhoto[];
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  const toggleFavorite = (photo: UnsplashPhoto) => {
    if (isFavorite(photo.id)) {
      removeFavorite(photo.id);
    } else {
      addFavorite(photo);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="relative group">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200" />
          <button
            onClick={() => toggleFavorite(photo)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <Icons.Heart
              className={`h-5 w-5 ${
                isFavorite(photo.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <p className="text-white text-sm">Photo by {photo.user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};