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
import { useState } from "react";

const OngCalendarioPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock data - substitua por dados reais da sua API
  const mockWorkingDays = [1, 2, 3, 4, 5]; // Segunda a Sexta
  const mockUnavailableDates = ["2024-04-23", "2024-04-24", "2024-04-30"];

  // Mock de eventos - substitua por dados reais da sua API
  const mockEvents = [
    {
      id: 1,
      title: "Consulta Veterinária",
      date: "2024-04-15",
      time: "14:00",
      type: "Veterinário",
    },
    {
      id: 2,
      title: "Feira de Adoção",
      date: "2024-04-20",
      time: "10:00",
      type: "Evento",
    },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
      const dayOfWeek = date.getDay();
      const isUnavailable = mockUnavailableDates.includes(dateString);
      const isClosedDay = !mockWorkingDays.includes(dayOfWeek);
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

  const selectedDateEvents = selectedDate
    ? mockEvents.filter(
        (event) => event.date === format(selectedDate, "yyyy-MM-dd")
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Calendário</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Novo compromisso
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendário */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
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
                      mockWorkingDays.includes(index)
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
          </div>
        </div>

        {/* Coluna lateral com eventos */}
        <div className="space-y-8">
          {/* Eventos do dia selecionado */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedDate
                ? `Compromissos para ${format(selectedDate, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}`
                : "Selecione uma data"}
            </h2>
            <div className="space-y-4">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600">{event.time}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          event.type === "Veterinário"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Nenhum compromisso para esta data
                </p>
              )}
            </div>
          </div>

          {/* Próximos Eventos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Próximos compromissos
            </h2>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(event.date), "EEEE, dd 'de' MMMM", {
                          locale: ptBR,
                        })}{" "}
                        - {event.time}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        event.type === "Veterinário"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngCalendarioPage;
