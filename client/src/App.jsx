import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import OngLayout from "./components/OngLayout";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import CadastroOngPage from "./pages/cadastro-ong/CadastroOngPage";
import FavoritesPage from "./pages/favoritos/FavoritesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NotFound from "./pages/not-found/NotFound";
import OnboardingOngPage from "./pages/onboarding/OnboardingOngPage";
import OngCalendarioPage from "./pages/ongs/calendario/OngCalendarioPage";
import OngDashboardPage from "./pages/ongs/dashboard/OngDashboardPage";
import OngPetsPage from "./pages/ongs/pets/OngPetsPage";
import OngServicosPage from "./pages/ongs/servicos/OngServicosPage";
import OngsPage from "./pages/para-ongs/OngsPage";
import PetDetailsPage from "./pages/pets/_id/PetDetailsPage";
import PetsPage from "./pages/pets/PetsPage";
import ServiceSchedulePage from "./pages/servicos/_id/agendar/ServiceSchedulePage";
import ServiceDetailsPage from "./pages/servicos/_id/ServiceDetailsPage";
import ServicosPage from "./pages/servicos/ServicosPage";
import SobrePage from "./pages/sobre/SobrePage";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ScrollToTop />

        <Routes>
          {/* Rotas públicas com Layout padrão */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="pets" element={<PetsPage />} />
            <Route path="pets/:id" element={<PetDetailsPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="para-ongs" element={<OngsPage />} />
            <Route path="cadastro-ong" element={<CadastroOngPage />} />
            <Route path="servicos" element={<ServicosPage />} />
            <Route path="servicos/:id" element={<ServiceDetailsPage />} />
            <Route
              path="servicos/:id/agendar"
              element={<ServiceSchedulePage />}
            />
            <Route path="sobre" element={<SobrePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Rotas protegidas com Layout da ONG */}
          <Route
            path="/ongs"
            element={
              <PrivateRoute>
                <OngLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<OngDashboardPage />} />
            <Route path="calendario" element={<OngCalendarioPage />} />
            <Route path="servicos" element={<OngServicosPage />} />
            <Route path="pets" element={<OngPetsPage />} />
            <Route path="onboarding" element={<OnboardingOngPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
