import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCVStore } from '../store/cvStore';

function Dashboard() {
  const { cvs, createNewCV, setActiveCV, deleteCV, activeCVId } = useCVStore();
  const [isCreatingCV, setIsCreatingCV] = useState(false);
  const [newCVName, setNewCVName] = useState('Mi CV');

  const handleCreateCV = (e) => {
    e.preventDefault();
    if (newCVName.trim()) {
      createNewCV(newCVName);
      setNewCVName('Mi CV');
      setIsCreatingCV(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mis Currículums</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Gestiona tus currículums y crea nuevos a partir de plantillas profesionales.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center text-center h-60">
          {isCreatingCV ? (
            <form onSubmit={handleCreateCV} className="w-full">
              <input
                type="text"
                value={newCVName}
                onChange={(e) => setNewCVName(e.target.value)}
                className="input mb-4"
                placeholder="Nombre del CV"
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCV(false)}
                  className="btn btn-outline py-2 px-4 flex-1"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary py-2 px-4 flex-1">
                  Crear
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="text-4xl mb-3">➕</div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">Crear nuevo CV</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Crea un nuevo currículum desde cero
              </p>
              <button
                onClick={() => setIsCreatingCV(true)}
                className="btn btn-primary py-2 px-4"
              >
                Comenzar
              </button>
            </>
          )}
        </div>

        {Object.values(cvs).map((cv) => (
          <div
            key={cv.id}
            className={`border rounded-lg overflow-hidden ${
              cv.id === activeCVId
                ? 'border-primary-500 dark:border-primary-400 shadow-md'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-4xl">📄</div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                {cv.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Última edición: {new Date(cv.updatedAt).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <Link
                  to="/editor"
                  onClick={() => setActiveCV(cv.id)}
                  className="btn btn-primary py-2 px-4 text-sm flex-1"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteCV(cv.id)}
                  className="btn btn-outline py-2 px-3 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Inicio rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-medium mb-1">1. Crear tu CV</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Elige una plantilla y personaliza tu información
            </p>
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-medium mb-1">2. Personalizar</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Aplica colores, fuentes y ajusta el diseño
            </p>
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-md p-4">
            <div className="text-3xl mb-2">📥</div>
            <h3 className="font-medium mb-1">3. Exportar</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Descarga tu CV en formato PDF listo para enviar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 