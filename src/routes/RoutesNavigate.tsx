import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import { Home, Briefcase, Menu, X } from "lucide-react";
import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/Portfolio";

const RoutesNavigate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/portfolio", label: "Portfolio", icon: Briefcase },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        <div className="p-6">
          <div className="mb-8 mt-12 lg:mt-0">
            <h1
              className={`font-bold text-2xl transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
              }`}
            >
              My Portfolio
            </h1>
            {!isSidebarOpen && (
              <div className="hidden lg:block text-center text-xl font-bold">
                MP
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "hover:bg-slate-700 text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon size={22} className="flex-shrink-0" />
                  <span
                    className={`transition-opacity duration-300 ${
                      isSidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
          }`}
        >
          <p className="text-sm text-gray-400">© 2025 Portfolio</p>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-0" : "lg:ml-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 lg:py-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default RoutesNavigate;
