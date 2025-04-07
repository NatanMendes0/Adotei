import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// Dados mockados para exemplo (mesmo do PetDetailsPage)
const mockPets = [
  {
    id: 1,
    name: "Thor",
    type: "Cachorro",
    breed: "Vira-lata",
    age: "2 anos",
    size: "Médio",
    gender: "Macho",
    description:
      "Cachorro muito dócil e brincalhão, adora crianças e outros animais.",
    images: [
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
    ],
    ongName: "Amigos dos Pets SP",
    location: "São Paulo, SP",
    longDescription: `
      Thor é um cachorro muito especial que chegou à nossa ONG após ser resgatado da rua.
      Ele é extremamente dócil e adora interagir com pessoas e outros animais.
      
      Características:
      • Muito brincalhão
      • Adora crianças
      • Sociável com outros cães
      • Treinado para fazer necessidades no lugar correto
      • Castrado e vacinado
      
      Thor está em busca de um lar amoroso onde possa receber muito carinho e atenção.
      Ele se adapta bem a apartamentos e casas, desde que tenha espaço para brincar.
    `,
    characteristics: [
      "Castrado",
      "Vacinado",
      "Vermifugado",
      "Microchipado",
      "Treinado para fazer necessidades no lugar correto",
      "Sociável com outros animais",
      "Boa com crianças",
    ],
    contact: {
      phone: "(11) 99999-9999",
      email: "contato@amigosdospetssp.com.br",
      address: "Rua dos Pets, 123 - Vila Animal - São Paulo/SP",
    },
    requirements: [
      "Compromisso com o bem-estar do animal",
      "Casa/apartamento adequado para o tamanho do pet",
      "Disponibilidade para passeios diários",
      "Aceitação de visitas pós-adoção",
    ],
  },
];

const AdoptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = mockPets.find((p) => p.id === parseInt(id));
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    estado: "",
    cidade: "",
    endereco: "",
    numero: "",
    complemento: "",
    moradia: "",
    experiencia: "",
    outrosPets: "",
    motivoAdocao: "",
    termosAceitos: false,
  });
  const [step, setStep] = useState(1);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    if (!pet) {
      navigate("/pets");
    }
  }, [pet, navigate]);

  // Carregar estados ao montar o componente
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const data = await response.json();
        // Ordenar estados alfabeticamente
        const sortedEstados = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(sortedEstados);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };

    fetchEstados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Função para buscar dados do CEP
  const handleCepSearch = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          toast.error("CEP inválido. Verifique e tente novamente");
          return;
        }

        // Encontrar o estado pelo UF
        const estado = estados.find((s) => s.sigla === data.uf);

        if (estado?.id) {
          // Primeiro setamos o estado para carregar as cidades
          setFormData((prev) => ({
            ...prev,
            estado: estado.nome,
            endereco: data.logradouro || "",
            complemento: data.complemento || "",
          }));

          // Chamamos handleEstadoChange para carregar as cidades, passando a cidade do CEP
          handleEstadoChange({ target: { value: estado.id } }, data.localidade);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        toast.error("Erro ao buscar o CEP. Por favor, tente novamente.");
      }
    }
  };

  // Função para lidar com a mudança do CEP
  const handleCepChange = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, cep }));
    if (cep.length === 8) {
      handleCepSearch(cep);
    }
  };

  // Função para lidar com a mudança de estado
  const handleEstadoChange = async (e, cidadeFromCep = null) => {
    const estadoId = e.target.value;
    const selectedEstado = estados.find((s) => s.id === estadoId);

    setFormData((prev) => ({
      ...prev,
      estado: selectedEstado?.nome || "",
      cidade: "",
    }));
    setCidades([]);

    if (estadoId) {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`
        );
        const data = await response.json();
        const sortedCidades = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setCidades(sortedCidades);

        // Se temos uma cidade do CEP, setamos ela agora
        if (cidadeFromCep) {
          // Encontramos a cidade exata na lista
          const cidadeFound = sortedCidades.find(
            (cidade) => cidade.nome === cidadeFromCep
          );
          if (cidadeFound) {
            setFormData((prev) => ({
              ...prev,
              cidade: cidadeFound.nome,
            }));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};

    switch (currentStep) {
      case 1:
        if (!formData.nome) errors.nome = "Nome é obrigatório";
        if (!formData.email) errors.email = "Email é obrigatório";
        if (!formData.telefone) errors.telefone = "Telefone é obrigatório";
        break;
      case 2:
        if (!formData.cep) errors.cep = "CEP é obrigatório";
        if (!formData.estado) errors.estado = "Estado é obrigatório";
        if (!formData.cidade) errors.cidade = "Cidade é obrigatória";
        if (!formData.endereco) errors.endereco = "Endereço é obrigatório";
        if (!formData.numero) errors.numero = "Número é obrigatório";
        if (!formData.moradia) errors.moradia = "Tipo de moradia é obrigatório";
        break;
      case 3:
        if (!formData.motivoAdocao)
          errors.motivoAdocao = "Motivo da adoção é obrigatório";
        break;
      case 4:
        if (!formData.termosAceitos)
          errors.termosAceitos = "Você precisa aceitar os termos";
        break;
      default:
        break;
    }

    // Exibir erros no toast
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Aqui você implementaria a lógica para enviar o formulário
      console.log("Formulário enviado:", formData);
      // Redirecionar para página de sucesso
      navigate("/adocao/sucesso");
    }
  };

  if (!pet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Processo de Adoção - {pet.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Preencha o formulário abaixo para iniciar o processo de adoção
          </p>
        </div>

        {/* Progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center ${
                  stepNumber < 4 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > stepNumber ? "bg-teal-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Dados Pessoais</span>
            <span>Moradia</span>
            <span>Experiência</span>
            <span>Confirmação</span>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Moradia */}
          {step === 2 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Informações de Moradia
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="Digite o CEP"
                    maxLength={8}
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    name="estado"
                    value={
                      estados.find((s) => s.nome === formData.estado)?.id || ""
                    }
                    onChange={handleEstadoChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  >
                    <option value="">Selecione um estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Cidade
                  </label>
                  <select
                    name="cidade"
                    value={formData.cidade}
                    onChange={(e) =>
                      setFormData({ ...formData, cidade: e.target.value })
                    }
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                    disabled={!formData.estado}
                  >
                    <option value="">Selecione uma cidade</option>
                    {cidades.map((cidade) => (
                      <option key={cidade.id} value={cidade.nome}>
                        {cidade.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Endereço Completo
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                        placeholder="Rua"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                        placeholder="Número"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                        placeholder="Complemento (opcional)"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Tipo de Moradia
                  </label>
                  <select
                    name="moradia"
                    value={formData.moradia}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experiência */}
          {step === 3 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Experiência com Pets
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Você já teve pets antes?
                  </label>
                  <select
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Possui outros pets atualmente?
                  </label>
                  <textarea
                    name="outrosPets"
                    value={formData.outrosPets}
                    onChange={handleInputChange}
                    rows={3}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="Descreva os pets que você já possui, se houver"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Por que você quer adotar este pet?
                  </label>
                  <textarea
                    name="motivoAdocao"
                    value={formData.motivoAdocao}
                    onChange={handleInputChange}
                    rows={4}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmação */}
          {step === 4 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Confirmação</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Resumo da Adoção
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      <strong>Pet:</strong> {pet.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>ONG:</strong> {pet.ongName}
                    </p>
                    <p className="text-gray-600">
                      <strong>Adotante:</strong> {formData.nome}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="termosAceitos"
                      checked={formData.termosAceitos}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Li e concordo com os{" "}
                      <a href="#" className="text-teal-600 hover:text-teal-500">
                        termos e condições
                      </a>{" "}
                      da adoção. Entendo que sou responsável pelo bem-estar do
                      animal e que a ONG poderá fazer visitas de acompanhamento.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Botões de Navegação */}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Voltar
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Confirmar Adoção
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptPage;
