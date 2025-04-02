import { useMemo, useState } from "react";
import PetCard from "../components/PetCard";
import { filterOptions } from "../data/filterOptions";
import { pets } from "../data/pets";

const PetsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    especie: "Todas",
    porte: "Todos",
    sexo: "Todos",
    idade: "Todas",
    localizacao: "Todas",
  });

  const ITEMS_PER_PAGE = 8;

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      especie: "Todas",
      porte: "Todos",
      sexo: "Todos",
      idade: "Todas",
      localizacao: "Todas",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Filtragem e paginação dos pets
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        searchQuery === "" ||
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEspecie =
        filters.especie === "Todas" || pet.type === filters.especie;

      const matchesPorte =
        filters.porte === "Todos" || pet.size === filters.porte;

      const matchesSexo =
        filters.sexo === "Todos" || pet.gender === filters.sexo;

      const matchesIdade =
        filters.idade === "Todas" || pet.age === filters.idade;

      const matchesLocalizacao =
        filters.localizacao === "Todas" || pet.location === filters.localizacao;

      return (
        matchesSearch &&
        matchesEspecie &&
        matchesPorte &&
        matchesSexo &&
        matchesIdade &&
        matchesLocalizacao
      );
    });
  }, [searchQuery, filters]);

  // Cálculo da paginação
  const totalPages = Math.ceil(filteredPets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPets = filteredPets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de Pesquisa e Botão de Filtros */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar por nome ou raça..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg
            className="h-5 w-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          {showFilters ? "Esconder filtros" : "Mostrar filtros"}
        </button>
      </div>

      {/* Área de Filtros */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Espécie */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Espécie
              </label>
              <select
                value={filters.especie}
                onChange={(e) => handleFilterChange("especie", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Todas">Todas</option>
                {filterOptions.especies.map((especie) => (
                  <option key={especie.id} value={especie.name}>
                    {especie.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Porte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porte
              </label>
              <select
                value={filters.porte}
                onChange={(e) => handleFilterChange("porte", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Todos">Todos</option>
                {filterOptions.portes.map((porte) => (
                  <option key={porte.id} value={porte.name}>
                    {porte.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sexo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sexo
              </label>
              <select
                value={filters.sexo}
                onChange={(e) => handleFilterChange("sexo", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Todos">Todos</option>
                {filterOptions.sexos.map((sexo) => (
                  <option key={sexo.id} value={sexo.name}>
                    {sexo.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Idade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idade
              </label>
              <select
                value={filters.idade}
                onChange={(e) => handleFilterChange("idade", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Todas">Todas</option>
                {filterOptions.idades.map((idade) => (
                  <option key={idade.id} value={idade.name}>
                    {idade.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização
              </label>
              <select
                value={filters.localizacao}
                onChange={(e) =>
                  handleFilterChange("localizacao", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="Todas">Todas</option>
                {filterOptions.localizacoes.map((local) => (
                  <option key={local.id} value={local.name}>
                    {local.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão Limpar Filtros */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-teal-600 hover:text-teal-700 font-medium text-sm"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      )}

      {/* Grid de PetCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paginatedPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? "bg-teal-600 text-white"
                    : "hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Mensagem quando não há pets */}
      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Nenhum pet encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
};

export default PetsPage;
