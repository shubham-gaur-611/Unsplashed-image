import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnsplashPhoto } from '../types/photo';

interface FavoriteStore {
  favorites: UnsplashPhoto[];
  addFavorite: (photo: UnsplashPhoto) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (photo) =>
        set((state) => ({
          favorites: [...state.favorites, photo],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((photo) => photo.id !== id),
        })),
      isFavorite: (id) =>
        get().favorites.some((photo) => photo.id === id),
    }),
    {
      name: 'photo-favorites',
    }
  )
);