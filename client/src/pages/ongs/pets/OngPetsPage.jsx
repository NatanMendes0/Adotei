const OngPetsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pets</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Cadastrar Pet
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Todos os tipos</option>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Status</option>
            <option value="disponivel">Disponível</option>
            <option value="adotado">Adotado</option>
            <option value="temporario">Temporário</option>
          </select>
          <input
            type="text"
            placeholder="Buscar pet..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 flex-grow"
          />
        </div>
      </div>

      {/* Lista de Pets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Pet */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://placekitten.com/400/300"
            alt="Pet"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Luna</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Disponível
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Gata • 2 anos • Fêmea</p>
              <p>Vacinada e castrada</p>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button className="text-gray-600 hover:text-teal-600">
              Editar
            </button>
            <button className="text-red-600 hover:text-red-700">Remover</button>
          </div>
        </div>

        {/* Card de Pet */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://placedog.net/400/300"
            alt="Pet"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Thor</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Temporário
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Cachorro • 1 ano • Macho</p>
              <p>Vacinado e castrado</p>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button className="text-gray-600 hover:text-teal-600">
              Editar
            </button>
            <button className="text-red-600 hover:text-red-700">Remover</button>
          </div>
        </div>

        {/* Card de Pet */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://placekitten.com/401/300"
            alt="Pet"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Mia</h3>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Adotado
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Gata • 3 anos • Fêmea</p>
              <p>Vacinada e castrada</p>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button className="text-gray-600 hover:text-teal-600">
              Editar
            </button>
            <button className="text-red-600 hover:text-red-700">Remover</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngPetsPage;
