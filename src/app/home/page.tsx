import React from 'react';

export default function Dashboard() {
  return (
    <div className="bg-white text-gray-800 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tablero</h1>
        <p className="text-gray-600 mt-2">Resumen de estadísticas y gráficos</p>
      </header>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">TODOS LOS SERVICIOS</h2>
          <p className="text-4xl font-bold text-red-600">10823</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">SERVICIOS DEL DÍA</h2>
          <p className="text-4xl font-bold text-red-600">5</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">INCIDENTES</h2>
          <p className="text-4xl font-bold text-red-600">9275</p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* Gráficas de pastel */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Distribución de Servicios</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gráfica 1 */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Tipos de Servicio</h3>
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-8 border-red-500"></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-300 transform -rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-200 transform -rotate-90"></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-100 transform -rotate-135"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Instalaciones (45%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-300 rounded-full mr-2"></div>
                <span className="text-sm">Mantenimiento (30%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-200 rounded-full mr-2"></div>
                <span className="text-sm">Consultas (15%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
                <span className="text-sm">Otros (10%)</span>
              </div>
            </div>
          </div>

          {/* Gráfica 2 */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Estado de Incidentes</h3>
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-8 border-red-600" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-400" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 50%)' }}></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-200" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 50% 50%)' }}></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                <span className="text-sm">Resueltos (60%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <span className="text-sm">En Proceso (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-200 rounded-full mr-2"></div>
                <span className="text-sm">Pendientes (15%)</span>
              </div>
            </div>
          </div>

          {/* Gráfica 3 */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Satisfacción</h3>
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-8 border-gray-300"></div>
                <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }}></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Satisfechos (85%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Neutros (15%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};