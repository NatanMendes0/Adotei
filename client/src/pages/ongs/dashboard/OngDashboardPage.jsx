import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const dashboardData = {
  pets: {
    cadastrados: 12,
    disponiveis: 8,
    desativados: 4,
  },
  servicos: {
    total: 5,
    ativos: 3,
    agendados: 8,
  },
  // Dados mockados para demonstração
  resumoAtividades: {
    semana: {
      solicitacoesRecebidas: 12,
      servicosRealizados: 8,
      petsAdotados: 3,
    },
  },
  destaques: {
    maisVistos: [
      {
        id: 1,
        nome: "Thor",
        visitas: 45,
        foto: "https://placekitten.com/100/100",
      },
      {
        id: 2,
        nome: "Luna",
        visitas: 38,
        foto: "https://placekitten.com/100/100",
      },
      {
        id: 3,
        nome: "Bob",
        visitas: 32,
        foto: "https://placekitten.com/100/100",
      },
    ],
    aguardandoResposta: 5,
    servicosHoje: 3,
  },
};

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

  // Dados mockados para compromissos do dia
  const compromissosHoje = [
    {
      id: 1,
      tipo: "servico",
      titulo: "Banho e Tosa",
      pet: "Max",
      horario: "14:30",
      tutor: "João Silva",
      status: "confirmado",
    },
    {
      id: 2,
      tipo: "adocao",
      titulo: "Entrevista de Adoção",
      pet: "Luna",
      horario: "16:00",
      tutor: "Maria Santos",
      status: "pendente",
    },
    {
      id: 3,
      tipo: "veterinario",
      titulo: "Consulta Veterinária",
      pet: "Thor",
      horario: "10:00",
      tutor: "Ana Oliveira",
      status: "concluido",
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

      {/* Cards da Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card de Resumo de Atividades */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Resumo de Atividades
            </h2>
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>

          {/* Esta Semana */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              ESTA SEMANA
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-1.5 rounded">
                  <svg
                    className="h-4 w-4 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Solicitações Recebidas
                    </span>
                    <span className="font-medium text-gray-900">
                      {
                        dashboardData.resumoAtividades.semana
                          .solicitacoesRecebidas
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-1.5 rounded">
                  <svg
                    className="h-4 w-4 text-indigo-600"
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
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Serviços Realizados
                    </span>
                    <span className="font-medium text-gray-900">
                      {dashboardData.resumoAtividades.semana.servicosRealizados}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-1.5 rounded">
                  <svg
                    className="h-4 w-4 text-pink-600"
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
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pets Adotados</span>
                    <span className="font-medium text-gray-900">
                      {dashboardData.resumoAtividades.semana.petsAdotados}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Pets em Destaque */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Pets em Destaque
            </h2>
            <Link
              to="/ongs/pets"
              className="text-teal-600 hover:text-teal-700 text-sm font-medium"
            >
              Ver todos
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardData.destaques.maisVistos.map((pet) => (
              <div
                key={pet.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img
                  src={pet.foto}
                  alt={pet.nome}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{pet.nome}</h3>
                  <p className="text-sm text-gray-600">
                    {pet.visitas} visitas este mês
                  </p>
                </div>
                <Link
                  to={`/ongs/pets/${pet.id}`}
                  className="text-teal-600 hover:text-teal-700"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Ações Pendentes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Ações Pendentes
            </h2>
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <svg
                    className="h-6 w-6 text-yellow-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Solicitações não respondidas
                  </h3>
                  <p className="text-sm text-gray-600">
                    {dashboardData.destaques.aguardandoResposta} solicitações
                    aguardando
                  </p>
                </div>
              </div>
              <Link
                to="/ongs/solicitacoes"
                className="text-yellow-700 hover:text-yellow-800"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <svg
                    className="h-6 w-6 text-teal-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Serviços para hoje
                  </h3>
                  <p className="text-sm text-gray-600">
                    {dashboardData.destaques.servicosHoje} serviços agendados
                  </p>
                </div>
              </div>
              <Link
                to="/ongs/servicos"
                className="text-teal-700 hover:text-teal-800"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Atividades Recentes e Compromissos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <h3 className="font-medium text-gray-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activity.description}
                  </p>
                  <span className="text-gray-400 text-xs">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compromissos de Hoje */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Compromissos de Hoje
          </h2>
          <div className="space-y-4">
            {compromissosHoje.map((compromisso) => (
              <div
                key={compromisso.id}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="bg-teal-100 p-2 rounded-lg">
                  {compromisso.tipo === "adocao" && (
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
                  {compromisso.tipo === "servico" && (
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
                  {compromisso.tipo === "veterinario" && (
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
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">
                      {compromisso.titulo}
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                      {compromisso.horario}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Pet: {compromisso.pet} | Tutor: {compromisso.tutor}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      compromisso.status === "confirmado"
                        ? "bg-green-100 text-green-800"
                        : compromisso.status === "pendente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {compromisso.status.charAt(0).toUpperCase() +
                      compromisso.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngDashboardPage;
