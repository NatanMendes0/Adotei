import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PetsPage from "./pages/PetsPage";

function App() {
  return (
    // <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
      </Route>
    </Routes>
    // </Router>
  );
}

export default App;
