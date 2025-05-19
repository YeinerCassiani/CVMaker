import { useCVStore } from '../store/cvStore';
import { useTemplateStore } from '../store/templateStore';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ModernTemplate from '../templates/ModernTemplate';
import html2pdf from 'html2pdf.js';

function Preview() {
  const { cvData } = useCVStore();
  const { activeTemplateId, paperSize, margins, showPageNumbers } = useTemplateStore();
  const [scale, setScale] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const cvRef = useRef(null);

  const handleGeneratePDF = () => {
    setIsGeneratingPDF(true);
    
    if (cvRef.current) {
      const opt = {
        margin: margins === 'narrow' ? 10 : margins === 'normal' ? 15 : 20,
        filename: `CV-${cvData.personalInfo.firstName}-${cvData.personalInfo.lastName || 'Apellido'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { 
          unit: 'mm', 
          format: paperSize === 'a4' ? 'a4' : paperSize === 'letter' ? 'letter' : 'legal',
          orientation: 'portrait' 
        }
      };

      const element = cvRef.current.cloneNode(true);
      
      element.style.transform = 'none';
      element.style.width = paperSize === 'a4' ? '210mm' : paperSize === 'letter' ? '8.5in' : '8.5in';
      element.style.height = 'auto';
      element.style.padding = margins === 'narrow' ? '15mm' : margins === 'normal' ? '25mm' : '35mm';
      element.style.boxShadow = 'none';
      element.style.border = 'none';
      
      html2pdf().set(opt).from(element).save().then(() => {
        setIsGeneratingPDF(false);
      }).catch(err => {
        console.error('Error al generar PDF:', err);
        setIsGeneratingPDF(false);
        alert('Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.');
      });
    } else {
      setIsGeneratingPDF(false);
      alert('No se pudo encontrar el contenido para exportar.');
    }
  };

  const renderTemplate = () => {
    switch (activeTemplateId) {
      case 'modern':
      default:
        return <ModernTemplate cvData={cvData} />;
    }
  };

  return (
    <div>
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Vista Previa</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Visualiza cómo se verá tu currículum y expórtalo.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setScale(Math.max(0.5, scale - 0.1))}
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              -
            </button>
            <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
            <button 
              onClick={() => setScale(Math.min(1.5, scale + 0.1))}
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="btn btn-primary py-2 px-4 flex items-center"
          >
            {isGeneratingPDF ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Generando...
              </>
            ) : (
              <>
                <span className="mr-2">📥</span>
                Exportar PDF
              </>
            )}
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-4 justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">Plantilla:</span>{' '}
          <span className="text-slate-600 dark:text-slate-400 capitalize">{activeTemplateId}</span>
          <Link to="/templates" className="text-primary ml-2 hover:underline">
            Cambiar
          </Link>
        </div>
        
        <div className="text-sm">
          <span className="font-medium">Tamaño:</span>{' '}
          <span className="text-slate-600 dark:text-slate-400 uppercase">{paperSize}</span>
        </div>
        
        <div className="text-sm">
          <span className="font-medium">Márgenes:</span>{' '}
          <span className="text-slate-600 dark:text-slate-400 capitalize">{margins}</span>
        </div>
        
        <div className="text-sm">
          <span className="font-medium">Números de página:</span>{' '}
          <span className="text-slate-600 dark:text-slate-400">{showPageNumbers ? 'Sí' : 'No'}</span>
        </div>
        
        <Link to="/settings" className="text-primary hover:underline text-sm">
          Cambiar configuración
        </Link>
      </div>

      <div className="flex justify-center mb-6">
        <div 
          ref={cvRef}
          className="bg-white shadow-lg border border-slate-200 dark:border-slate-700" 
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: paperSize === 'a4' ? '210mm' : paperSize === 'letter' ? '8.5in' : '8.5in',
            height: paperSize === 'a4' ? '297mm' : paperSize === 'letter' ? '11in' : '14in',
            padding: margins === 'narrow' ? '15mm' : margins === 'normal' ? '25mm' : '35mm',
            transition: 'transform 0.2s, padding 0.2s'
          }}
        >
          {renderTemplate()}
          
          {showPageNumbers && (
            <div className="absolute bottom-5 right-5 text-slate-400 text-sm">
              1
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <Link to="/editor" className="btn btn-outline py-2 px-6">
          Volver al editor
        </Link>
        
        <button 
          onClick={handleGeneratePDF}
          disabled={isGeneratingPDF}
          className="btn btn-primary py-2 px-6"
        >
          {isGeneratingPDF ? 'Generando...' : 'Exportar PDF'}
        </button>
      </div>
    </div>
  );
}

export default Preview; 