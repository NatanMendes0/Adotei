import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import OngLayout from "./components/OngLayout";
import PrivateRoute from "./components/PrivateRoute";
import SuccessPage from "./pages/adocao/sucesso/SuccessPage";
import AdoptPage from "./pages/adotar/_id/AdoptPage";
import CadastroOngPage from "./pages/cadastro-ong/CadastroOngPage";
import FavoritesPage from "./pages/favoritos/FavoritesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NotFound from "./pages/not-found/NotFound";
import OnboardingOngPage from "./pages/onboarding/OnboardingOngPage";
import OngCalendarioPage from "./pages/ongs/calendario/OngCalendarioPage";
import OngDashboardPage from "./pages/ongs/dashboard/OngDashboardPage";
import NovoPetPage from "./pages/ongs/pets/novo/NovoPetPage";
import OngPetsPage from "./pages/ongs/pets/OngPetsPage";
import NovoServicoPage from "./pages/ongs/servicos/novo/NovoServicoPage";
import OngServicosPage from "./pages/ongs/servicos/OngServicosPage";
import OngsPage from "./pages/para-ongs/OngsPage";
import PetDetailsPage from "./pages/pets/_id/PetDetailsPage";
import PetsPage from "./pages/pets/PetsPage";
import ServiceSchedulePage from "./pages/servicos/_id/agendar/ServiceSchedulePage";
import ServiceDetailsPage from "./pages/servicos/_id/ServiceDetailsPage";
import ServicosPage from "./pages/servicos/ServicosPage";
import SobrePage from "./pages/sobre/SobrePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas com Layout padrão */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="pets/:id" element={<PetDetailsPage />} />
        <Route path="adotar/:id" element={<AdoptPage />} />
        <Route path="adocao/sucesso" element={<SuccessPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="para-ongs" element={<OngsPage />} />
        <Route path="cadastro-ong" element={<CadastroOngPage />} />
        <Route path="servicos" element={<ServicosPage />} />
        <Route path="servicos/:id" element={<ServiceDetailsPage />} />
        <Route path="servicos/:id/agendar" element={<ServiceSchedulePage />} />
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
        <Route path="servicos/novo" element={<NovoServicoPage />} />
        <Route path="pets" element={<OngPetsPage />} />
        <Route path="pets/novo" element={<NovoPetPage />} />
        <Route path="onboarding" element={<OnboardingOngPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
