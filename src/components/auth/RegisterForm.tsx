'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeOff, User, Mail, UserRoundPlus } from 'lucide-react';
import { register } from '@/actions/auth/registerAction';
import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [state, dispatch, pending] = useActionState(register, {
    errors: [],
    success: '',
  });

  useEffect(() => {
    if (state?.errors?.length) {
      state.errors.forEach((error: string) => toast.error(error));
    }
    if (state?.success) {
      toast.success(state.success, {
        onClose: () => router.push('/auth/confirm-account'),
      });
      setFormData({ nombre: '', email: '', password: '', password2: '' });
    }
  }, [state, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (formData_: FormData) => {
    formData_.set('nombre', formData.nombre);
    formData_.set('email', formData.email);
    formData_.set('password', formData.password);
    formData_.set('password2', formData.password2);
    return await dispatch(formData_);
  };

  const triangles = Array.from({ length: 120 });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Fondo claro con triángulos sutiles y acentos rojos */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(110deg, #f9fafb 48%, #ffffff 48%)' }}
      />

      {/* Campo de triángulos izquierdo */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden opacity-40 lg:block">
        <div className="grid h-full w-full grid-cols-8 gap-3">
          {triangles.map((_, i) => (
            <div key={`l-${i}`} className="mx-auto h-5 w-5 bg-red-50 clip-triangle" />
          ))}
        </div>
      </div>

      {/* Campo de triángulos derecho */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden opacity-40 lg:block">
        <div className="grid h-full w-full grid-cols-8 gap-3">
          {triangles.map((_, i) => (
            <div key={`r-${i}`} className="mx-auto h-5 w-5 bg-gray-100 clip-triangle" />
          ))}
        </div>
      </div>

      <style jsx>{`
        .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
      `}</style>

      {/* Contenido */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="mx-auto w-full max-w-xl">
          {/* Tarjeta */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-black/5">
            {/* Encabezado de marca */}
            <div className="flex items-center justify-center gap-3 border-b border-gray-100 px-8 py-6">
              <div className="text-center">
                <h1 className="text-4xl text-black font-bold"><span className="text-primary font-bold">ECONO</span>LAB</h1>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-600">
                    <UserRoundPlus className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-lg font-semibold text-gray-900">Crear Cuenta</h1>
                    <p className="text-xs text-gray-500">Registrate para acceder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form action={handleSubmit} noValidate className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="space-y-5">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      placeholder="Juan Pérez"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="usuario@correo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-11 text-sm text-gray-900 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirmar contraseña */}
                <div>
                  <label htmlFor="password2" className="mb-1 block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password2"
                      name="password2"
                      type={showPassword2 ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password2}
                      onChange={handleChange}
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-11 text-sm text-gray-900 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2((v) => !v)}
                      aria-label={showPassword2 ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword2 ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {pending ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>

                {/* Link Login */}
                <p className="text-center text-sm text-gray-600">
                  ¿Ya tienes una cuenta?{' '}
                  <Link href="/auth/login" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Nota inferior */}
          <div className="mt-6 text-center text-xs text-gray-600">
            <span>Registro seguro • Protección de datos • Acceso inmediato • Soporte 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
