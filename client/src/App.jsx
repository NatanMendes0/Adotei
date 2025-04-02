import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import OngsPage from "./pages/OngsPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import PetsPage from "./pages/PetsPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ServicosPage from "./pages/ServicosPage";
import SobrePage from "./pages/SobrePage";

function App() {
  return (
    <FavoritesProvider>
      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/:id" element={<PetDetailsPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/ongs" element={<OngsPage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/servicos/:id" element={<ServiceDetailsPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
