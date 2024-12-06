import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PhotoGrid } from './components/PhotoGrid';
import { Layout } from './components/Layout';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { usePhotos } from './hooks/usePhotos';
import { useFavoriteStore } from './store/favoriteStore';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavoriteStore();
  const { photos, isLoading, error } = usePhotos(searchQuery);

  const renderContent = () => {
    if (showFavorites) {
      return favorites.length > 0 ? (
        <PhotoGrid photos={favorites} />
      ) : (
        <EmptyState message="No favorite photos yet. Heart some photos to add them here!" />
      );
    }

    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState />;
    }

    if (!searchQuery) {
      return <EmptyState message="Start typing to search for photos" />;
    }

    if (photos.length === 0) {
      return <EmptyState message="No photos found. Try a different search term." />;
    }

    return <PhotoGrid photos={photos} />;
  };

  return (
    <Layout
      searchBar={<SearchBar onSearch={setSearchQuery} />}
      showFavorites={showFavorites}
      onToggleFavorites={() => setShowFavorites(!showFavorites)}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;