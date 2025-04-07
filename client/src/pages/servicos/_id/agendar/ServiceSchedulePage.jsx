import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import {
  petInfoFields,
  tutorInfoFields,
} from "../../../../constants/formFields";

const mockService = {
  id: 1,
  title: "Banho e Tosa",
  ongName: "Amigos dos Pets SP",
  workingDays: [1, 2, 3, 4, 5],
  unavailableDates: [
    "2025-04-23",
    "2025-04-24",
    "2025-04-30",
    "2025-04-31",
    "2025-04-23",
  ],
  availableTimeSlots: {
    "2025-04-20": [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
    ],
    "2025-04-21": ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
    "2025-04-22": ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
  },
  // Apenas as perguntas específicas da ONG
  ongQuestions: [
    {
      id: "petHealth",
      label: "Condição de Saúde",
      type: "textarea",
      required: true,
      placeholder: "Descreva a condição de saúde atual do pet",
    },
    {
      id: "petBehavior",
      label: "Comportamento",
      type: "textarea",
      required: true,
      placeholder:
        "Descreva o comportamento do pet com outros animais e pessoas",
    },
    {
      id: "petMedications",
      label: "Medicamentos",
      type: "textarea",
      required: false,
      placeholder: "Liste os medicamentos que o pet está tomando (se houver)",
    },
    {
      id: "observations",
      label: "Observações Adicionais",
      type: "textarea",
      required: false,
      placeholder: "Alguma observação especial que gostaria de compartilhar?",
    },
  ],
};

const ServiceSchedulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUnavailableDates(
      mockService.unavailableDates.map((date) => new Date(date))
    );
  }, [id]);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd");
      console.log("Data selecionada:", dateString);
      console.log(
        "Horários disponíveis:",
        mockService.availableTimeSlots[dateString]
      );
      setAvailableTimeSlots(mockService.availableTimeSlots[dateString] || []);
      setSelectedTime(null);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Dados do agendamento:", {
        serviceId: id,
        date: selectedDate,
        time: selectedTime,
        ...formData,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowSuccessModal(true);

      setTimeout(() => {
        navigate("/");
      }, 7000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Informações do Tutor
            </h3>
            {tutorInfoFields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  required={field.required}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Próximo
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Informações do Pet
            </h3>
            {petInfoFields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Selecione uma opção</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    required={field.required}
                    value={formData[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      field.type === "number"
                        ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        : ""
                    }`}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Próximo
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Informações Solicitadas pela ONG
            </h3>
            {mockService.ongQuestions.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <textarea
                  id={field.id}
                  required={field.required}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`bg-teal-600 text-white px-6 py-2 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl ${
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
                    Agendando...
                  </div>
                ) : (
                  "Agendar Serviço"
                )}
              </motion.button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const firstDayOfMonth = monthStart.getDay();

    const emptyDays = Array(firstDayOfMonth).fill(null);

    return [...emptyDays, ...days].map((date, index) => {
      if (!date) {
        return <div key={`empty-${index}`} className="aspect-square" />;
      }

      const dateString = format(date, "yyyy-MM-dd");
      const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
      const isUnavailable = mockService.unavailableDates.includes(dateString);
      const isClosedDay = !mockService.workingDays.includes(dayOfWeek);
      const isPast = isBefore(date, startOfDay(new Date()));
      const isSelected = selectedDate && isSameDay(date, selectedDate);

      return (
        <button
          key={index}
          onClick={() =>
            !isUnavailable && !isPast && !isClosedDay && handleDateSelect(date)
          }
          className={`
            aspect-square p-2 rounded-lg text-sm font-medium
            ${
              isSelected
                ? "bg-teal-600 text-white"
                : !isUnavailable && !isPast && !isClosedDay
                ? "hover:bg-teal-50 text-gray-900"
                : "text-gray-400 cursor-not-allowed"
            }
          `}
          disabled={isUnavailable || isPast || isClosedDay}
        >
          {format(date, "d")}
        </button>
      );
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Agendar {mockService.title}
            </h1>
            <p className="text-gray-600 mb-8">
              Selecione uma data disponível e preencha o formulário para agendar
              o serviço.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendário */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentMonth(addDays(currentMonth, -30))
                      }
                      className="p-2 rounded-lg hover:bg-gray-100"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                      className="p-2 rounded-lg hover:bg-gray-100"
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
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (day, index) => (
                      <div
                        key={day}
                        className={`text-center text-sm font-medium ${
                          mockService.workingDays.includes(index)
                            ? "text-gray-500"
                            : "text-gray-300"
                        }`}
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-600 shrink-0"></div>
                    <span className="truncate">Data selecionada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200 shrink-0"></div>
                    <span className="truncate">Data disponível</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-100 shrink-0"></div>
                    <span className="truncate">Data indisponível</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 shrink-0"></div>
                    <span className="truncate">Dia fechado</span>
                  </div>
                </div>

                {/* Horários Disponíveis */}
                {selectedDate && availableTimeSlots.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Horários Disponíveis
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            px-3 py-2 rounded-lg text-sm font-medium
                            ${
                              selectedTime === time
                                ? "bg-teal-600 text-white"
                                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            }
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Formulário */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informações para Agendamento
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-2 h-2 rounded-full ${
                            step === currentStep
                              ? "bg-teal-600"
                              : step < currentStep
                              ? "bg-teal-300"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>{renderFormSection()}</form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Sucesso */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Agendamento Confirmado!"
        message={
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
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
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Seu agendamento foi realizado com sucesso!
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Um e-mail de confirmação foi enviado para {formData.tutorEmail}
            </p>
            <p className="text-sm text-gray-500">
              Você será redirecionado para a página inicial em alguns
              segundos...
            </p>
          </div>
        }
        confirmText="OK"
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate("/");
        }}
      />
    </>
  );
};

export default ServiceSchedulePage;
