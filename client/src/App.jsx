import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
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
            <Route
              path="ongs/onboarding"
              element={
                <PrivateRoute>
                  <OnboardingOngPage />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
