'use client';

import { Search, Plus, Filter, Edit, Trash2, Eye, Phone, Mail, User, Stethoscope, BadgeCheck, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function MedicosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo para médicos
  const medicos = [
    {
      id: 1,
      nombre: 'DR. ROBERTO',
      apellidoPaterno: 'GARCIA',
      apellidoMaterno: 'MARTINEZ',
      especialidad: 'Medicina General',
      subespecialidad: '',
      cedula: '1234567',
      telefono: '7712345678',
      email: 'dr.garcia@clinica.com',
      consultorio: 'Consultorio 101',
      horario: 'Lunes a Viernes 9:00 - 14:00',
      fechaContratacion: '2020-03-15',
      estatus: 'Activo'
    },
    {
      id: 2,
      nombre: 'DRA. ANA MARIA',
      apellidoPaterno: 'LOPEZ',
      apellidoMaterno: 'HERNANDEZ',
      especialidad: 'Pediatría',
      subespecialidad: 'Neonatología',
      cedula: '2345678',
      telefono: '7719876543',
      email: 'dra.lopez@clinica.com',
      consultorio: 'Consultorio 205',
      horario: 'Lunes a Sábado 8:00 - 13:00',
      fechaContratacion: '2019-07-22',
      estatus: 'Activo'
    },
    {
      id: 3,
      nombre: 'DR. CARLOS',
      apellidoPaterno: 'RAMIREZ',
      apellidoMaterno: 'SANCHEZ',
      especialidad: 'Cardiología',
      subespecialidad: 'Ecocardiografía',
      cedula: '3456789',
      telefono: '7715551234',
      email: 'dr.ramirez@clinica.com',
      consultorio: 'Consultorio 302',
      horario: 'Martes a Viernes 10:00 - 16:00',
      fechaContratacion: '2021-11-30',
      estatus: 'Activo'
    },
    {
      id: 4,
      nombre: 'DRA. SOFIA',
      apellidoPaterno: 'DIAZ',
      apellidoMaterno: 'CASTILLO',
      especialidad: 'Ginecología',
      subespecialidad: 'Obstetricia',
      cedula: '4567890',
      telefono: '7714447890',
      email: 'dra.diaz@clinica.com',
      consultorio: 'Consultorio 104',
      horario: 'Lunes a Viernes 8:00 - 15:00',
      fechaContratacion: '2018-12-10',
      estatus: 'Activo'
    },
    {
      id: 5,
      nombre: 'DR. MIGUEL',
      apellidoPaterno: 'TORRES',
      apellidoMaterno: 'FLORES',
      especialidad: 'Ortopedia',
      subespecialidad: 'Traumatología',
      cedula: '5678901',
      telefono: '7713334567',
      email: 'dr.torres@clinica.com',
      consultorio: 'Consultorio 401',
      horario: 'Lunes a Jueves 9:00 - 17:00',
      fechaContratacion: '2022-05-18',
      estatus: 'Inactivo'
    },
    {
      id: 6,
      nombre: 'DRA. PATRICIA',
      apellidoPaterno: 'VARGAS',
      apellidoMaterno: 'MORALES',
      especialidad: 'Dermatología',
      subespecialidad: 'Dermatología Cosmética',
      cedula: '6789012',
      telefono: '7712223456',
      email: 'dra.vargas@clinica.com',
      consultorio: 'Consultorio 203',
      horario: 'Miércoles a Sábado 10:00 - 14:00',
      fechaContratacion: '2020-09-03',
      estatus: 'Activo'
    },
    {
      id: 7,
      nombre: 'DR. JAVIER',
      apellidoPaterno: 'CASTRO',
      apellidoMaterno: 'MENDOZA',
      especialidad: 'Gastroenterología',
      subespecialidad: 'Endoscopía',
      cedula: '7890123',
      telefono: '7716667891',
      email: 'dr.castro@clinica.com',
      consultorio: 'Consultorio 305',
      horario: 'Lunes a Viernes 11:00 - 18:00',
      fechaContratacion: '2019-02-14',
      estatus: 'Activo'
    },
    {
      id: 8,
      nombre: 'DRA. LAURA',
      apellidoPaterno: 'ORTIZ',
      apellidoMaterno: 'RUIZ',
      especialidad: 'Neurología',
      subespecialidad: 'Neurofisiología',
      cedula: '8901234',
      telefono: '7717772345',
      email: 'dra.ortiz@clinica.com',
      consultorio: 'Consultorio 501',
      horario: 'Lunes a Jueves 8:00 - 14:00',
      fechaContratacion: '2021-06-25',
      estatus: 'Activo'
    }
  ];

  const getEstatusColor = (estatus: string): string => {
    const colors: Record<string, string> = {
      'Activo': 'bg-green-100 text-green-800 border-green-200',
      'Inactivo': 'bg-red-100 text-red-800 border-red-200',
      'Vacaciones': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[estatus] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEspecialidadColor = (especialidad: string): string => {
    const colors: Record<string, string> = {
      'Medicina General': 'bg-blue-100 text-blue-800',
      'Pediatría': 'bg-pink-100 text-pink-800',
      'Cardiología': 'bg-red-100 text-red-800',
      'Ginecología': 'bg-purple-100 text-purple-800',
      'Ortopedia': 'bg-orange-100 text-orange-800',
      'Dermatología': 'bg-cyan-100 text-cyan-800',
      'Gastroenterología': 'bg-emerald-100 text-emerald-800',
      'Neurología': 'bg-indigo-100 text-indigo-800'
    };
    return colors[especialidad] || 'bg-gray-100 text-gray-800';
  };

  const calcularAntiguedad = (fechaContratacion: string): number => {
    const hoy = new Date();
    const contratacion = new Date(fechaContratacion);
    let años = hoy.getFullYear() - contratacion.getFullYear();
    const mes = hoy.getMonth() - contratacion.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < contratacion.getDate())) {
      años--;
    }
    
    return años;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Médicos</h1>
          <p className="text-gray-600">Gestión del personal médico</p>
        </div>
        
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 lg:mt-0">
          <Plus size={20} />
          Nuevo Médico
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
              placeholder="Buscar por nombre, especialidad o cédula..."
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
              <option value="">Todas las especialidades</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Pediatría">Pediatría</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Ginecología">Ginecología</option>
              <option value="Ortopedia">Ortopedia</option>
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
              <p className="text-sm font-medium text-gray-600">Total Médicos</p>
              <p className="text-2xl font-bold text-gray-900">{medicos.length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <User size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">
                {medicos.filter(m => m.estatus === 'Activo').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <BadgeCheck size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Especialidades</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(medicos.map(m => m.especialidad)).size}
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Stethoscope size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Antigüedad Prom.</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(medicos.reduce((acc, m) => acc + calcularAntiguedad(m.fechaContratacion), 0) / medicos.length)} años
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de médicos - Versión Desktop */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header de la tabla */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
          <div className="col-span-3">Nombre Completo</div>
          <div className="col-span-2">Especialidad</div>
          <div className="col-span-2">Cédula</div>
          <div className="col-span-3">Contacto</div>
          <div className="col-span-1">Estatus</div>
          <div className="col-span-1">Acciones</div>
        </div>

        {/* Lista de médicos */}
        <div className="divide-y divide-gray-200">
          {medicos.map((medico) => (
            <div key={medico.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              {/* Nombre Completo */}
              <div className="col-span-3">
                <h3 className="font-medium text-gray-900 text-sm">
                  {medico.nombre} {medico.apellidoPaterno} {medico.apellidoMaterno}
                </h3>
                {medico.subespecialidad && (
                  <p className="text-xs text-gray-500">
                    Subespecialidad: {medico.subespecialidad}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Antigüedad: {calcularAntiguedad(medico.fechaContratacion)} años
                </p>
              </div>

              {/* Especialidad */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEspecialidadColor(medico.especialidad)}`}>
                  {medico.especialidad}
                </span>
                {medico.subespecialidad && (
                  <p className="text-xs text-gray-500 mt-1">{medico.subespecialidad}</p>
                )}
              </div>

              {/* Cédula */}
              <div className="col-span-2">
                <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {medico.cedula}
                </span>
              </div>

              {/* Contacto */}
              <div className="col-span-3">
                <div className="flex items-center gap-2 mb-1">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-900">{medico.telefono}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-900 truncate">{medico.email}</span>
                </div>
              </div>

              {/* Estatus */}
              <div className="col-span-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstatusColor(medico.estatus)}`}>
                  {medico.estatus}
                </span>
              </div>

              {/* Acciones */}
              <div className="col-span-1">
                <div className="flex items-center justify-end space-x-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Ver perfil">
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
              Mostrando <span className="font-medium">{medicos.length}</span> médicos
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
        {medicos.map((medico) => (
          <div key={medico.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {/* Header con Nombre y Estatus */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {medico.nombre} {medico.apellidoPaterno}
                </h3>
                <p className="text-xs text-gray-500">{medico.apellidoMaterno}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstatusColor(medico.estatus)}`}>
                {medico.estatus}
              </span>
            </div>

            {/* Especialidad y Cédula */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <p className="text-gray-500 text-xs">Especialidad</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEspecialidadColor(medico.especialidad)}`}>
                  {medico.especialidad}
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Cédula</p>
                <p className="text-gray-900 font-mono font-medium">{medico.cedula}</p>
              </div>
            </div>

            {/* Subespecialidad si existe */}
            {medico.subespecialidad && (
              <div className="mb-3">
                <p className="text-gray-500 text-xs">Subespecialidad</p>
                <p className="text-sm text-gray-900">{medico.subespecialidad}</p>
              </div>
            )}

            {/* Contacto */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-gray-400" />
                <span className="text-sm text-gray-900">{medico.telefono}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400" />
                <span className="text-sm text-gray-900 truncate">{medico.email}</span>
              </div>
            </div>

            {/* Información adicional */}
            <div className="text-xs text-gray-500 mb-3">
              Antigüedad: {calcularAntiguedad(medico.fechaContratacion)} años • 
              Contratado: {new Date(medico.fechaContratacion).toLocaleDateString()}
            </div>

            {/* Acciones */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-xs text-gray-500">ID: {medico.id}</span>
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