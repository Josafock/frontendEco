import ToastNotification from "@/components/ui/ToastNotification";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ECONOLAB - Auth"
};

export default function authLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <ToastNotification />
        </>
    );
}