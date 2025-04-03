import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingOngPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profileImage: null,
    state: "",
    city: "",
    address: "",
    workingDays: [],
    workingHours: {
      start: "09:00",
      end: "18:00",
    },
    specialHours: [],
  });
  const [cities, setCities] = useState([]);
  const [hasSpecialHours, setHasSpecialHours] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulação de estados e cidades (substituir por API real)
  const states = [
    { value: "SP", label: "São Paulo" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "MG", label: "Minas Gerais" },
    // ... outros estados
  ];

  useEffect(() => {
    if (formData.state) {
      // Simulação de busca de cidades (substituir por API real)
      const mockCities = [
        { value: "SAO", label: "São Paulo" },
        { value: "CAMP", label: "Campinas" },
        { value: "SANT", label: "Santos" },
        // ... outras cidades
      ];
      setCities(mockCities);
    }
  }, [formData.state]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleDayToggle = (day) => {
    // Se o dia já está selecionado em algum horário especial, não permite selecionar
    if (
      formData.specialHours.some((special) => special.days.includes(day)) &&
      !formData.workingDays.includes(day)
    ) {
      return;
    }

    const newDays = formData.workingDays.includes(day)
      ? formData.workingDays.filter((d) => d !== day)
      : [...formData.workingDays, day];
    setFormData({ ...formData, workingDays: newDays });
  };

  const handleSpecialHoursAdd = () => {
    setFormData({
      ...formData,
      specialHours: [
        ...formData.specialHours,
        {
          days: [],
          start: "09:00",
          end: "18:00",
        },
      ],
    });
  };

  const handleSpecialHoursUpdate = (index, field, value) => {
    const newSpecialHours = [...formData.specialHours];
    newSpecialHours[index] = {
      ...newSpecialHours[index],
      [field]: value,
    };
    setFormData({ ...formData, specialHours: newSpecialHours });
  };

  const isDaySelected = (day) => {
    // Verifica se o dia está no horário comum
    if (formData.workingDays.includes(day)) return true;

    // Verifica se o dia está em algum horário especial
    return formData.specialHours.some((special) => special.days.includes(day));
  };

  const handleSpecialDayToggle = (index, day) => {
    // Se o dia já está selecionado em outro horário, não permite selecionar
    if (
      isDaySelected(day) &&
      !formData.specialHours[index].days.includes(day)
    ) {
      return;
    }

    const newSpecialHours = [...formData.specialHours];
    newSpecialHours[index] = {
      ...newSpecialHours[index],
      days: newSpecialHours[index].days.includes(day)
        ? newSpecialHours[index].days.filter((d) => d !== day)
        : [...newSpecialHours[index].days, day],
    };
    setFormData({ ...formData, specialHours: newSpecialHours });
  };

  const handleSpecialHoursRemove = (index) => {
    setFormData({
      ...formData,
      specialHours: formData.specialHours.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Implementar lógica de envio
      navigate("/ongs/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Foto de Perfil da ONG
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500">
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>
          <label className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Escolher Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Estado
        </label>
        <select
          value={formData.state}
          onChange={(e) =>
            setFormData({ ...formData, state: e.target.value, city: "" })
          }
          className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
        >
          <option value="">Selecione um estado</option>
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Cidade
        </label>
        <select
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
          disabled={!formData.state}
        >
          <option value="">Selecione uma cidade</option>
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Endereço Completo
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
          placeholder="Rua, número, complemento..."
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-4">
          Dias de Funcionamento
        </label>
        <div className="grid grid-cols-7 gap-2">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => {
            const isSelected = formData.workingDays.includes(day);
            const isDisabled =
              formData.specialHours.some((special) =>
                special.days.includes(day)
              ) && !isSelected;

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                disabled={isDisabled}
                className={`p-4 rounded-lg text-center font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-teal-600 text-white"
                    : isDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-4">
          Horário de Funcionamento
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="time"
            value={formData.workingHours.start}
            onChange={(e) =>
              setFormData({
                ...formData,
                workingHours: {
                  ...formData.workingHours,
                  start: e.target.value,
                },
              })
            }
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
          />
          <span className="text-gray-600">até</span>
          <input
            type="time"
            value={formData.workingHours.end}
            onChange={(e) =>
              setFormData({
                ...formData,
                workingHours: {
                  ...formData.workingHours,
                  end: e.target.value,
                },
              })
            }
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="specialHours"
          checked={hasSpecialHours}
          onChange={(e) => setHasSpecialHours(e.target.checked)}
          className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label
          htmlFor="specialHours"
          className="text-lg font-medium text-gray-700"
        >
          Horários diferentes em alguns dias
        </label>
      </div>

      {hasSpecialHours && (
        <div className="space-y-4">
          {formData.specialHours.map((special, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">
                  Horário Especial {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => handleSpecialHoursRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dias
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (day) => {
                      const isSelected = special.days.includes(day);
                      const isDisabled = isDaySelected(day) && !isSelected;

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleSpecialDayToggle(index, day)}
                          disabled={isDisabled}
                          className={`p-2 rounded-lg text-center text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? "bg-teal-600 text-white"
                              : isDisabled
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="time"
                    value={special.start}
                    onChange={(e) =>
                      handleSpecialHoursUpdate(index, "start", e.target.value)
                    }
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                  <span className="text-gray-600">até</span>
                  <input
                    type="time"
                    value={special.end}
                    onChange={(e) =>
                      handleSpecialHoursUpdate(index, "end", e.target.value)
                    }
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleSpecialHoursAdd}
            className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Adicionar Horário Especial
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Lado esquerdo - Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Complete seu Perfil
                </h1>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      currentStep === 1 ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`w-3 h-3 rounded-full ${
                      currentStep === 2 ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  />
                </div>
              </div>
              <p className="text-gray-600">
                {currentStep === 1
                  ? "Vamos começar com as informações básicas da sua ONG"
                  : "Agora, vamos configurar os horários de funcionamento"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 ? renderStep1() : renderStep2()}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </form>

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isLoading}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Voltar
                </button>
              )}
              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={isLoading}
                  className="ml-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`ml-auto px-6 py-3 bg-teal-600 text-white rounded-lg transition-colors ${
                    isLoading
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:bg-teal-700"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Finalizando...
                    </div>
                  ) : (
                    "Finalizar"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Lado direito - Ilustrações */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-teal-600 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden mb-6">
                  <img
                    src={`/images/onboarding-step-${currentStep}.jpg`}
                    alt="Ilustração"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentStep === 1
                    ? "Informações da ONG"
                    : "Horários de Funcionamento"}
                </h2>
                <p className="text-gray-600">
                  {currentStep === 1
                    ? "Adicione as informações básicas da sua ONG para que as pessoas possam encontrá-la facilmente."
                    : "Configure os horários de funcionamento para que as pessoas saibam quando podem entrar em contato."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingOngPage;
