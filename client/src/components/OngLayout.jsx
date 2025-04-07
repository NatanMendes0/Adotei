import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";

const OngLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-teal-600 text-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/ongs/dashboard" className="flex items-center">
              <img
                src={logo}
                alt="Adotei Logo"
                className="h-10 w-40 md:h-12 md:w-48 lg:h-14 lg:w-56"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/ongs/calendario"
                className={`text-sm font-medium ${
                  location.pathname === "/ongs/calendario"
                    ? "text-white"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                Calendário
              </Link>
              <Link
                to="/ongs/servicos"
                className={`text-sm font-medium ${
                  location.pathname === "/ongs/servicos"
                    ? "text-white"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                Serviços
              </Link>
              <Link
                to="/ongs/pets"
                className={`text-sm font-medium ${
                  location.pathname === "/ongs/pets"
                    ? "text-white"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                Pets
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={signOut}
                className="bg-white text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
              >
                Sair
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white hover:text-teal-100"
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
                  to="/ongs/calendario"
                  className={`text-sm font-medium ${
                    location.pathname === "/ongs/calendario"
                      ? "text-white"
                      : "text-teal-100 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Calendário
                </Link>
                <Link
                  to="/ongs/servicos"
                  className={`text-sm font-medium ${
                    location.pathname === "/ongs/servicos"
                      ? "text-white"
                      : "text-teal-100 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link
                  to="/ongs/pets"
                  className={`text-sm font-medium ${
                    location.pathname === "/ongs/pets"
                      ? "text-white"
                      : "text-teal-100 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pets
                </Link>
                <div className="pt-4 border-t border-teal-500">
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center bg-white text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
                  >
                    Sair
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-teal-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Adotei</h3>
              <p className="text-teal-100">
                Conectando ONGs e pessoas que amam animais.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/ongs/calendario"
                    className="text-teal-100 hover:text-white"
                  >
                    Calendário
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ongs/servicos"
                    className="text-teal-100 hover:text-white"
                  >
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ongs/pets"
                    className="text-teal-100 hover:text-white"
                  >
                    Pets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-teal-100">
                Email: contato@adotei.com.br
                <br />
                Telefone: (11) 9999-9999
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-teal-600 text-center text-teal-100">
            <p>&copy; 2024 Adotei. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OngLayout;
