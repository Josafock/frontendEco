'use client';

import { Camera, Save, Lock, Mail, User, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  
  // Datos del usuario
  const [userData, setUserData] = useState({
    nombre: 'Dr. Alejandro Rodríguez',
    email: 'alejandro.rodriguez@clinica.com',
    telefono: '+52 55 1234 5678',
    especialidad: 'Medicina General',
    cedula: '1234567',
    direccion: 'Av. Reforma 123, CDMX',
    fechaNacimiento: '1985-03-15',
    fechaIngreso: '2020-01-10'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar los datos
    setIsEditing(false);
    console.log('Datos guardados:', userData);
  };

  const handlePasswordChange = () => {
    // Aquí iría la lógica para cambiar la contraseña
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    console.log('Contraseña cambiada');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Navegación */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'general'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User size={18} />
                Información General
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'security'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Lock size={18} />
                Seguridad
              </button>
            </nav>

            {/* Información rápida */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Información de Cuenta</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <p>Miembro desde: Ene 2020</p>
                <p>Rol: Administrador</p>
                <p>Último acceso: Hoy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-3">
          {/* Pestaña de Información General */}
          {activeTab === 'general' && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Header de la sección */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Información Personal</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      Editar Perfil
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Save size={16} />
                        Guardar Cambios
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {/* Foto de Perfil */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                      <User size={48} className="text-red-600" />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors">
                        <Camera size={16} />
                      </button>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{userData.nombre}</h3>
                  <p className="text-gray-600">{userData.especialidad}</p>
                </div>

                {/* Formulario de Información */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Columna Izquierda */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          Nombre Completo
                        </div>
                      </label>
                      <input
                        type="text"
                        value={userData.nombre}
                        onChange={(e) => setUserData({...userData, nombre: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail size={16} />
                          Correo Electrónico
                        </div>
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          Teléfono
                        </div>
                      </label>
                      <input
                        type="tel"
                        value={userData.telefono}
                        onChange={(e) => setUserData({...userData, telefono: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Columna Derecha */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Especialidad
                      </label>
                      <input
                        type="text"
                        value={userData.especialidad}
                        onChange={(e) => setUserData({...userData, especialidad: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cédula Profesional
                      </label>
                      <input
                        type="text"
                        value={userData.cedula}
                        onChange={(e) => setUserData({...userData, cedula: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          Dirección
                        </div>
                      </label>
                      <textarea
                        value={userData.direccion}
                        onChange={(e) => setUserData({...userData, direccion: e.target.value})}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pestaña de Seguridad */}
          {activeTab === 'security' && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Header de la sección */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Seguridad de la Cuenta</h2>
                <p className="text-sm text-gray-600 mt-1">Actualiza tu contraseña para mantener tu cuenta segura</p>
              </div>

              <div className="p-6">
                <div className="max-w-md space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Ingresa tu nueva contraseña"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <Lock size={18} />
                    Actualizar Contraseña
                  </button>
                </div>

                {/* Consejos de seguridad */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Consejos de Seguridad</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Usa una contraseña única que no hayas usado en otros servicios</li>
                    <li>• Cambia tu contraseña regularmente</li>
                    <li>• No compartas tu contraseña con nadie</li>
                    <li>• Cierra sesión cuando uses dispositivos compartidos</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}