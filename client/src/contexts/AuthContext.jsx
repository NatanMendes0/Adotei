import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("@Adotei:user");
    const token = localStorage.getItem("@Adotei:token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Verifica se o usuário completou o onboarding
      if (false) {
        navigate("/ongs/onboarding");
      }
    }

    setLoading(false);
  }, [navigate]);

  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem("@Adotei:token");
    localStorage.removeItem("@Adotei:user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
