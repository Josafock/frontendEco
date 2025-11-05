'use client';

import { useState } from 'react';
import { X, Search, Calendar, DollarSign, Building, Users, Stethoscope } from 'lucide-react';

export default function AddServiceModal( { setOpen }: { setOpen: (open: boolean) => void }) {
  const [selectedStudy, setSelectedStudy] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [cost, setCost] = useState('');

  const studies = [
    { id: '1', name: 'Biometría Hemática Completa' },
    { id: '2', name: 'Química Sanguínea de 6 Elementos' },
    { id: '3', name: 'Perfil Lipídico' },
    { id: '4', name: 'Examen General de Orina' },
    { id: '5', name: 'Prueba de Embarazo en Orina' },
  ];

  const patients = [
    { id: '1', name: 'María González López', record: 'MG-2024-001' },
    { id: '2', name: 'Juan Pérez Hernández', record: 'JP-2024-002' },
    { id: '3', name: 'Ana Martínez Ruiz', record: 'AM-2024-003' },
    { id: '4', name: 'Carlos Sánchez Díaz', record: 'CS-2024-004' },
  ];

  const branches = [
    { id: 'matriz', name: 'Matriz - Centro' },
    { id: 'movil-1', name: 'Unidad Móvil Norte' },
    { id: 'movil-2', name: 'Unidad Móvil Sur' },
    { id: 'movil-3', name: 'Unidad Móvil Este' },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 bg-red-50">
              <Stethoscope className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Nuevo Servicio</h2>
              <p className="text-sm text-gray-500">Agregar nuevo estudio de laboratorio</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-6">
          {/* Estudio */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Estudio o Análisis
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedStudy}
                onChange={(e) => setSelectedStudy(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 appearance-none"
              >
                <option value="">Seleccionar estudio...</option>
                {studies.map((study) => (
                  <option key={study.id} value={study.id}>
                    {study.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Paciente */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Paciente
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 appearance-none"
              >
                <option value="">Seleccionar paciente...</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.record}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sucursal */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Sucursal
            </label>
            <div className="relative">
              <Building className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 appearance-none"
              >
                <option value="">Seleccionar sucursal...</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fecha de Entrega */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Fecha de Entrega
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                />
              </div>
            </div>

            {/* Costo */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Costo
              </label>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-white px-4 py-3 text-sm font-semibold border border-red-500 text-red-500 shadow-sm transition-all hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Agregar Servicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}