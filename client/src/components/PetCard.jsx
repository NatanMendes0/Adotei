import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "../data/favorites";
import ConfirmationModal from "./ConfirmationModal";

const PetCard = ({ pet }) => {
  const [favorite, setFavorite] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { updateFavorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    setFavorite(isFavorite(pet.id));
  }, [pet.id]);

  const handleFavoriteClick = () => {
    if (favorite) {
      setShowConfirmation(true);
    } else {
      addToFavorites(pet.id);
      setFavorite(true);
      updateFavorites();
    }
  };

  const handleConfirmRemove = () => {
    removeFromFavorites(pet.id);
    setFavorite(false);
    updateFavorites();
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <Link to={`/pets/${pet.id}`}>
          <div className="relative">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-72 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                {pet.age}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(pet);
                }}
                className={`bg-white p-2 rounded-full shadow-md transition-colors ${
                  favorite ? "hover:bg-red-50" : "hover:bg-gray-50"
                }`}
              >
                {favorite ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-600 hover:text-red-500" />
                )}
              </button>
            </div>
          </div>
        </Link>

        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <Link
                to={`/pets/${pet.id}`}
                className="text-xl font-semibold text-gray-900 hover:text-teal-600 transition-colors"
              >
                {pet.name}
              </Link>
              <p className="text-sm text-gray-600">{pet.breed}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pet.gender === "Macho"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-pink-100 text-pink-800"
                }`}
              >
                {pet.gender}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pet.type === "Cachorro"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {pet.type}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {pet.location}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {pet.ongName}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 text-teal-600 hover:text-teal-700 text-sm font-medium border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors">
              Detalhes
            </button>
            <Link
              to={`/adotar/${pet.id}`}
              className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium text-center"
            >
              Quero adotar
            </Link>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmRemove}
        title="Remover dos Favoritos"
        message={`Tem certeza que deseja remover ${pet.name} dos seus favoritos?`}
      />
    </>
  );
};

export default PetCard;
