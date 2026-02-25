import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

  // Load favorites from localStorage on first render
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a book to favorites if it's not already there
  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (!prev.find((b) => b.id === book.id)) {
        return [...prev, book];
      }
      return prev;
    });
  };

  // Remove a book from favorites by its ID
  const removeFavorite = (bookId) => {
    setFavorites((prev) => prev.filter((b) => b.id !== bookId));
  };

  const isFavorite = (bookId) => {
    return favorites.some((b) => b.id === bookId);
  };

  // Provide favorites and manipulation functions to context consumers
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for easy access to favorites context
export const useFavorites = () => useContext(FavoritesContext);