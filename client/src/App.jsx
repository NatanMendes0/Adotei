import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import OngsPage from "./pages/OngsPage";
import PetsPage from "./pages/PetsPage";
import SobrePage from "./pages/SobrePage";

function App() {
  return (
    <FavoritesProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/para-ongs" element={<OngsPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
