import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

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
    const response = await api.post("/api/usuarios/cadastro", {
      ...data,
      role: "ONG",
    });

    if (response.data.token) {
      localStorage.setItem("@Adotei:token", response.data.token);
      localStorage.setItem("@Adotei:user", JSON.stringify(response.data.user));
    }

    return response.data;
  },
};

export default api;
