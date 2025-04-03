import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import PetCard from "../../components/PetCard";
import { useFavorites } from "../../contexts/FavoritesContext";
import { pets } from "../../data/pets";

const FavoritesPage = () => {
  const [favoritePets, setFavoritePets] = useState([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    const filteredPets = pets.filter((pet) => favorites.includes(pet.id));
    setFavoritePets(filteredPets);
  }, [favorites]);

  return (
    <>
      <PageHeader
        title="Meus Pets Favoritos"
        subtitle="Aqui você encontra todos os pets que você marcou como favorito. Acompanhe e compare suas opções antes de tomar a decisão de adotar."
      />
      <div className="container mx-auto px-4">
        {favoritePets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Você ainda não tem pets favoritos. Explore nossa lista de pets e
              adicione alguns aos seus favoritos!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoritePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
