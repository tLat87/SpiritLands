import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Volcano, Aircraft } from '../types/volcano';

interface BookmarksContextType {
  bookmarkedAircraft: Aircraft[];
  addBookmark: (aircraft: Aircraft) => void;
  removeBookmark: (aircraftId: string) => void;
  isBookmarked: (aircraftId: string) => boolean;
  toggleBookmark: (aircraft: Aircraft) => void;
  // Keep old methods for backward compatibility
  bookmarkedVolcanoes: Volcano[];
  addVolcanoBookmark: (volcano: Volcano) => void;
  removeVolcanoBookmark: (volcanoId: string) => void;
  isVolcanoBookmarked: (volcanoId: string) => boolean;
  toggleVolcanoBookmark: (volcano: Volcano) => void;
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
  const [bookmarkedAircraft, setBookmarkedAircraft] = useState<Aircraft[]>([]);
  const [bookmarkedVolcanoes, setBookmarkedVolcanoes] = useState<Volcano[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedAircraftBookmarks = await AsyncStorage.getItem('bookmarkedAircraft');
      if (savedAircraftBookmarks) {
        setBookmarkedAircraft(JSON.parse(savedAircraftBookmarks));
      }
      
      const savedVolcanoBookmarks = await AsyncStorage.getItem('bookmarkedVolcanoes');
      if (savedVolcanoBookmarks) {
        setBookmarkedVolcanoes(JSON.parse(savedVolcanoBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const saveAircraftBookmarks = async (bookmarks: Aircraft[]) => {
    try {
      await AsyncStorage.setItem('bookmarkedAircraft', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving aircraft bookmarks:', error);
    }
  };

  const saveVolcanoBookmarks = async (bookmarks: Volcano[]) => {
    try {
      await AsyncStorage.setItem('bookmarkedVolcanoes', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving volcano bookmarks:', error);
    }
  };

  // Aircraft methods
  const addBookmark = (aircraft: Aircraft) => {
    const updatedBookmarks = [...bookmarkedAircraft, aircraft];
    setBookmarkedAircraft(updatedBookmarks);
    saveAircraftBookmarks(updatedBookmarks);
  };

  const removeBookmark = (aircraftId: string) => {
    const updatedBookmarks = bookmarkedAircraft.filter(a => a.id !== aircraftId);
    setBookmarkedAircraft(updatedBookmarks);
    saveAircraftBookmarks(updatedBookmarks);
  };

  const isBookmarked = (aircraftId: string) => {
    return bookmarkedAircraft.some(a => a.id === aircraftId);
  };

  const toggleBookmark = (aircraft: Aircraft) => {
    if (isBookmarked(aircraft.id)) {
      removeBookmark(aircraft.id);
    } else {
      addBookmark(aircraft);
    }
  };

  // Volcano methods (for backward compatibility)
  const addVolcanoBookmark = (volcano: Volcano) => {
    const updatedBookmarks = [...bookmarkedVolcanoes, volcano];
    setBookmarkedVolcanoes(updatedBookmarks);
    saveVolcanoBookmarks(updatedBookmarks);
  };

  const removeVolcanoBookmark = (volcanoId: string) => {
    const updatedBookmarks = bookmarkedVolcanoes.filter(v => v.id !== volcanoId);
    setBookmarkedVolcanoes(updatedBookmarks);
    saveVolcanoBookmarks(updatedBookmarks);
  };

  const isVolcanoBookmarked = (volcanoId: string) => {
    return bookmarkedVolcanoes.some(v => v.id === volcanoId);
  };

  const toggleVolcanoBookmark = (volcano: Volcano) => {
    if (isVolcanoBookmarked(volcano.id)) {
      removeVolcanoBookmark(volcano.id);
    } else {
      addVolcanoBookmark(volcano);
    }
  };

  const value: BookmarksContextType = {
    bookmarkedAircraft,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    bookmarkedVolcanoes,
    addVolcanoBookmark,
    removeVolcanoBookmark,
    isVolcanoBookmarked,
    toggleVolcanoBookmark,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
};
