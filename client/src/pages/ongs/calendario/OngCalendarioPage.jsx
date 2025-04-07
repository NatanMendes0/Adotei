const OngCalendarioPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Calendário</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Novo Evento
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {/* Cabeçalho do calendário */}
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {/* Placeholder para o calendário real */}
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-sm text-gray-600">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Próximos Eventos
        </h2>
        <div className="space-y-4">
          {/* Placeholder para eventos */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Consulta Veterinária
                </h3>
                <p className="text-sm text-gray-600">
                  Segunda-feira, 15 de Abril - 14:00
                </p>
              </div>
              <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                Veterinário
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">Feira de Adoção</h3>
                <p className="text-sm text-gray-600">
                  Sábado, 20 de Abril - 10:00
                </p>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Evento
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngCalendarioPage;
