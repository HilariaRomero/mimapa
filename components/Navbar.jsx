"use client";
import { useState } from "react";
import {useSession, signIn, signOut} from "next-auth/react";
import Link from "next/link";
import { HiMenu, HiX, HiHome, HiBell, HiUser } from "react-icons/hi";
import SignInBtn from "./SignInBtn";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    // =================================================================== PRE - OAUTH
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleLogin = () => {
    //     setIsLoggedIn(true);
    // };

    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    // };
    
    // =================================================================== OAUTH
    const {data:session} = useSession(); //LA SESSION LA HACEMOS DESDE EL BACK, NO CON EL FRONT
    const router = useRouter();

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSignOut = async () => {
        await signOut({ redirect: false }); // Cierra la sesión sin redirigir automáticamente
        router.push("/"); // Redirige a la página de inicio
    };

    return (
        <header className="bg-black w-full">
            <nav className="flex justify-between items-center w-full px-8 py-4">
                {/* Título */}
                <div className="text-white text-2xl font-bold">LaWiki</div>

                {/* Botón Home siempre visible */}
                <div
                    className={`nav-links duration-500 ${menuOpen ? "top-[8%]" : "top-[-100%]"
                        } md:static absolute bg-black md:min-h-fit min-h-[30vh] left-0 md:w-auto w-full flex items-center px-5`}
                >
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-6 text-white">
                        {/* Home siempre visible */}
                        <li>
                            <Link
                                className="hover:text-gray-400 font-bold flex items-center gap-2 transition duration-200"
                                href="/"
                            >
                                <HiHome className="text-xl" /> Home
                            </Link>
                        </li>




                        {/* OAUTH 
                        antes: !isLoggedIn
                        ahora: session
                        */}
                        {/* <SignInBtn/> */}




                        {/* Solo visibles si está logueado 
                        
                        todo idem excepto la variable &&*/}
                        {session && (
                            <>
                                <li>
                                    <Link
                                        className="hover:text-gray-400 font-bold flex items-center gap-2 transition duration-200"
                                        href="/notificaciones"
                                    >
                                        <HiBell className="text-xl" /> Notificaciones
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:text-gray-400 font-bold flex items-center gap-2 transition duration-200"
                                        href="/perfil"
                                    >
                                        <HiUser className="text-xl" /> Mi Perfil
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Botón de inicio de sesión */}
                <div className="flex items-center gap-6">
                    {session ? // Si está logueado...
                    (
                        <button
                            onClick={handleSignOut} /* PRE: handleLogout    OAUTH: handleSignOut*/ 
                            className="bg-red-500 text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 transition duration-200"
                        >
                            Cerrar sesión
                        </button>
                    ) : // Si no está logueado... (alternativa: borrar <button> y poner <SignInBtn/>)
                    (
                        <button
                            onClick={() => signIn("google")} /* PRE: handleLogin    OAUTH: () => signIn("google")*/
                            className="bg-blue-500 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-600 transition duration-200"
                        >
                            Iniciar sesión
                        </button>
                    )}

                    {/* Iconos para móvil */}
                    <div
                        className={`text-white text-3xl cursor-pointer md:hidden transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-90" : "rotate-0"
                            }`}
                        onClick={handleToggleMenu}
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </div>
                </div>
            </nav>
        </header>
    );
}
