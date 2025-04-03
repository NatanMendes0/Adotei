import { useState } from "react";
import ServiceCard from "../components/ServiceCard";

// Dados mockados para exemplo
const mockServices = [
  {
    id: 1,
    title: "Banho e Tosa",
    description:
      "Serviço completo de banho e tosa para cães e gatos, incluindo corte de unhas e limpeza de ouvidos.",
    price: 80.0,
    isFree: false,
    location: "São Paulo, SP",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "Banho e Tosa",
    ongName: "Amigos dos Pets SP",
  },
  {
    id: 2,
    title: "Consulta Veterinária",
    description:
      "Consulta veterinária completa com exames básicos e orientações sobre cuidados com o pet.",
    price: 150.0,
    isFree: false,
    location: "Rio de Janeiro, RJ",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "Saúde",
    ongName: "Vet Solidário RJ",
  },
  {
    id: 3,
    title: "Adestramento Básico",
    description:
      "Aulas de adestramento básico para filhotes e cães adultos, focando em comandos essenciais.",
    price: 120.0,
    isFree: false,
    location: "Belo Horizonte, MG",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "Adestramento",
    ongName: "Cão Companheiro BH",
  },
  {
    id: 4,
    title: "Doação de Ração",
    description:
      "Doação de ração para pets em situação de vulnerabilidade. Entrega disponível em algumas regiões.",
    price: 0,
    isFree: true,
    location: "Curitiba, PR",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    category: "Doações",
    ongName: "Patas Solidárias",
  },
];

const categories = [
  "Todos",
  "Banho e Tosa",
  "Saúde",
  "Adestramento",
  "Doações",
  "Hospedagem",
  "Transporte",
];

const ServicosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [priceFilter, setPriceFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = mockServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "Todos" || service.category === selectedCategory;
    const matchesPrice =
      priceFilter === "Todos" ||
      (priceFilter === "Gratuitos" && service.isFree) ||
      (priceFilter === "Pagamento" && !service.isFree);
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Serviços para Pets
          </h1>
          <p className="text-xl text-gray-600">
            Encontre os melhores serviços para seu pet, desde banho e tosa até
            consultas veterinárias.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Busca */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Buscar
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar serviços..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Categoria */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Categoria
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preço
              </label>
              <select
                id="price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Todos">Todos</option>
                <option value="Gratuitos">Gratuitos</option>
                <option value="Pagamento">Com Pagamento</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Nenhum serviço encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicosPage;
