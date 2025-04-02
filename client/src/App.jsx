import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
