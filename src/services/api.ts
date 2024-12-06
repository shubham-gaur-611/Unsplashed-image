import axios from 'axios';
import { UnsplashPhoto } from '../types/photo';

const UNSPLASH_ACCESS_KEY = 'CglVzOI3BwgZDRThBwPQ9TqM9ouKSOdoGsuBFWE44l0';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const searchPhotos = async (query: string): Promise<UnsplashPhoto[]> => {
  try {
    const response = await api.get('/search/photos', {
      params: {
        query,
        per_page: 20,
      },
    });
    
    return response.data.results.map((photo: any) => ({
      id: photo.id,
      urls: {
        regular: photo.urls.regular,
        small: photo.urls.small,
      },
      alt_description: photo.alt_description || '',
      user: {
        name: photo.user.name,
      },
    }));
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw new Error('Failed to fetch photos');
  }
};