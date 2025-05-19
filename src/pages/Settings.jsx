import { useTemplateStore } from '../store/templateStore';
import { useState } from 'react';

function Settings() {
  const {
    colorThemes,
    fonts,
    activeColorTheme,
    activeFont,
    paperSize,
    margins,
    spacing,
    showPageNumbers,
    setColorTheme,
    setFont,
    setPaperSize,
    setMargins,
    setSpacing,
    setShowPageNumbers,
  } = useTemplateStore();

  const [activeTab, setActiveTab] = useState('appearance');

  const colorOptions = Object.keys(colorThemes);
  const fontOptions = Object.keys(fonts);
  const paperSizeOptions = [
    { id: 'a4', label: 'A4 (210 × 297 mm)', value: 'a4' },
    { id: 'letter', label: 'Carta (215.9 × 279.4 mm)', value: 'letter' },
    { id: 'legal', label: 'Legal (215.9 × 355.6 mm)', value: 'legal' },
  ];
  
  const marginOptions = [
    { id: 'narrow', label: 'Angosto', value: 'narrow' },
    { id: 'normal', label: 'Normal', value: 'normal' },
    { id: 'wide', label: 'Amplio', value: 'wide' },
  ];
  
  const spacingOptions = [
    { id: 'compact', label: 'Compacto', value: 'compact' },
    { id: 'normal', label: 'Normal', value: 'normal' },
    { id: 'wide', label: 'Amplio', value: 'wide' },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Configuración</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Personaliza la apariencia y el formato de tu currículum.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('appearance')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'appearance'
                  ? 'border-b-2 border-primary text-primary dark:border-primary-400 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Apariencia
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'layout'
                  ? 'border-b-2 border-primary text-primary dark:border-primary-400 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Formato y página
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'export'
                  ? 'border-b-2 border-primary text-primary dark:border-primary-400 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Exportación
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Esquema de colores
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {colorOptions.map((colorKey) => (
                    <button
                      key={colorKey}
                      onClick={() => setColorTheme(colorKey)}
                      className={`h-12 rounded-md overflow-hidden transition-all ${
                        activeColorTheme === colorKey
                          ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-800'
                          : ''
                      }`}
                      style={{
                        backgroundColor: colorThemes[colorKey].primary.DEFAULT,
                      }}
                    >
                      <span className="sr-only">{colorKey}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Tipografía
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {fontOptions.map((fontKey) => (
                    <button
                      key={fontKey}
                      onClick={() => setFont(fontKey)}
                      className={`p-4 border rounded-md text-left transition-all ${
                        activeFont === fontKey
                          ? 'border-primary bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="text-lg mb-1" style={{ fontFamily: fonts[fontKey].join(',') }}>
                        Aa Bb Cc 123
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                        {fontKey}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Tamaño de página
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paperSizeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPaperSize(option.value)}
                      className={`p-4 border rounded-md text-left transition-all ${
                        paperSize === option.value
                          ? 'border-primary bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="font-medium mb-1">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Márgenes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {marginOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setMargins(option.value)}
                      className={`p-4 border rounded-md text-left transition-all ${
                        margins === option.value
                          ? 'border-primary bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Espaciado
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {spacingOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSpacing(option.value)}
                      className={`p-4 border rounded-md text-left transition-all ${
                        spacing === option.value
                          ? 'border-primary bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Extras
                </h2>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showPageNumbers}
                    onChange={(e) => setShowPageNumbers(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span>Mostrar números de página</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Opciones de exportación
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Selecciona el formato en el que deseas exportar tu currículum.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-md flex items-center space-x-3 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <div className="text-3xl">📄</div>
                    <div className="text-left">
                      <div className="font-medium mb-1">PDF</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Formato más común para enviar currículums
                      </div>
                    </div>
                  </button>
                  
                  <button className="p-4 border border-slate-200 dark:border-slate-700 rounded-md flex items-center space-x-3 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <div className="text-3xl">💾</div>
                    <div className="text-left">
                      <div className="font-medium mb-1">JSON</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Exporta tus datos para respaldo o transferencia
                      </div>
                    </div>
                  </button>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-4">
                  <h3 className="font-medium mb-2">Consejo útil</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Al exportar en formato PDF, asegúrate de que todos tus datos estén completos 
                    y verifica la vista previa antes de descargar.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings; 