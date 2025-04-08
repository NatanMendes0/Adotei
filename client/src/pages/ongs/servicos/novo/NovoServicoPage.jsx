import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";

const NovoServicoPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    duracao: "",
    duracaoUnidade: "minutos", // minutos ou horas
    capacidade: "",
    fotos: [],
    fotoPrincipal: 0,
    requisitos: [],
    perguntasCustomizadas: [],
  });

  const [novoRequisito, setNovoRequisito] = useState("");
  const [novaPergunta, setNovaPergunta] = useState({
    pergunta: "",
    tipo: "texto",
    opcoes: [],
    obrigatoria: true,
  });
  const [novaOpcao, setNovaOpcao] = useState("");

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validação específica para duração
    if (name === "duracao") {
      const numValue = parseInt(value);
      const maxValue = formData.duracaoUnidade === "minutos" ? 59 : 23;

      if (numValue > maxValue) {
        toast.error(
          `A duração deve ser menor que ${maxValue + 1} ${
            formData.duracaoUnidade
          }`
        );
        return;
      }

      if (numValue < 1) {
        toast.error("A duração deve ser maior que 0");
        return;
      }
    }

    // Validação para capacidade
    if (name === "capacidade") {
      const numValue = parseInt(value);
      if (numValue < 1) {
        toast.error("A capacidade deve ser maior que 0");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 1) {
      toast.error("Você pode adicionar apenas uma foto");
      return;
    }

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      fotos: newPhotos,
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 1) {
      toast.error("Você pode adicionar apenas uma foto");
      return;
    }

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      fotos: newPhotos,
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removePhoto = (index) => {
    setFormData((prev) => {
      const newPhotos = [...prev.fotos];
      URL.revokeObjectURL(newPhotos[index].preview);
      newPhotos.splice(index, 1);

      // Ajusta o índice da foto principal se necessário
      let newFotoPrincipal = prev.fotoPrincipal;
      if (index === prev.fotoPrincipal) {
        newFotoPrincipal = 0;
      } else if (index < prev.fotoPrincipal) {
        newFotoPrincipal--;
      }

      return {
        ...prev,
        fotos: newPhotos,
        fotoPrincipal: newFotoPrincipal,
      };
    });
  };

  const setMainPhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      fotoPrincipal: index,
    }));
  };

  const addRequisito = () => {
    if (novoRequisito.trim() && formData.requisitos.length < 8) {
      // Verificar se o requisito tem pelo menos 3 caracteres
      if (novoRequisito.trim().length < 3) {
        toast.error("O requisito deve ter pelo menos 3 caracteres");
        return;
      }

      // Verificar se o requisito já existe
      if (formData.requisitos.includes(novoRequisito.trim())) {
        toast.error("Este requisito já foi adicionado");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        requisitos: [...prev.requisitos, novoRequisito.trim()],
      }));
      setNovoRequisito("");
    } else if (formData.requisitos.length >= 8) {
      toast.error("Você pode adicionar no máximo 8 requisitos");
    }
  };

  const removeRequisito = (index) => {
    setFormData((prev) => ({
      ...prev,
      requisitos: prev.requisitos.filter((_, i) => i !== index),
    }));
  };

  const addPergunta = () => {
    if (
      novaPergunta.pergunta.trim() &&
      formData.perguntasCustomizadas.length < 4
    ) {
      setFormData((prev) => ({
        ...prev,
        perguntasCustomizadas: [
          ...prev.perguntasCustomizadas,
          {
            question: novaPergunta.pergunta.trim(),
            type: novaPergunta.tipo,
            options:
              novaPergunta.tipo === "single_choice" ||
              novaPergunta.tipo === "multiple_choice"
                ? novaPergunta.opcoes
                : [],
            required: novaPergunta.obrigatoria,
          },
        ],
      }));
      setNovaPergunta({
        pergunta: "",
        tipo: "texto",
        opcoes: [],
        obrigatoria: true,
      });
    } else if (formData.perguntasCustomizadas.length >= 4) {
      toast.error("Você pode adicionar no máximo 4 perguntas customizadas");
    }
  };

  const removePergunta = (index) => {
    setFormData((prev) => ({
      ...prev,
      perguntasCustomizadas: prev.perguntasCustomizadas.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addOpcao = () => {
    if (novaOpcao.trim()) {
      // Verificar se a opção tem pelo menos 3 caracteres
      if (novaOpcao.trim().length < 3) {
        toast.error("A opção deve ter pelo menos 3 caracteres");
        return;
      }

      setNovaPergunta((prev) => ({
        ...prev,
        opcoes: [...prev.opcoes, novaOpcao.trim()],
      }));
      setNovaOpcao("");
    }
  };

  const removeOpcao = (index) => {
    setNovaPergunta((prev) => ({
      ...prev,
      opcoes: prev.opcoes.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1: // Informações Básicas
        if (!formData.nome) {
          toast.error("O nome do serviço é obrigatório");
          return false;
        }
        if (!formData.descricao) {
          toast.error("A descrição do serviço é obrigatória");
          return false;
        }
        if (!formData.preco) {
          toast.error("O preço do serviço é obrigatório");
          return false;
        }
        if (!formData.duracao) {
          toast.error("A duração do serviço é obrigatória");
          return false;
        }
        if (!formData.capacidade) {
          toast.error("A capacidade do serviço é obrigatória");
          return false;
        }
        return true;
      case 2: // Fotos
        if (formData.fotos.length === 0) {
          toast.error("Adicione pelo menos uma foto do serviço");
          return false;
        }
        return true;
      case 3: // Requisitos
        return true; // Não há validações obrigatórias para requisitos
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validação final
    if (!formData.nome) {
      toast.error("O nome do serviço é obrigatório");
      setIsSubmitting(false);
      return;
    }

    if (!formData.descricao) {
      toast.error("A descrição do serviço é obrigatória");
      setIsSubmitting(false);
      return;
    }

    if (!formData.preco) {
      toast.error("O preço do serviço é obrigatório");
      setIsSubmitting(false);
      return;
    }

    if (!formData.duracao) {
      toast.error("A duração do serviço é obrigatória");
      setIsSubmitting(false);
      return;
    }

    if (!formData.capacidade) {
      toast.error("A capacidade do serviço é obrigatória");
      setIsSubmitting(false);
      return;
    }

    if (formData.fotos.length === 0) {
      toast.error("Adicione pelo menos uma foto do serviço");
      setIsSubmitting(false);
      return;
    }

    // Simulação de envio para API
    setTimeout(() => {
      // Limpar os objetos URL criados para as previews
      formData.fotos.forEach((photo) => {
        URL.revokeObjectURL(photo.preview);
      });

      // Aqui seria o envio para a API
      console.log("Dados do serviço:", formData);

      toast.success("Serviço cadastrado com sucesso!");
      setIsSubmitting(false);
      navigate("/ongs/servicos");
    }, 1500);
  };

  // Componente de navegação entre etapas
  const StepNavigation = () => (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Cadastrando..." : "Cadastrar Serviço"}
      </button>
    </div>
  );

  // Componente de indicador de etapas
  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? "bg-teal-600 text-white"
                  : step < currentStep
                  ? "bg-teal-100 text-teal-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? (
                <svg
                  className="w-6 h-6"
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
              ) : (
                step
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step === currentStep
                  ? "text-teal-600"
                  : step < currentStep
                  ? "text-teal-600"
                  : "text-gray-500"
              }`}
            >
              {step === 1 ? "Básico" : step === 2 ? "Fotos" : "Requisitos"}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-between">
          {[1, 2].map((step) => (
            <div
              key={step}
              className={`h-1 w-full ${
                step < currentStep ? "bg-teal-600" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Cadastrar Novo Serviço"
        subtitle="Preencha os dados do serviço para disponibilizá-lo para agendamento"
      />

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <StepIndicator />

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Informações Básicas
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome do Serviço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Serviço <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ex: Banho e Tosa"
                    required
                  />
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2 text-gray-500">
                      R$
                    </span>
                    <input
                      type="number"
                      name="preco"
                      value={formData.preco}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="0,00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Duração */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        name="duracao"
                        value={formData.duracao}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ex: 30"
                        required
                        min="1"
                      />
                    </div>
                    <select
                      name="duracaoUnidade"
                      value={formData.duracaoUnidade}
                      onChange={handleInputChange}
                      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="minutos">Minutos</option>
                      <option value="horas">Horas</option>
                    </select>
                  </div>
                </div>

                {/* Capacidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ex: 5"
                    min="1"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Número máximo de pets por agendamento
                  </p>
                </div>
              </div>

              {/* Descrição */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  rows="4"
                  placeholder="Descreva o serviço, incluindo o que está incluso, benefícios, etc."
                  required
                />
              </div>
            </div>
          )}

          {/* Etapa 2: Fotos */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Foto do Serviço <span className="text-red-500">*</span>
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Foto
                </label>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? "border-teal-500 bg-teal-50"
                      : formData.fotos.length >= 1
                      ? "border-gray-200 bg-gray-50"
                      : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
                  }`}
                  onDragOver={
                    formData.fotos.length < 1 ? handleDragOver : undefined
                  }
                  onDragLeave={
                    formData.fotos.length < 1 ? handleDragLeave : undefined
                  }
                  onDrop={formData.fotos.length < 1 ? handleDrop : undefined}
                  onClick={
                    formData.fotos.length < 1 ? triggerFileInput : undefined
                  }
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={formData.fotos.length >= 1}
                  />

                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className={`w-12 h-12 mb-3 ${
                        isDragging
                          ? "text-teal-500"
                          : formData.fotos.length >= 1
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      {formData.fotos.length >= 1
                        ? "Foto já adicionada"
                        : isDragging
                        ? "Solte a foto aqui"
                        : "Arraste e solte uma foto aqui"}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {formData.fotos.length >= 1
                        ? "Você já adicionou uma foto"
                        : "ou clique para selecionar um arquivo"}
                    </p>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.fotos.length >= 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-teal-600 text-white hover:bg-teal-700"
                      }`}
                      disabled={formData.fotos.length >= 1}
                    >
                      Selecionar Foto
                    </button>
                  </div>
                </div>
              </div>

              {formData.fotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {formData.fotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo.preview}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="p-2 rounded-full bg-white text-gray-800"
                            title="Remover foto"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {formData.fotoPrincipal === index && (
                        <div className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Etapa 3: Requisitos */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Requisitos para o Serviço
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Requisito (máximo 8)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={novoRequisito}
                    onChange={(e) => setNovoRequisito(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Ex: Carteira de vacinação em dia"
                    disabled={formData.requisitos.length >= 8}
                  />
                  <button
                    type="button"
                    onClick={addRequisito}
                    className={`w-full sm:w-auto whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                      !novoRequisito.trim() ||
                      formData.requisitos.length >= 8 ||
                      novoRequisito.trim().length < 3
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                    disabled={
                      !novoRequisito.trim() ||
                      formData.requisitos.length >= 8 ||
                      novoRequisito.trim().length < 3
                    }
                  >
                    Adicionar
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.requisitos.length}/8 requisitos adicionados
                </p>
              </div>

              {formData.requisitos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.requisitos.map((requisito, index) => (
                    <div
                      key={index}
                      className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span>{requisito}</span>
                      <button
                        type="button"
                        onClick={() => removeRequisito(index)}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">
                Perguntas Customizadas para o Formulário de Agendamento
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Pergunta (máximo 4)
                </label>
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <input
                      type="text"
                      value={novaPergunta.pergunta}
                      onChange={(e) =>
                        setNovaPergunta({
                          ...novaPergunta,
                          pergunta: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Ex: O pet tem alguma alergia?"
                      disabled={formData.perguntasCustomizadas.length >= 4}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Resposta
                      </label>
                      <select
                        value={novaPergunta.tipo}
                        onChange={(e) =>
                          setNovaPergunta({
                            ...novaPergunta,
                            tipo: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="texto">Texto</option>
                        <option value="number">Número</option>
                        <option value="single_choice">Escolha Única</option>
                        <option value="multiple_choice">
                          Escolha Múltipla
                        </option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={novaPergunta.obrigatoria}
                          onChange={(e) =>
                            setNovaPergunta({
                              ...novaPergunta,
                              obrigatoria: e.target.checked,
                            })
                          }
                          className="form-checkbox h-5 w-5 text-teal-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Resposta obrigatória
                        </span>
                      </label>
                    </div>
                  </div>

                  {(novaPergunta.tipo === "single_choice" ||
                    novaPergunta.tipo === "multiple_choice") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Opções de Resposta
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={novaOpcao}
                          onChange={(e) => setNovaOpcao(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Ex: Sim"
                        />
                        <button
                          type="button"
                          onClick={addOpcao}
                          className={`w-full sm:w-auto whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                            !novaOpcao.trim() || novaOpcao.trim().length < 3
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-teal-600 text-white hover:bg-teal-700"
                          }`}
                          disabled={
                            !novaOpcao.trim() || novaOpcao.trim().length < 3
                          }
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addPergunta}
                      className={`w-full sm:w-auto whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                        !novaPergunta.pergunta.trim() ||
                        formData.perguntasCustomizadas.length >= 4 ||
                        (novaPergunta.tipo === "single_choice" &&
                          novaPergunta.opcoes.length < 2)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-teal-600 text-white hover:bg-teal-700"
                      }`}
                      disabled={
                        !novaPergunta.pergunta.trim() ||
                        formData.perguntasCustomizadas.length >= 4 ||
                        (novaPergunta.tipo === "single_choice" &&
                          novaPergunta.opcoes.length < 2)
                      }
                    >
                      Adicionar Pergunta
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.perguntasCustomizadas.length}/4 perguntas
                  adicionadas
                </p>
              </div>

              {formData.perguntasCustomizadas.length > 0 && (
                <div className="space-y-4">
                  {formData.perguntasCustomizadas.map((pergunta, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {pergunta.question}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Tipo: {pergunta.type} |{" "}
                            {pergunta.required ? "Obrigatória" : "Opcional"}
                          </p>
                          {pergunta.options && pergunta.options.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Opções:</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {pergunta.options.map((opcao, i) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                                  >
                                    {opcao}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removePergunta(index)}
                          className="text-red-500 hover:text-red-700"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <StepNavigation />
      </form>
    </div>
  );
};

export default NovoServicoPage;
