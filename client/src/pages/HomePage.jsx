import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import { pets } from "../data/pets";

const HomePage = () => {
  // Mostrar apenas 4 pets na página inicial
  const featuredPets = pets.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <span className="text-teal-600 font-medium mb-6 block">
            Faça a diferença na vida de um pet
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Transforme vidas através da
            <span className="text-teal-600 block mt-2">adoção responsável</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Junte-se a nós nessa missão de conectar pets especiais a famílias
            amorosas. Aqui você encontra seu novo companheiro e ainda apoia ONGs
            que fazem a diferença.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/pets"
              className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center sm:justify-start group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform"
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
              Encontrar meu pet
            </Link>
            <Link
              to="/para-ongs"
              className="text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center sm:justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Sou uma ONG
            </Link>
          </div>

          {/* <div className="mt-12 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">1.2k+</span>
              <span className="text-sm text-gray-600">Pets adotados</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">50+</span>
              <span className="text-sm text-gray-600">ONGs parceiras</span>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">98%</span>
              <span className="text-sm text-gray-600">
                Adoções bem-sucedidas
              </span>
            </div>
          </div> */}
        </div>
        <div className="md:w-1/2 md:pl-12">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80"
              alt="Família feliz com seu pet adotado"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-600"
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
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Adotar é um ato de amor!
                  </p>
                  <p className="text-xs text-gray-600">
                    Transforme duas vidas: a sua e a do pet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pets Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Pets disponíveis para adoção
            </h2>
            <p className="text-gray-600">
              Encontre o seu novo melhor amigo. Todos os animais são castrados,
              vacinados e vermifugados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pets"
              className="text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 inline-flex items-center"
            >
              Ver todos os pets
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como funciona</h2>
            <p className="text-gray-600">
              Conheça o processo simples para adotar um animal ou agendar um
              serviço oferecido pelas ONGs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Encontre</h3>
              <p className="text-gray-600">
                Encontre animais disponíveis para adoção ou serviços oferecidos
                pelas ONGs na sua região.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-pink-500"
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
              <h3 className="text-xl font-semibold mb-2">Escolha</h3>
              <p className="text-gray-600">
                Escolha um animal para adotar ou um serviço para agendar
                conforme sua necessidade.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-500"
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
              <h3 className="text-xl font-semibold mb-2">Preencha</h3>
              <p className="text-gray-600">
                Preencha o formulário de adoção com seus dados e responda às
                perguntas personalizadas da ONG.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adote</h3>
              <p className="text-gray-600">
                Finalize o processo de adoção, assine o termo de
                responsabilidade e leve seu novo amigo para casa.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Pronto para encontrar um novo amigo ou agendar um serviço?
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/pets"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
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
                Ver Pets para Adoção
              </Link>
              <Link
                to="/servicos"
                className="text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50"
              >
                Ver Serviços
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção para ONGs */}
      <section className="bg-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">
              É uma ONG de proteção animal?
            </h2>
            <p className="text-teal-50 text-lg">
              Cadastre-se gratuitamente e aumente suas chances de encontrar
              lares para os animais resgatados, além de divulgar seus serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Benefício 1 */}
            <div className="bg-teal-500 rounded-lg p-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <p className="text-teal-50">
                Aumente a visibilidade dos animais disponíveis para adoção
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="bg-teal-500 rounded-lg p-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-teal-50">
                Divulgue serviços gratuitos ou de baixo custo para a comunidade
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="bg-teal-500 rounded-lg p-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-4"
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
              <p className="text-teal-50">
                Gerencie o processo de adoção de forma organizada
              </p>
            </div>

            {/* Benefício 4 */}
            <div className="bg-teal-500 rounded-lg p-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-teal-50">
                Acompanhe o sucesso das adoções e mantenha histórico
              </p>
            </div>

            {/* Benefício 5 */}
            <div className="bg-teal-500 rounded-lg p-6 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-4"
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
              <p className="text-teal-50">
                Conecte-se com uma comunidade engajada de protetores
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/cadastro-ong"
              className="bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-teal-50 transition-colors inline-flex items-center font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Cadastrar minha ONG
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
