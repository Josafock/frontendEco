"use client";

import { validateTokenAction } from "@/actions/auth/validateTokenAction";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useActionState, useEffect, useState, Dispatch, SetStateAction, startTransition } from "react";
import { toast } from "react-toastify";
import { ShieldCheck, Repeat } from "lucide-react";
import Link from "next/link";

type ValidateTokenProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenForm({ setIsValidToken, token, setToken }: ValidateTokenProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const validateTokenInput = validateTokenAction.bind(null, token);
  const [state, dispatch] = useActionState(validateTokenInput, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      startTransition(() => dispatch());
    }
  }, [isComplete, dispatch]);

  useEffect(() => {
    if (state?.errors?.length) {
      state.errors.forEach((error: string) => {
        toast.error(error);
        console.error(error);
      });
    }
    if (state?.success) {
      toast.success(state.success);
      setIsValidToken(true);
    }
  }, [state, setIsValidToken]);

  // cooldown para "Reenviar código"
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleChange = (value: string) => {
    setIsComplete(false);
    setToken(value);
  };

  const handleComplete = () => setIsComplete(true);

  const handleResend = () => {
    if (cooldown > 0) return;
    // Aquí podrías invocar tu action para reenviar el código.
    toast.info("Si tu cuenta existe, te reenviamos un nuevo código.");
    setCooldown(30);
  };

  const triangles = Array.from({ length: 120 });

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden bg-gray-50">
      {/* Fondo con triángulos sutiles */}
      <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(110deg, #f9fafb 48%, #ffffff 48%)" }} />

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden opacity-40 lg:block">
        <div className="grid h-full w-full grid-cols-8 gap-3">
          {triangles.map((_, i) => (
            <div key={`l-${i}`} className="mx-auto h-5 w-5 bg-red-50 clip-triangle" />
          ))}
        </div>
      </div>

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
      <div className="relative z-10 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-black/5">
            {/* Encabezado */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-8 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-600">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Verificación de seguridad</h1>
                <p className="text-xs text-gray-500">Introduce el código de 6 dígitos que enviamos a tu correo</p>
              </div>
            </div>

            {/* Formulario */}
            <div className="grid gap-6 px-6 py-6 sm:grid-cols-5 sm:px-8 sm:py-8">
              <div className="sm:col-span-3 space-y-5">
                <div className="flex justify-center">
                  <PinInput value={token} onChange={handleChange} onComplete={handleComplete} otp>
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <PinInputField
                        key={idx}
                        className="mx-1 h-12 w-12 rounded-lg border border-gray-300 bg-white text-center text-xl text-gray-900 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-red-500"
                      />
                    ))}
                  </PinInput>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={cooldown > 0}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Repeat className="h-4 w-4" />
                    {cooldown > 0 ? `Reenviar en ${cooldown}s` : 'Reenviar código'}
                  </button>
                </div>
              </div>

              {/* Panel de ayuda */}
              <div className="sm:col-span-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-800">Consejos rápidos</p>
                <ul className="list-disc space-y-2 pl-5 text-xs text-gray-600">
                  <li>Revisa tu carpeta de <span className="font-medium text-gray-800">Spam</span> o <span className="font-medium text-gray-800">Promociones</span>.</li>
                  <li>Evita pegar con espacios ocultos; escribe los 6 dígitos manualmente.</li>
                  <li>El código expira por seguridad. Si caduca, solicita uno nuevo.</li>
                </ul>
                <p className="mt-3 text-xs text-gray-600">
                  ¿No tienes acceso al correo? Vuelve a <Link href="/auth/register" className="text-red-600 underline underline-offset-2 hover:text-red-700">registro</Link> y usa otra dirección.
                </p>
              </div>
            </div>

            {/* Pie */}
            <div className="border-t border-gray-100 px-8 py-5 text-center text-xs text-gray-600">
              Al continuar aceptas nuestros <Link href="/terms" className="text-red-600 hover:underline">Términos</Link> y <Link href="/privacy" className="text-red-600 hover:underline">Política de privacidad</Link>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
