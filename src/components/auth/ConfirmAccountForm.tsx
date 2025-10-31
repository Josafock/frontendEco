'use client';

import { useState, useEffect, useActionState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { confirmAccount } from '@/actions/auth/confirmAccountAction';
import { MailCheck, ShieldCheck, Repeat } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ConfirmAccountForm() {
    const [token, setToken] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [cooldown, setCooldown] = useState(0); // para "Reenviar código"
    const router = useRouter();

    const ConfirmAccountWithToken = confirmAccount.bind(null, token);
    const [state, dispatch] = useActionState(ConfirmAccountWithToken, {
        errors: [],
        success: '',
    });

    // Auto-dispara el action al completar el PIN
    useEffect(() => {
        if (isCompleted) {
            startTransition(() => dispatch());
        }
    }, [isCompleted, dispatch]);

    // Toasters de resultado
    useEffect(() => {
        if (state?.errors?.length) state.errors.forEach((e: string) => toast.error(e));
        if (state?.success) {
            toast.success(state.success, { onClose: () => router.push('/auth/login') });
        }
    }, [state, router]);

    // Cooldown para "Reenviar código"
    useEffect(() => {
        if (cooldown <= 0) return;
        const id = setInterval(() => setCooldown((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [cooldown]);

    const handleChange = (val: string) => {
        setIsCompleted(false);
        setToken(val);
    };

    const handleResend = () => {
        if (cooldown > 0) return;
        // Aquí podrías llamar a un action server-side para reenviar el correo.
        toast.info('Si tu cuenta existe, te hemos reenviado un código.');
        setCooldown(30); // 30s de espera
    };

    const triangles = Array.from({ length: 120 });

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gray-50">
            {/* Fondo claro con triángulos sutiles */}
            <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(110deg, #f9fafb 48%, #ffffff 48%)' }} />

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
                <div className="mx-auto w-full max-w-5xl">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Panel informativo */}
                        <div className="order-2 sm:order-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-black/5">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-600">
                                    <MailCheck className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-900">Confirma tu cuenta</h1>
                                    <p className="text-xs text-gray-500">Ingresa el código de 6 dígitos enviado a tu correo</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <PinInput
                                        value={token}
                                        onChange={handleChange}
                                        onComplete={() => setIsCompleted(true)}
                                        otp
                                    >
                                        <PinInputField className="w-12 h-12 text-center text-xl rounded-md bg-gray-100 border border-gray-300 placeholder-white" />
                                        <PinInputField className="w-12 h-12 text-center text-xl rounded-md bg-gray-100 border border-gray-300 placeholder-white" />
                                        <PinInputField className="w-12 h-12 text-center text-xl rounded-md bg-gray-100 border border-gray-300 placeholder-white" />
                                        <PinInputField className="w-12 h-12 text-center text-xl rounded-md bg-gray-100 border border-gray-300 placeholder-white" />
                                        <PinInputField className="w-12 h-12 text-center text-xl rounded-md bg-gray-100 border border-gray-300 placeholder-white" />
                                        <PinInputField className="w-12 h-12 text-center text-xl rounded-md bg-gray-100 border border-gray-300 placeholder-white" />
                                    </PinInput>
                                </div>

                                <button
                                    onClick={handleResend}
                                    disabled={cooldown > 0}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    type="button"
                                >
                                    <Repeat className="h-4 w-4" />
                                    {cooldown > 0 ? `Reenviar en ${cooldown}s` : 'Reenviar código'}
                                </button>

                                <p className="text-center text-xs text-gray-500">
                                    ¿Es el correo correcto? Si no tienes acceso, vuelve al{' '}
                                    <Link href="/auth/register" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">registro</Link> y usa un email distinto.
                                </p>
                            </div>
                        </div>

                        {/* Lateral de ayuda */}
                        <div className="order-1 sm:order-2 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-2 text-gray-800">
                                <ShieldCheck className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-semibold">Consejos rápidos</span>
                            </div>
                            <ul className="list-disc space-y-2 pl-5 text-xs text-gray-600">
                                <li>Revisa <span className="font-medium text-gray-800">Spam</span> o <span className="font-medium text-gray-800">Promociones</span> si no ves el correo.</li>
                                <li>El código expira por seguridad. Si caduca, solicita uno nuevo.</li>
                                <li>Evita copiar/pegar con espacios. Escribe los 6 dígitos manualmente.</li>
                                <li>Por tu seguridad nunca compartas este código con terceros.</li>
                            </ul>
                            <div className="mt-4 text-xs text-gray-600">
                                <p>
                                    ¿Necesitas ayuda? Escríbenos a{' '}
                                    <a href="mailto:soporte@tu-dominio.com" className="text-red-600 underline underline-offset-2 hover:text-red-700">soporte@tu-dominio.com</a>.
                                </p>
                            </div>

                            {/* Marca (opcional) */}
                            <div className="mt-6 flex flex-col items-center gap-3 text-center">
                                <Image src="/LOGOSINCUENTAB.png" alt="Logo" width={56} height={56} className="h-14 w-14 rounded-md object-contain" />
                                <p className="text-xs text-gray-500">ECONOLAB</p>
                            </div>
                        </div>
                    </div>

                    {/* Pie legal */}
                    <div className="mt-6 text-center text-xs text-gray-600">
                        Al continuar aceptas nuestros <Link href="/terms" className="text-red-600 hover:underline">Términos</Link> y <Link href="/privacy" className="text-red-600 hover:underline">Política de privacidad</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}
