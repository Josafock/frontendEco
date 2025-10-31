'use client';

import { Search, Calendar, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function HistorialPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  
  // Datos de ejemplo basados en la imagen
  const historial = [
    {
      folio: 'TOL-001',
      estudio: 'ANALISIS CLINICO',
      paciente: 'Maria Hernández Hernández',
      fechaRegistro: '2022-07-30',
      sucursal: 'Unidad Móvil',
      status: 'CONCURSO'
    },
    {
      folio: 'TOL-002',
      estudio: 'COMPROBANTE DE DIABETES BASICO',
      paciente: 'Benita Rivera Hernández',
      fechaRegistro: '2022-07-31',
      sucursal: 'Unidad Móvil',
      status: 'CONCURSO'
    },
    {
      folio: 'TOL-003',
      estudio: 'BIOMETRIA HEMATICA COMPLETA',
      paciente: 'DOMINGA BAUTISTA HERMANDEZ',
      fechaRegistro: '2022-08-16',
      sucursal: 'Unidad Móvil',
      status: 'CONCURSO'
    },
    {
      folio: 'TOL-004',
      estudio: 'REACCIONES FLEBRALES CONTROL (BASICO IBHC-056-EGO)',
      paciente: 'Juan Pérez López',
      fechaRegistro: '2022-08-20',
      sucursal: 'Unidad Móvil',
      status: 'COMPLETADO'
    },
    {
      folio: 'TOL-005',
      estudio: 'PERFIL LIPIDICO',
      paciente: 'Ana García Martínez',
      fechaRegistro: '2022-08-25',
      sucursal: 'Unidad Móvil',
      status: 'CANCELADO'
    }
  ];

  type Status = 'CONCURSO' | 'COMPLETADO' | 'CANCELADO' | 'PENDIENTE' | string;

  const getStatusColor = (status: Status): string => {
    const colors: Record<string, string> = {
      'CONCURSO': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'COMPLETADO': 'bg-green-100 text-green-800 border-green-200',
      'CANCELADO': 'bg-red-100 text-red-800 border-red-200',
      'PENDIENTE': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Historial</h1>
          <p className="text-gray-600">Registro histórico de servicios médicos</p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw size={18} />
            Actualizar
          </button>
        </div>
      </div>

      {/* Filtros y controles */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Fecha Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Inicio
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Fin
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Mostrar entradas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mostrar entradas
            </label>
            <select
              value={entriesCount}
              onChange={(e) => setEntriesCount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value={10}>10 entradas</option>
              <option value={25}>25 entradas</option>
              <option value={50}>50 entradas</option>
              <option value={100}>100 entradas</option>
            </select>
          </div>

          {/* Botón Limpiar */}
          <div className="flex items-end">
            <button className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar en historial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Tabla de historial - Versión Desktop */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header de la tabla */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-1">Folio</div>
          <div className="col-span-3">Estudio</div>
          <div className="col-span-2">Paciente</div>
          <div className="col-span-2">Fecha Registro</div>
          <div className="col-span-2">Sucursal</div>
          <div className="col-span-1">Estatus</div>
          <div className="col-span-1">Acciones</div>
        </div>

        {/* Lista de historial */}
        <div className="divide-y divide-gray-200">
          {historial.map((item) => (
            <div key={item.folio} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              {/* Folio */}
              <div className="col-span-1">
                <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {item.folio}
                </span>
              </div>

              {/* Estudio */}
              <div className="col-span-3">
                <h3 className="font-medium text-gray-900 text-sm">
                  {item.estudio}
                </h3>
              </div>

              {/* Paciente */}
              <div className="col-span-2">
                <p className="text-sm text-gray-900">{item.paciente}</p>
              </div>

              {/* Fecha Registro */}
              <div className="col-span-2">
                <p className="text-sm text-gray-900">{item.fechaRegistro}</p>
              </div>

              {/* Sucursal */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.sucursal}
                </span>
              </div>

              {/* Estatus */}
              <div className="col-span-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-1">
                <div className="flex items-center justify-end space-x-1">
                  <button 
                    className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700"
                    title="Ver detalles"
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer de la tabla */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-medium">{historial.length}</span> de <span className="font-medium">50</span> registros
            </p>
            
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                Anterior
              </button>
              <span className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</span>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Versión Móvil */}
      <div className="lg:hidden space-y-4">
        {historial.map((item) => (
          <div key={item.folio} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {/* Header con Folio y Status */}
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {item.folio}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            {/* Estudio */}
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 text-sm mb-1">Estudio:</h3>
              <p className="text-sm text-gray-700">{item.estudio}</p>
            </div>

            {/* Paciente */}
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 text-sm mb-1">Paciente:</h3>
              <p className="text-sm text-gray-700">{item.paciente}</p>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <p className="text-gray-500 text-xs">Fecha Registro</p>
                <p className="text-gray-900 font-medium">{item.fechaRegistro}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Sucursal</p>
                <p className="text-gray-900 font-medium">{item.sucursal}</p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-end pt-3 border-t border-gray-200">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Información de paginación móvil */}
      <div className="lg:hidden mt-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {historial.length} de 50 registros
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                ←
              </button>
              <span className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</span>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}