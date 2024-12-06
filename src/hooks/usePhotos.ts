import { useState, useEffect, useCallback } from 'react';
import { searchPhotos } from '../services/api';
import { UnsplashPhoto } from '../types/photo';

export const usePhotos = (searchQuery: string) => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    if (!searchQuery) {
      setPhotos([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchPhotos(searchQuery);
      setPhotos(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch photos');
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPhotos();
    }, 500); // Debounce search requests

    return () => clearTimeout(timeoutId);
  }, [fetchPhotos]);

  return { photos, isLoading, error };
};