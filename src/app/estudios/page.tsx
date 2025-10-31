'use client';

import { Search, Plus, Filter, Edit, Trash2, Eye, Tag, DollarSign, Hash } from 'lucide-react';
import { useState } from 'react';

export default function EstudiosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo para estudios
  const estudios = [
    {
      id: 1,
      nombre: 'BIOMETRIA HEMATICA COMPLETA',
      clave: 'BHC-001',
      precio: '450.00',
      categoria: 'Hematología',
      estatus: 'Activo',
      descripcion: 'Análisis completo de células sanguíneas'
    },
    {
      id: 2,
      nombre: 'QUIMICA SANGUINEA 35 ELEMENTOS',
      clave: 'QS-035',
      precio: '680.00',
      categoria: 'Bioquímica',
      estatus: 'Activo',
      descripcion: 'Perfil bioquímico completo de 35 elementos'
    },
    {
      id: 3,
      nombre: 'EXAMEN GENERAL DE ORINA',
      clave: 'EGO-001',
      precio: '120.00',
      categoria: 'Urianálisis',
      estatus: 'Activo',
      descripcion: 'Análisis físico, químico y microscópico de orina'
    },
    {
      id: 4,
      nombre: 'PERFIL LIPIDICO',
      clave: 'PL-001',
      precio: '280.00',
      categoria: 'Cardiología',
      estatus: 'Inactivo',
      descripcion: 'Estudio de colesterol y triglicéridos'
    },
    {
      id: 5,
      nombre: 'PRUEBA DE EMBARAZO EN SANGRE',
      clave: 'PES-001',
      precio: '150.00',
      categoria: 'Ginecología',
      estatus: 'Activo',
      descripcion: 'Detección cuantitativa de hormona del embarazo'
    },
    {
      id: 6,
      nombre: 'GRUPO SANGUINEO Y FACTOR RH',
      clave: 'GSFR-001',
      precio: '200.00',
      categoria: 'Hematología',
      estatus: 'Activo',
      descripcion: 'Determinación de grupo sanguíneo y factor Rh'
    },
    {
      id: 7,
      nombre: 'PRUEBA DE COVID-19 PCR',
      clave: 'COVID-PCR',
      precio: '890.00',
      categoria: 'Infectología',
      estatus: 'Inactivo',
      descripcion: 'Detección molecular de SARS-CoV-2'
    },
    {
      id: 8,
      nombre: 'PERFIL HEPATICO',
      clave: 'PH-001',
      precio: '320.00',
      categoria: 'Gastroenterología',
      estatus: 'Activo',
      descripcion: 'Evaluación de función hepática'
    }
  ];

  type Estatus = 'Activo' | 'Inactivo' | 'Pendiente' | string;

  interface StatusColorMap {
    [key: string]: string;
  }

  const getStatusColor = (estatus: Estatus): string => {
    const colors: StatusColorMap = {
      'Activo': 'bg-green-100 text-green-800 border-green-200',
      'Inactivo': 'bg-red-100 text-red-800 border-red-200',
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[estatus] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  interface CategoriaColorMap {
    [key: string]: string;
  }

  const getCategoryColor = (categoria: string): string => {
    const colors: CategoriaColorMap = {
      'Hematología': 'bg-blue-100 text-blue-800',
      'Bioquímica': 'bg-purple-100 text-purple-800',
      'Urianálisis': 'bg-cyan-100 text-cyan-800',
      'Cardiología': 'bg-red-100 text-red-800',
      'Ginecología': 'bg-pink-100 text-pink-800',
      'Infectología': 'bg-orange-100 text-orange-800',
      'Gastroenterología': 'bg-emerald-100 text-emerald-800'
    };
    return colors[categoria] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Estudios</h1>
          <p className="text-gray-600">Catálogo de estudios y análisis médicos</p>
        </div>
        
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 lg:mt-0">
          <Plus size={20} />
          Nuevo Estudio
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre, clave o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          {/* Filtros */}
          <div className="flex gap-3">
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="">Todos los estatus</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="">Todas las categorías</option>
              <option value="Hematología">Hematología</option>
              <option value="Bioquímica">Bioquímica</option>
              <option value="Urianálisis">Urianálisis</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Ginecología">Ginecología</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Más Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Estudios</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Hash size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Tag size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactivos</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Tag size={20} className="text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
              <p className="text-2xl font-bold text-gray-900">$385</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de estudios - Versión Desktop */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header de la tabla */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-4">Nombre del Estudio</div>
          <div className="col-span-1">Clave</div>
          <div className="col-span-2">Categoría</div>
          <div className="col-span-2">Precio</div>
          <div className="col-span-2">Estatus</div>
          <div className="col-span-1">Acciones</div>
        </div>

        {/* Lista de estudios */}
        <div className="divide-y divide-gray-200">
          {estudios.map((estudio) => (
            <div key={estudio.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              {/* Nombre del Estudio */}
              <div className="col-span-4">
                <h3 className="font-medium text-gray-900 text-sm mb-1">
                  {estudio.nombre}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {estudio.descripcion}
                </p>
              </div>

              {/* Clave */}
              <div className="col-span-1">
                <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {estudio.clave}
                </span>
              </div>

              {/* Categoría */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(estudio.categoria)}`}>
                  {estudio.categoria}
                </span>
              </div>

              {/* Precio */}
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-green-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    ${estudio.precio}
                  </span>
                </div>
                <p className="text-xs text-gray-500">MXN</p>
              </div>

              {/* Estatus */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(estudio.estatus)}`}>
                  {estudio.estatus}
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-1">
                <div className="flex items-center justify-end space-x-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Ver detalles">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Editar">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Eliminar">
                    <Trash2 size={16} />
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
              Mostrando <span className="font-medium">8</span> de <span className="font-medium">24</span> estudios
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
        {estudios.map((estudio) => (
          <div key={estudio.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {/* Header con Clave y Estatus */}
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {estudio.clave}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(estudio.estatus)}`}>
                {estudio.estatus}
              </span>
            </div>

            {/* Nombre del Estudio */}
            <div className="mb-3">
              <h3 className="font-medium text-gray-900 text-sm mb-2">Estudio:</h3>
              <p className="text-sm text-gray-700">{estudio.nombre}</p>
              <p className="text-xs text-gray-500 mt-1">{estudio.descripcion}</p>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <p className="text-gray-500 text-xs">Categoría</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(estudio.categoria)}`}>
                  {estudio.categoria}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Precio</p>
                <div className="flex items-center gap-1">
                  <DollarSign size={14} className="text-green-600" />
                  <p className="text-gray-900 font-bold">${estudio.precio}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                ID: {estudio.id}
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye size={14} />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit size={14} />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}