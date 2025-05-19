import { useTemplateStore } from '../store/templateStore';
import { useCVStore } from '../store/cvStore';
import { Link } from 'react-router-dom';

function Templates() {
  const { templates, setActiveTemplate, activeTemplateId } = useTemplateStore();
  const { setTemplate } = useCVStore();

  const handleSelectTemplate = (templateId) => {
    setActiveTemplate(templateId);
    setTemplate(templateId);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Plantillas</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Elige entre nuestras plantillas profesionales para tu currículum.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(templates).map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg overflow-hidden ${
              template.id === activeTemplateId
                ? 'border-primary-500 dark:border-primary-400 shadow-lg ring-2 ring-primary-300'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className={`h-64 bg-slate-100 dark:bg-slate-800 relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-40 bg-white dark:bg-slate-700 shadow rounded flex items-center justify-center">
                  <span className="text-3xl">📄</span>
                </div>
              </div>
              {template.id === activeTemplateId && (
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Seleccionada
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                {template.description}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSelectTemplate(template.id)}
                  className={`py-2 px-4 rounded-md flex-1 ${
                    template.id === activeTemplateId
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'btn btn-primary'
                  }`}
                >
                  {template.id === activeTemplateId ? 'Seleccionada' : 'Seleccionar'}
                </button>
                
                <Link
                  to="/preview"
                  onClick={() => setActiveTemplate(template.id)}
                  className="btn btn-outline py-2 px-3"
                >
                  Vista previa
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/editor" className="btn btn-primary py-2 px-6">
          Continuar a edición
        </Link>
      </div>
    </div>
  );
}

export default Templates; 