import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

// Dados mockados para exemplo
const mockPets = [
  {
    id: 1,
    name: "Thor",
    type: "Cachorro",
    breed: "Vira-lata",
    age: "2 anos",
    size: "Médio",
    gender: "Macho",
    description:
      "Cachorro muito dócil e brincalhão, adora crianças e outros animais.",
    images: [
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
    ],
    ongName: "Amigos dos Pets SP",
    location: "São Paulo, SP",
    longDescription: `
      Thor é um cachorro muito especial que chegou à nossa ONG após ser resgatado da rua.
      Ele é extremamente dócil e adora interagir com pessoas e outros animais.
      
      Características:
      • Muito brincalhão
      • Adora crianças
      • Sociável com outros cães
      • Treinado para fazer necessidades no lugar correto
      • Castrado e vacinado
      
      Thor está em busca de um lar amoroso onde possa receber muito carinho e atenção.
      Ele se adapta bem a apartamentos e casas, desde que tenha espaço para brincar.
    `,
    characteristics: [
      "Castrado",
      "Vacinado",
      "Vermifugado",
      "Microchipado",
      "Treinado para fazer necessidades no lugar correto",
      "Sociável com outros animais",
      "Boa com crianças",
    ],
    contact: {
      phone: "(11) 99999-9999",
      email: "contato@amigosdospetssp.com.br",
      address: "Rua dos Pets, 123 - Vila Animal - São Paulo/SP",
    },
    requirements: [
      "Compromisso com o bem-estar do animal",
      "Casa/apartamento adequado para o tamanho do pet",
      "Disponibilidade para passeios diários",
      "Aceitação de visitas pós-adoção",
    ],
  },
  // ... outros pets mockados
];

const PetDetailsPage = () => {
  const { id } = useParams();
  const pet = mockPets.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite.id === pet?.id));
  }, [favorites, pet]);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet não encontrado
          </h1>
          <p className="text-xl text-gray-600">
            O pet que você está procurando não existe ou foi adotado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho com Informações Básicas */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={pet.images[selectedImage]}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {pet.images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {pet.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden ${
                        selectedImage === index ? "ring-2 ring-teal-500" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${pet.name} - Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pet.type}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 mr-2"
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
                <div className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {pet.age}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                  {pet.size}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {pet.gender}
                </div>
              </div>
              <p className="mt-6 text-gray-600">{pet.description}</p>
              <div className="mt-8 space-y-4">
                <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                  Quero Adotar
                </button>
                <button
                  onClick={() => toggleFavorite(pet)}
                  className="w-full border-2 border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isFavorite ? (
                    <>
                      <HeartIconSolid className="h-5 w-5" />
                      Remover dos Favoritos
                    </>
                  ) : (
                    <>
                      <HeartIcon className="h-5 w-5" />
                      Adicionar aos Favoritos
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sobre o {pet.name}
              </h2>
              <div className="prose prose-lg max-w-none">
                {pet.longDescription.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Características
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pet.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-teal-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requisitos para Adoção
              </h2>
              <ul className="space-y-4">
                {pet.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-teal-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informações de Contato
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="h-6 w-6 text-teal-500 mr-2 mt-1"
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
                  <div>
                    <p className="font-medium text-gray-900">{pet.ongName}</p>
                    <p className="text-gray-600">{pet.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-6 w-6 text-teal-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${pet.contact.phone}`}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    {pet.contact.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-6 w-6 text-teal-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${pet.contact.email}`}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    {pet.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
