import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Volcano } from '../types/volcano';

interface BookmarksContextType {
  bookmarkedVolcanoes: Volcano[];
  addBookmark: (volcano: Volcano) => void;
  removeBookmark: (volcanoId: string) => void;
  isBookmarked: (volcanoId: string) => boolean;
  toggleBookmark: (volcano: Volcano) => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedVolcanoes, setBookmarkedVolcanoes] = useState<Volcano[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem('bookmarkedVolcanoes');
      if (savedBookmarks) {
        setBookmarkedVolcanoes(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const saveBookmarks = async (bookmarks: Volcano[]) => {
    try {
      await AsyncStorage.setItem('bookmarkedVolcanoes', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const addBookmark = (volcano: Volcano) => {
    const updatedBookmarks = [...bookmarkedVolcanoes, volcano];
    setBookmarkedVolcanoes(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const removeBookmark = (volcanoId: string) => {
    const updatedBookmarks = bookmarkedVolcanoes.filter(v => v.id !== volcanoId);
    setBookmarkedVolcanoes(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  const isBookmarked = (volcanoId: string) => {
    return bookmarkedVolcanoes.some(v => v.id === volcanoId);
  };

  const toggleBookmark = (volcano: Volcano) => {
    if (isBookmarked(volcano.id)) {
      removeBookmark(volcano.id);
    } else {
      addBookmark(volcano);
    }
  };

  const value: BookmarksContextType = {
    bookmarkedVolcanoes,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};
