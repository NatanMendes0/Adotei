import Cookies from "js-cookie";

const FAVORITES_COOKIE_NAME = "favoritePets";

export const getFavorites = () => {
  const favoritesJson = Cookies.get(FAVORITES_COOKIE_NAME);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};

export const addToFavorites = (petId) => {
  const favorites = getFavorites();
  if (!favorites.includes(petId)) {
    favorites.push(petId);
    Cookies.set(FAVORITES_COOKIE_NAME, JSON.stringify(favorites), {
      expires: 365,
    });
  }
};

export const removeFromFavorites = (petId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((id) => id !== petId);
  Cookies.set(FAVORITES_COOKIE_NAME, JSON.stringify(updatedFavorites), {
    expires: 365,
  });
};

export const isFavorite = (petId) => {
  const favorites = getFavorites();
  return favorites.includes(petId);
};
