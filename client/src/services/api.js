import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Importante para receber cookies
});

console.log(import.meta.env.VITE_API_URL);

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@Adotei:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async registerOng(data) {
    const response = await api.post("/auth/cadastro", data);

    if (response.data.data && response.data.data.token) {
      // Armazena o token
      localStorage.setItem("@Adotei:token", response.data.data.token);

      // Armazena os dados do usuário
      localStorage.setItem("@Adotei:user", JSON.stringify(response.data.data));

      return {
        success: true,
        data: response.data.data,
        message: response.data.uiMessage || "ONG cadastrada com sucesso!",
      };
    }

    return {
      success: false,
      message: response.data.uiMessage || "Erro ao cadastrar ONG",
    };
  },

  async login(data) {
    const response = await api.post("/api/auth/login", data);

    if (response.data.token) {
      // Armazena o token
      localStorage.setItem("@Adotei:token", response.data.token);

      // Armazena os dados do usuário
      localStorage.setItem(
        "@Adotei:user",
        JSON.stringify({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
        })
      );

      return {
        success: true,
        data: response.data,
        message: "Login realizado com sucesso!",
      };
    }

    return {
      success: false,
      message: response.data.message || "Erro ao fazer login",
    };
  },

  async logout() {
    try {
      await api.get("/api/auth/logout");

      // Remove o token e os dados do usuário
      localStorage.removeItem("@Adotei:token");
      localStorage.removeItem("@Adotei:user");

      return {
        success: true,
        message: "Logout realizado com sucesso!",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer logout",
      };
    }
  },
};

export const ongService = {
  async onboarding(data) {
    const response = await api.patch("/api/ong", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: response.data,
      message: response.data.uiMessage || "Onboarding realizado com sucesso!",
    };
  },
};

export default api;
