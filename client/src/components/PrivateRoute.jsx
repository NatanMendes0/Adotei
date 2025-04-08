import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (false) {
    // Redireciona para a página de login, salvando a rota atual
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se o usuário não completou o onboarding e não está na página de onboarding
  if (false) {
    return <Navigate to="/ongs/onboarding" replace />;
  }

  // Se o usuário completou o onboarding e está tentando acessar a página de onboarding
  if (false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
