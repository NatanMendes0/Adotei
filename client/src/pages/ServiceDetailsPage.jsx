import { useParams } from "react-router-dom";

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
    longDescription: `
      Oferecemos um serviço completo de banho e tosa para cães e gatos, realizado por profissionais especializados.
      Nosso serviço inclui:
      
      • Banho com produtos de alta qualidade
      • Tosa profissional
      • Corte de unhas
      • Limpeza de ouvidos
      • Escovação
      • Perfume suave
      
      Duração média do serviço: 2 horas
      Horário de atendimento: Segunda a Sábado, das 9h às 18h
      
      Agende com antecedência para garantir o melhor horário para seu pet!
    `,
    contact: {
      phone: "(11) 99999-9999",
      email: "contato@amigosdospetssp.com.br",
      address: "Rua dos Pets, 123 - Vila Animal - São Paulo/SP",
    },
    requirements: [
      "Carteira de vacinação atualizada",
      "Documento do tutor",
      "Pet deve estar com antipulgas em dia",
    ],
  },
  // ... outros serviços mockados
];

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const service = mockServices.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Serviço não encontrado
          </h1>
          <p className="text-xl text-gray-600">
            O serviço que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-teal-600">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-600 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            {service.description}
          </p>
          <div className="mt-8 flex items-center space-x-4">
            {!service.isFree && (
              <span className="text-2xl font-bold text-white">
                R$ {service.price.toFixed(2)}
              </span>
            )}
            {service.isFree && (
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-medium">
                Gratuito
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Coluna Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sobre o Serviço
              </h2>
              <div className="prose prose-lg max-w-none">
                {service.longDescription.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requisitos
              </h2>
              <ul className="space-y-4">
                {service.requirements.map((req, index) => (
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
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
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
                    <p className="font-medium text-gray-900">
                      {service.ongName}
                    </p>
                    <p className="text-gray-600">{service.contact.address}</p>
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
                    href={`tel:${service.contact.phone}`}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    {service.contact.phone}
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
                    href={`mailto:${service.contact.email}`}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    {service.contact.email}
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                  Agendar Serviço
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
