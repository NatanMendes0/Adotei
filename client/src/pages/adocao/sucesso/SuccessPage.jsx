import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-teal-600" />
        </div>
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Solicitação Enviada com Sucesso!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sua solicitação de adoção foi enviada para a ONG. Em breve, eles
            entrarão em contato para agendar uma visita e conhecer melhor você e
            seu futuro pet.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Próximos Passos
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-teal-500">1.</span>
                <span className="ml-2 text-gray-600">
                  A ONG analisará seu formulário de adoção
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-teal-500">2.</span>
                <span className="ml-2 text-gray-600">
                  Você receberá um contato para agendar uma visita
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 text-teal-500">3.</span>
                <span className="ml-2 text-gray-600">
                  Após a visita, a ONG decidirá sobre a adoção
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Link
              to="/pets"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Voltar para Lista de Pets
            </Link>
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Ir para Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
