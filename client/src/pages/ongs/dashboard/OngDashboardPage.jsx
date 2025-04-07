import { useAuth } from "../../../contexts/AuthContext";

const OngDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Bem-vindo(a), {user?.name || "ONG"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Pets */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pets</h2>
          <p className="text-gray-600 mb-4">
            Gerencie os pets disponíveis para adoção.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-teal-600">0</span>
            <span className="text-sm text-gray-500">pets cadastrados</span>
          </div>
        </div>

        {/* Card de Serviços */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Serviços</h2>
          <p className="text-gray-600 mb-4">
            Gerencie os serviços oferecidos pela ONG.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-teal-600">0</span>
            <span className="text-sm text-gray-500">serviços ativos</span>
          </div>
        </div>

        {/* Card de Agendamentos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Agendamentos
          </h2>
          <p className="text-gray-600 mb-4">
            Visualize os próximos agendamentos.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-teal-600">0</span>
            <span className="text-sm text-gray-500">agendamentos hoje</span>
          </div>
        </div>
      </div>

      {/* Seção de Ações Rápidas */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Cadastrar Pet
          </button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Novo Serviço
          </button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Ver Calendário
          </button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Relatórios
          </button>
        </div>
      </div>
    </div>
  );
};

export default OngDashboardPage;
