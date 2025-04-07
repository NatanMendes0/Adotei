import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useNavigate } from "react-router-dom";
import onboardingImage from "../../assets/onboarding/2.png";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

const OnboardingOngPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profileImage: null,
    croppedImage: null,
    cep: "",
    state: "",
    city: "",
    address: "",
    number: "",
    complement: "",
    openingHours: [
      {
        specialHour: false,
        weekDays: [],
        opening: "09:00",
        closing: "18:00",
      },
    ],
  });
  const [cities, setCities] = useState([]);
  const [hasSpecialHours, setHasSpecialHours] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);

  // Estados para o modal de recorte
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  // Estado para armazenar o valor anterior do horário
  const [previousTimeValue, setPreviousTimeValue] = useState(null);

  // Função para criar um crop circular inicial
  function onImageLoad(e) {
    const { width, height } = e.currentTarget;

    // Criar um crop circular inicial
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      },
      1, // Aspect ratio 1:1 para círculo
      width,
      height
    );

    // Centralizar o crop
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

  // Função para recortar a imagem
  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // Desenhar a imagem recortada
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Criar um círculo para recortar a imagem
    const circleCanvas = document.createElement("canvas");
    circleCanvas.width = crop.width;
    circleCanvas.height = crop.height;
    const circleCtx = circleCanvas.getContext("2d");

    // Desenhar o círculo
    circleCtx.beginPath();
    circleCtx.arc(
      crop.width / 2,
      crop.height / 2,
      crop.width / 2,
      0,
      Math.PI * 2
    );
    circleCtx.closePath();
    circleCtx.clip();

    // Desenhar a imagem recortada dentro do círculo
    circleCtx.drawImage(canvas, 0, 0);

    return new Promise((resolve) => {
      circleCanvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = "cropped.png";
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        },
        "image/png",
        1
      );
    });
  };

  // Função para lidar com o upload da imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Criar URL temporária para a imagem
      const imageUrl = URL.createObjectURL(file);
      setTempImage(imageUrl);
      setShowCropModal(true);
    }
  };

  // Função para confirmar o recorte
  const handleCropConfirm = async () => {
    if (imgRef.current && completedCrop) {
      try {
        const croppedImageUrl = await getCroppedImg(
          imgRef.current,
          completedCrop
        );
        setFormData({
          ...formData,
          profileImage: tempImage, // Manter a imagem original para referência
          croppedImage: croppedImageUrl, // Salvar a imagem recortada
        });
        setShowCropModal(false);
      } catch (error) {
        console.error("Erro ao recortar imagem:", error);
        setError("Erro ao recortar a imagem. Tente novamente.");
      }
    }
  };

  // Função para cancelar o recorte
  const handleCropCancel = () => {
    setShowCropModal(false);
    setTempImage(null);
    setCrop(null);
    setCompletedCrop(null);
  };

  // Carregar estados ao montar o componente
  useEffect(() => {
    console.log("useEffect iniciado");
    const fetchStates = async () => {
      try {
        console.log("Iniciando busca de estados...");
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        console.log("Resposta recebida:", response);
        const data = await response.json();
        console.log("Dados recebidos:", data);
        // Ordenar estados alfabeticamente
        const sortedStates = data.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log("Estados ordenados:", sortedStates);
        setStates(sortedStates);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    };

    fetchStates();
  }, []);

  // Função para validar os campos do step 1
  const validateStep1 = () => {
    if (!formData.profileImage) {
      toast.error("Por favor, selecione uma foto de perfil");
      return false;
    }

    if (!formData.cep) {
      toast.error("Por favor, informe o CEP");
      return false;
    }

    if (formData.cep.length !== 8) {
      toast.error("CEP inválido. Digite os 8 dígitos");
      return false;
    }

    if (!formData.state) {
      toast.error("Por favor, selecione o estado");
      return false;
    }

    if (!formData.city) {
      toast.error("Por favor, selecione a cidade");
      return false;
    }

    if (!formData.address) {
      toast.error("Por favor, informe o endereço");
      return false;
    }

    if (!formData.number) {
      toast.error("Por favor, informe o número");
      return false;
    }

    return true;
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
        const state = states.find((s) => s.sigla === data.uf);

        if (state?.id) {
          // Primeiro setamos o estado para carregar as cidades
          setFormData((prev) => ({
            ...prev,
            state: state.nome,
            address: data.logradouro || "",
            complement: data.complemento || "",
          }));

          // Chamamos handleStateChange para carregar as cidades, passando a cidade do CEP
          handleStateChange({ target: { value: state.id } }, data.localidade);
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
  const handleStateChange = async (e, cityFromCep = null) => {
    const stateId = e.target.value;
    const selectedState = states.find((s) => s.id === stateId);

    setFormData((prev) => ({
      ...prev,
      state: selectedState?.nome || "",
      city: "",
    }));
    setCities([]);

    if (stateId) {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
        );
        const data = await response.json();
        const sortedCities = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setCities(sortedCities);

        // Se temos uma cidade do CEP, setamos ela agora
        if (cityFromCep) {
          // Encontramos a cidade exata na lista
          const cityFound = sortedCities.find(
            (city) => city.nome === cityFromCep
          );
          if (cityFound) {
            setFormData((prev) => ({
              ...prev,
              city: cityFound.nome,
            }));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      }
    }
  };

  // Função para converter dia da semana para número
  const dayToNumber = (day) => {
    const days = {
      Dom: 0,
      Seg: 1,
      Ter: 2,
      Qua: 3,
      Qui: 4,
      Sex: 5,
      Sáb: 7,
    };
    return days[day];
  };

  // Função para converter número para dia da semana
  const numberToDay = (num) => {
    const days = {
      0: "Dom",
      1: "Seg",
      2: "Ter",
      3: "Qua",
      4: "Qui",
      5: "Sex",
      7: "Sáb",
    };
    return days[num];
  };

  // Função para verificar se um horário é válido
  const isValidTimeRange = (opening, closing) => {
    const [openHour, openMin] = opening.split(":").map(Number);
    const [closeHour, closeMin] = closing.split(":").map(Number);

    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;

    return closeMinutes > openMinutes;
  };

  const handleDayToggle = (day) => {
    const dayNumber = dayToNumber(day);
    const currentHours = [...formData.openingHours];
    const mainSchedule = currentHours[0];

    // Se o dia já está em algum horário especial, não permite selecionar
    if (
      currentHours.some(
        (schedule, index) => index > 0 && schedule.weekDays.includes(dayNumber)
      ) &&
      !mainSchedule.weekDays.includes(dayNumber)
    ) {
      return;
    }

    const newWeekDays = mainSchedule.weekDays.includes(dayNumber)
      ? mainSchedule.weekDays.filter((d) => d !== dayNumber)
      : [...mainSchedule.weekDays, dayNumber];

    // Se não houver mais dias selecionados no horário normal
    if (newWeekDays.length === 0) {
      // Remove todos os horários especiais
      setFormData((prev) => ({
        ...prev,
        openingHours: [
          {
            ...mainSchedule,
            weekDays: [],
          },
        ],
      }));
      setHasSpecialHours(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        openingHours: [
          {
            ...mainSchedule,
            weekDays: newWeekDays,
          },
          ...currentHours.slice(1),
        ],
      }));
    }
  };

  const handleSpecialHoursCheckboxChange = (e) => {
    const checked = e.target.checked;
    setHasSpecialHours(checked);

    if (!checked) {
      setFormData((prev) => ({
        ...prev,
        openingHours: [prev.openingHours[0]],
      }));
    }
  };

  const handleSpecialHoursAdd = () => {
    const currentHours = [...formData.openingHours];
    const mainSchedule = currentHours[0];
    const allSelectedDays = currentHours.reduce(
      (acc, schedule) => [...acc, ...schedule.weekDays],
      []
    );
    const availableDays = [0, 1, 2, 3, 4, 5, 7].filter(
      (day) => !allSelectedDays.includes(day)
    );

    if (availableDays.length === 0) {
      toast.error(
        "Não há mais dias disponíveis para adicionar horários especiais"
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      openingHours: [
        ...prev.openingHours,
        {
          specialHour: true,
          weekDays: [],
          opening: "09:00",
          closing: "18:00",
        },
      ],
    }));
  };

  const handleSpecialHoursUpdate = (index, field, value) => {
    const currentHours = [...formData.openingHours];
    const schedule = currentHours[index];

    currentHours[index] = {
      ...schedule,
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      openingHours: currentHours,
    }));
  };

  const validateTimeRange = (index, field, value) => {
    const schedule = formData.openingHours[index];
    const otherField = field === "opening" ? "closing" : "opening";
    const otherValue = schedule[otherField];

    if (
      !isValidTimeRange(
        field === "opening" ? value : otherValue,
        field === "closing" ? value : otherValue
      )
    ) {
      toast.error(
        "O horário de fechamento deve ser posterior ao horário de abertura"
      );

      // Reverte para o valor anterior
      const currentHours = [...formData.openingHours];
      currentHours[index] = {
        ...schedule,
        [field]: previousTimeValue,
      };

      setFormData((prev) => ({
        ...prev,
        openingHours: currentHours,
      }));

      return false;
    }
    return true;
  };

  const handleSpecialDayToggle = (index, day) => {
    const dayNumber = dayToNumber(day);
    const currentHours = [...formData.openingHours];
    const schedule = currentHours[index];

    // Verifica se o dia já está selecionado em outro horário
    const isDaySelectedInOtherSchedule = currentHours.some(
      (otherSchedule, otherIndex) =>
        otherIndex !== index && otherSchedule.weekDays.includes(dayNumber)
    );

    if (isDaySelectedInOtherSchedule) {
      return;
    }

    const newWeekDays = schedule.weekDays.includes(dayNumber)
      ? schedule.weekDays.filter((d) => d !== dayNumber)
      : [...schedule.weekDays, dayNumber];

    currentHours[index] = {
      ...schedule,
      weekDays: newWeekDays,
    };

    setFormData((prev) => ({
      ...prev,
      openingHours: currentHours,
    }));
  };

  const handleSpecialHoursRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: prev.openingHours.filter((_, i) => i !== index),
    }));
  };

  const isDaySelected = (day) => {
    const dayNumber = dayToNumber(day);
    return formData.openingHours.some((schedule) =>
      schedule.weekDays.includes(dayNumber)
    );
  };

  const getAvailableDays = () => {
    const allSelectedDays = formData.openingHours.reduce(
      (acc, schedule) => [...acc, ...schedule.weekDays],
      []
    );
    return [0, 1, 2, 3, 4, 5, 7].filter(
      (day) => !allSelectedDays.includes(day)
    );
  };

  const shouldRemoveSpecialHour = (schedule) => {
    return schedule.weekDays.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificar se pelo menos um dia está selecionado
      const hasSelectedDays = formData.openingHours.some(
        (schedule) => schedule.weekDays.length > 0
      );

      if (!hasSelectedDays) {
        toast.error("Selecione pelo menos um dia de funcionamento");
        setIsLoading(false);
        return;
      }

      // Preparar os dados para envio
      const formDataToSend = new FormData();

      // Adicionar a imagem de perfil se existir
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      // Filtrar horários especiais vazios
      const filteredOpeningHours = formData.openingHours.filter(
        (schedule) =>
          !schedule.specialHour ||
          (schedule.specialHour && schedule.weekDays.length > 0)
      );

      // Adicionar os outros dados
      formDataToSend.append("state", formData.state);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("number", formData.number);
      formDataToSend.append("complement", formData.complement);
      formDataToSend.append(
        "openingHours",
        JSON.stringify(filteredOpeningHours)
      );

      // Enviar os dados para a API
      const response = await api.patch("/api/ong/onboarding", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Atualizar o usuário no contexto
      if (response.data && response.data.user) {
        updateUser(response.data.user);
      }

      // Redirecionar para o dashboard
      navigate("/ongs/dashboard");
    } catch (error) {
      console.error("Erro ao enviar dados do onboarding:", error);
      toast.error(
        error.response?.data?.message ||
          "Erro ao salvar as informações. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Foto de Perfil da ONG
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500">
            {formData.croppedImage ? (
              <img
                src={formData.croppedImage}
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
          <div className="flex flex-col space-y-2">
            <label className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Escolher Foto
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {formData.croppedImage && (
              <div className="text-xs text-gray-500 text-center">
                Clique em "Escolher Foto" para trocar
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          CEP
        </label>
        <input
          type="text"
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
          value={states.find((s) => s.nome === formData.state)?.id || ""}
          onChange={handleStateChange}
          className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
        >
          <option value="">Selecione um estado</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.nome}
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
            <option key={city.id} value={city.nome}>
              {city.nome}
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
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="Rua"
            />
          </div>
          <div>
            <input
              type="text"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="Número"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              value={formData.complement}
              onChange={(e) =>
                setFormData({ ...formData, complement: e.target.value })
              }
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
              placeholder="Complemento (opcional)"
            />
          </div>
        </div>
      </div>

      {/* Modal de Recorte de Imagem */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-md w-full m-4">
            <h3 className="text-lg font-semibold mb-2">
              Ajuste sua foto de perfil
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Arraste e ajuste a imagem para que ela fique bem posicionada
              dentro do círculo.
            </p>

            <div className="mb-3 border border-gray-300 rounded-lg overflow-hidden max-h-[300px] flex items-center justify-center bg-gray-50">
              <div className="w-full h-full flex items-center justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    src={tempImage}
                    alt="Crop me"
                    onLoad={onImageLoad}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "250px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </ReactCrop>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCropCancel}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCropConfirm}
                className="px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
                disabled={!completedCrop}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
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
            const isSelected = formData.openingHours[0].weekDays.includes(
              dayToNumber(day)
            );
            const isDisabled =
              formData.openingHours.some(
                (schedule, index) =>
                  index > 0 && schedule.weekDays.includes(dayToNumber(day))
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
            value={formData.openingHours[0].opening}
            onChange={(e) =>
              handleSpecialHoursUpdate(0, "opening", e.target.value)
            }
            onFocus={(e) => setPreviousTimeValue(e.target.value)}
            onBlur={(e) => validateTimeRange(0, "opening", e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
          />
          <span className="text-gray-600">até</span>
          <input
            type="time"
            value={formData.openingHours[0].closing}
            onChange={(e) =>
              handleSpecialHoursUpdate(0, "closing", e.target.value)
            }
            onFocus={(e) => setPreviousTimeValue(e.target.value)}
            onBlur={(e) => validateTimeRange(0, "closing", e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="specialHours"
          checked={
            hasSpecialHours && formData.openingHours[0].weekDays.length > 0
          }
          onChange={handleSpecialHoursCheckboxChange}
          disabled={formData.openingHours[0].weekDays.length === 0}
          className={`h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded ${
            formData.openingHours[0].weekDays.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        />
        <label
          htmlFor="specialHours"
          className={`text-lg font-medium ${
            formData.openingHours[0].weekDays.length === 0
              ? "text-gray-400"
              : "text-gray-700"
          }`}
        >
          Horários diferentes em alguns dias
          {formData.openingHours[0].weekDays.length === 0 && (
            <span className="block text-sm text-gray-500">
              Selecione pelo menos um dia no horário normal
            </span>
          )}
        </label>
      </div>

      {hasSpecialHours && (
        <div className="space-y-4">
          {formData.openingHours.slice(1).map((special, index) => (
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
                  onClick={() => handleSpecialHoursRemove(index + 1)}
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
                      const dayNumber = dayToNumber(day);
                      const isSelected = special.weekDays.includes(dayNumber);
                      const isDisabled = formData.openingHours.some(
                        (schedule, i) =>
                          i !== index + 1 &&
                          schedule.weekDays.includes(dayNumber)
                      );

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleSpecialDayToggle(index + 1, day)}
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
                    value={special.opening}
                    onChange={(e) =>
                      handleSpecialHoursUpdate(
                        index + 1,
                        "opening",
                        e.target.value
                      )
                    }
                    onFocus={(e) => setPreviousTimeValue(e.target.value)}
                    onBlur={(e) =>
                      validateTimeRange(index + 1, "opening", e.target.value)
                    }
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  />
                  <span className="text-gray-600">até</span>
                  <input
                    type="time"
                    value={special.closing}
                    onChange={(e) =>
                      handleSpecialHoursUpdate(
                        index + 1,
                        "closing",
                        e.target.value
                      )
                    }
                    onFocus={(e) => setPreviousTimeValue(e.target.value)}
                    onBlur={(e) =>
                      validateTimeRange(index + 1, "closing", e.target.value)
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
            disabled={getAvailableDays().length === 0}
            className={`w-full px-4 py-2 rounded-lg transition-colors ${
              getAvailableDays().length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            {getAvailableDays().length === 0
              ? "Não há mais dias disponíveis"
              : "Adicionar Horário Especial"}
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FEE2E2", // Vermelho pastel
            color: "#991B1B", // Vermelho escuro para o texto
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          },
          icon: "❌",
        }}
      />
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
                  onClick={() => {
                    if (validateStep1()) {
                      setCurrentStep(currentStep + 1);
                    }
                  }}
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
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden mb-6 h-96">
                  <img
                    src={onboardingImage}
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
