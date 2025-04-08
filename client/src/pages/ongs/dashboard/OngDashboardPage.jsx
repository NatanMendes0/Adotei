import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const OngDashboardPage = () => {
  const { user } = useAuth();

  // Dados mockados para demonstração
  const stats = {
    pets: {
      total: 12,
      disponiveis: 8,
      adotados: 4,
    },
    servicos: {
      total: 5,
      ativos: 3,
      agendados: 8,
    },
    adocoes: {
      total: 15,
      emAndamento: 3,
      concluidas: 12,
    },
  };

  const recentActivities = [
    {
      id: 1,
      type: "adocao",
      title: "Nova solicitação de adoção",
      description: "Maria Silva está interessada em adotar o Thor",
      time: "2 horas atrás",
    },
    {
      id: 2,
      type: "servico",
      title: "Novo agendamento",
      description: "Banho e tosa agendado para amanhã",
      time: "4 horas atrás",
    },
    {
      id: 3,
      type: "pet",
      title: "Novo pet cadastrado",
      description: "Luna foi adicionada ao sistema",
      time: "1 dia atrás",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header com boas-vindas e ações rápidas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Olá, {user?.name || "ONG"}!
          </h1>
          <p className="text-gray-600 mt-2">
            Aqui está um resumo das atividades da sua ONG
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link
            to="/ongs/pets/novo"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Novo Pet
          </Link>
          <Link
            to="/ongs/servicos/novo"
            className="bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center gap-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Novo Serviço
          </Link>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card de Pets */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Pets</h2>
            <div className="bg-teal-100 p-2 rounded-lg">
              <svg
                className="h-6 w-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Pets</span>
              <span className="text-2xl font-bold text-gray-800">
                {stats.pets.total}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Disponíveis</span>
              <span className="text-lg font-semibold text-teal-600">
                {stats.pets.disponiveis}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Adotados</span>
              <span className="text-lg font-semibold text-gray-600">
                {stats.pets.adotados}
              </span>
            </div>
          </div>
        </div>

        {/* Card de Serviços */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Serviços</h2>
            <div className="bg-teal-100 p-2 rounded-lg">
              <svg
                className="h-6 w-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Serviços</span>
              <span className="text-2xl font-bold text-gray-800">
                {stats.servicos.total}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ativos</span>
              <span className="text-lg font-semibold text-teal-600">
                {stats.servicos.ativos}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Agendamentos</span>
              <span className="text-lg font-semibold text-gray-600">
                {stats.servicos.agendados}
              </span>
            </div>
          </div>
        </div>

        {/* Card de Adoções */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Adoções</h2>
            <div className="bg-teal-100 p-2 rounded-lg">
              <svg
                className="h-6 w-6 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Adoções</span>
              <span className="text-2xl font-bold text-gray-800">
                {stats.adocoes.total}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Em Andamento</span>
              <span className="text-lg font-semibold text-teal-600">
                {stats.adocoes.emAndamento}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Concluídas</span>
              <span className="text-lg font-semibold text-gray-600">
                {stats.adocoes.concluidas}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Atividades Recentes
        </h2>
        <div className="space-y-6">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-teal-100 p-2 rounded-lg">
                {activity.type === "adocao" && (
                  <svg
                    className="h-6 w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                )}
                {activity.type === "servico" && (
                  <svg
                    className="h-6 w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {activity.type === "pet" && (
                  <svg
                    className="h-6 w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <p className="text-gray-600 text-sm">{activity.description}</p>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OngDashboardPage;
