import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ScrollToTop />
        <AppRoutes />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
