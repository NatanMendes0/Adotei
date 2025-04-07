const OngServicosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Serviços</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Novo Serviço
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Todos os tipos</option>
            <option value="veterinario">Veterinário</option>
            <option value="banho">Banho</option>
            <option value="tosa">Tosa</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <input
            type="text"
            placeholder="Buscar serviço..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 flex-grow"
          />
        </div>
      </div>

      {/* Lista de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Serviço */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Consulta Veterinária
              </h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Ativo
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Consulta veterinária completa com exames básicos.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Duração: 1h</span>
              <span>R$ 150,00</span>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button className="text-gray-600 hover:text-teal-600">
              Editar
            </button>
            <button className="text-red-600 hover:text-red-700">
              Desativar
            </button>
          </div>
        </div>

        {/* Card de Serviço */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Banho e Tosa
              </h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Ativo
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Banho completo com produtos hipoalergênicos e tosa higiênica.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Duração: 2h</span>
              <span>R$ 80,00</span>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button className="text-gray-600 hover:text-teal-600">
              Editar
            </button>
            <button className="text-red-600 hover:text-red-700">
              Desativar
            </button>
          </div>
        </div>

        {/* Card de Serviço */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Castração</h3>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                Inativo
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Procedimento cirúrgico de castração com acompanhamento
              pós-operatório.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Duração: 3h</span>
              <span>R$ 300,00</span>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-2">
            <button className="text-gray-600 hover:text-teal-600">
              Editar
            </button>
            <button className="text-green-600 hover:text-green-700">
              Ativar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngServicosPage;
