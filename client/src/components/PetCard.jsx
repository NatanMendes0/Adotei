import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          >
            {favorite ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {pet.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">{pet.breed}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{pet.age}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {pet.description}
          </p>

          <div className="flex gap-2">
            <Link
              to={`/pets/${pet.id}`}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              Detalhes
            </Link>
            <Link
              to={`/adotar/${pet.id}`}
              className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium text-center"
            >
              Quero adotar
            </Link>
          </div>
        </div>
      </motion.div>

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
