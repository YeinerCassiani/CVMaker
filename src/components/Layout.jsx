import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/editor', label: 'Editor', icon: '✏️' },
    { path: '/preview', label: 'Vista previa', icon: '👁️' },
    { path: '/templates', label: 'Plantillas', icon: '📋' },
    { path: '/settings', label: 'Ajustes', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <h1 className="text-xl font-bold text-primary dark:text-primary-300">CVCraft</h1>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 py-2 hover:text-primary dark:hover:text-primary-300 transition-colors ${
                  location.pathname === item.path ? 'text-primary dark:text-primary-300 font-medium' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 border-t dark:border-slate-700">
            <nav className="container mx-auto px-4 py-2 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 py-3 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md ${
                    location.pathname === item.path ? 'text-primary dark:text-primary-300 font-medium' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t dark:border-slate-700 py-4">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CVCraft - Creado con React y Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 