import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import OnboardingOngPage from "./ong/onboarding/OnboardingOngPage";
import CadastroOngPage from "./pages/cadastro-ong/CadastroOngPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/not-found/NotFound";
import OngsPage from "./pages/para-ongs/OngsPage";
import PetDetailsPage from "./pages/pets/:id/PetDetailsPage";
import PetsPage from "./pages/PetsPage";
import ServiceSchedulePage from "./pages/ServiceSchedulePage";
import ServiceDetailsPage from "./pages/servicos/:id/ServiceDetailsPage";
import ServicosPage from "./pages/ServicosPage";
import SobrePage from "./pages/sobre/SobrePage";

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
