import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import CadastroOngPage from "./pages/CadastroOngPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import OnboardingOngPage from "./pages/OnboardingOngPage";
import OngsPage from "./pages/OngsPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import PetsPage from "./pages/PetsPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ServiceSchedulePage from "./pages/ServiceSchedulePage";
import ServicosPage from "./pages/ServicosPage";
import SobrePage from "./pages/SobrePage";

function App() {
  return (
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
          <Route path="ongs/onboarding" element={<OnboardingOngPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
