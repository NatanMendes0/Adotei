import { createContext, useContext, useEffect, useState } from "react";
import { getFavorites } from "../data/favorites";

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

  return (
    <FavoritesContext.Provider value={{ favorites, updateFavorites }}>
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
