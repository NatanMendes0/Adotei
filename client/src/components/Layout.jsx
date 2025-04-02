import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">Adotei</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/pets"
                className={`text-sm font-medium ${
                  location.pathname === "/pets"
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                Adotar
              </Link>
              <Link
                to="/servicos"
                className={`text-sm font-medium ${
                  location.pathname === "/servicos"
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                Serviços
              </Link>
              <Link
                to="/para-ongs"
                className={`text-sm font-medium ${
                  location.pathname === "/para-ongs"
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                Para ONGs
              </Link>
              <Link
                to="/sobre"
                className={`text-sm font-medium ${
                  location.pathname === "/sobre"
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                Sobre
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/favoritos"
                className={`text-gray-600 hover:text-teal-600 flex items-center ${
                  location.pathname === "/favoritos" ? "text-teal-600" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill={favorites.length > 0 ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Favoritos {favorites.length > 0 && `(${favorites.length})`}
                </span>
              </Link>
              <Link
                to="/entrar"
                className="text-teal-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-teal-600 hover:text-white transition-colors text-sm font-medium"
              >
                Entrar
              </Link>
              <Link
                to="/cadastrar"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-teal-600 hover:border hover:border-teal-600 transition-colors text-sm font-medium"
              >
                Cadastrar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600 hover:text-teal-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/pets"
                  className={`text-sm font-medium ${
                    location.pathname === "/pets"
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Adotar
                </Link>
                <Link
                  to="/servicos"
                  className={`text-sm font-medium ${
                    location.pathname === "/servicos"
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link
                  to="/para-ongs"
                  className={`text-sm font-medium ${
                    location.pathname === "/para-ongs"
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Para ONGs
                </Link>
                <Link
                  to="/sobre"
                  className={`text-sm font-medium ${
                    location.pathname === "/sobre"
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/favoritos"
                    className={`text-gray-600 hover:text-teal-600 flex items-center mb-4 ${
                      location.pathname === "/favoritos" ? "text-teal-600" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill={favorites.length > 0 ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Favoritos{" "}
                      {favorites.length > 0 && `(${favorites.length})`}
                    </span>
                  </Link>
                  <Link
                    to="/entrar"
                    className="block w-full text-center text-teal-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-teal-600 hover:text-white transition-colors text-sm font-medium mb-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/cadastrar"
                    className="block w-full text-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-teal-600 hover:border hover:border-teal-600 transition-colors text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
