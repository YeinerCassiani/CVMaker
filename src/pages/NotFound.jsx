import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-16">
      <div className="text-8xl mb-6">🔎</div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Página no encontrada</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link to="/" className="btn btn-primary py-2 px-6">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound; 