import { Toaster } from "react-hot-toast";
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
        <Toaster position="top-right" />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
