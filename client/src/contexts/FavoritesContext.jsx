import { createContext, useContext, useEffect, useState } from "react";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../data/favorites";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritePets = getFavorites();
    setFavorites(favoritePets);
  }, []);

  const updateFavorites = () => {
    const favoritePets = getFavorites();
    setFavorites(favoritePets);
  };

  const toggleFavorite = (petId) => {
    const currentFavorites = getFavorites();
    if (currentFavorites.includes(petId)) {
      removeFromFavorites(petId);
    } else {
      addToFavorites(petId);
    }
    updateFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, updateFavorites, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de um FavoritesProvider"
    );
  }
  return context;
};
