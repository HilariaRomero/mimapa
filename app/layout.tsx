import Navbar from "@/components/Navbar";
import {NextAuthProvider} from "@/components/Providers";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "LaWiki: tu web de wikis",
    description: "Tu web de wikis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* Envolvemos la aplicación con el SessionProvider */}
                <NextAuthProvider>
                    <div className="mx-auto">
                        <Navbar />
                    </div>
                    <div className="mt-8">
                        {children}
                    </div>
                </NextAuthProvider>
            </body>
        </html>
    );
}