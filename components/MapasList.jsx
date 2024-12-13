"use client";

import Link from "next/link";
import Image from 'next/image'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {useSession, signIn, signOut} from "next-auth/react";

import * as React from "react";

import { HiPencilAlt, HiArrowSmLeft, HiHeart } from "react-icons/hi";
import RemoveBtnmapa from "@/components/RemoveBtnPost";
// import MeGusta from "@/components/MeGusta";
// import OpenStreetMap from "@/components/OpenStreetMap";

//Si te da el error de la windows:
import dynamic from 'next/dynamic';
const OpenStreetMap = dynamic(() => import('@/components/OpenStreetMap'), {
    ssr: false, // Deshabilita el renderizado en el servidor
  });

  
export default function PostsList() {
// const PostsList = () => {
const {data:session} = useSession();

const [mapas, setmapas] = useState([]);                       // Estado para las mapas
const [filteredmapas, setFilteredmapas] = useState([]);       // Estado para las mapas filtradas

const [cargando, setCargando] = useState(true);                     // Estado para mostrar mensaje de cargando para las mapas
const [key, setKey] = useState(0);

// Estados para filtros de búsqueda
const [filtroEmail, setFiltroEmail] = useState("");   // Estado para el filtro de la palabra clave
    
const router = useRouter();

useEffect(() => {
    const getmapas = async () => {
        try {
            setCargando(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/mapas`, { cache: "no-store" });
            if (!res.ok) {
                throw new Error("Error al obtener las mapas");
            }
            const data = await res.json();
            setmapas(data?.mapas || []);              // Guarda las mapas. Si es vacío tenemos un array vacío
            setFilteredmapas(data?.mapas || []);      // Al entrar en la página y no haber ningún filtro, las mapas filtradas son las mismas
        } catch (error) {
            console.error("Error al cargar las mapas: ", error);
        }
        setCargando(false);
    };
    getmapas();
},[key]);

// Fuerza la recarga del componente (lo usamos al borrar una mapa)
const handleForceReload = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(3000);
    setKey((prevKey) => prevKey + 1);
};

// Controla los filtros de la búsqueda, haciendo uso de la API de búsqueda
const handleSearch = async (e) => {
    e.preventDefault();

    try {
        var email= filtroEmail.trim();

        const info = JSON.stringify({email});
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/mapas/search/${info}`, { cache: "no-store" });
        if (!res.ok) {
            if (res.status === 404) {
                setFilteredmapas([]);
            } else {
                throw new Error("Error al buscar mapas");
            }
        } else {
            const data = await res.json();
            setFilteredmapas(data.mapas || []);
        }
    } catch (error) {
        console.error("Error al realizar la búsqueda: ", error);
    }
};


return (
    <div className="px-8">
        {/* Sesion */}
        {session && <h1>Bienvenido, {session.user.nombre}</h1>}

        {/* mapas */}
        <div className="my-4">
            <h1 className="text-4xl font-bold text-gray-800">Mapas</h1>
        </div>

        {/* Botón para añadir mapas */}
        {session && <div className="my-4 flex justify-start gap-x-2">
            <Link href={`/mapa/addMapa`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold w-fit hover:bg-blue-600 transition duration-200">
                    Añadir nueva mapa
                </button>
            </Link>
        </div>}

        {/* Búsqueda de mapas */}
        <div className="my-4">
            <h1 className="text-2xl font-bold text-gray-800">Búsqueda de mapas</h1>
        </div>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="my-4 grid grid-cols-1 gap-4">
            {/* Búsqueda por palabra clave */}
            <input
                type="text"
                value={filtroEmail}
                onChange={(e) => setFiltroEmail(e.target.value)}
                placeholder="Buscar por email del usuario"
                className="border border-gray-400 p-2 rounded-md w-full"
            />

            {/* Botón de búsqueda */}
            <div className="flex justify-start">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-600 transition duration-200"
                >
                    Buscar
                </button>
            </div>
        </form>


        {/* Cargando mapas */}
        {cargando ? (
            <div className="my-4">
                <p>Cargando...</p>
            </div>
        ) : (
            // Listado de mapas
            filteredmapas.length === 0 ? (
                <div className="my-4">
                    <p>No se encontraron mapas para esta wiki.</p>
                </div>
            ) : (
                // filteredmapas.sort((a,b)=> b.likes-a.likes).map((mapa) => (
                filteredmapas.map((mapa) => (
                    <div key={mapa._id} className="relative p-4 border border-slate-300 my-3 flex flex-col sm:flex-row justify-between gap-5 items-start hover:bg-gray-200 transition duration-300">
                        {/* Botones de la mapa */}
                        <div className="absolute top-4 right-4 flex gap-2">

                            {/* Botón de borrar */}
                            {/* {session && session.user.name == mapa.usuario &&
                            <div onClick={handleForceReload}>
                                <RemoveBtnmapa id={mapa._id} />
                            </div>
                            } */}
                            {/* Botón de editar */}
                            {/* {session && session.user.name == mapa.usuario &&
                            <Link href={`/mapa/${mapa._id}/editPost`}>
                                <HiPencilAlt size={30} />
                            </Link>
                            } */}
                        </div>

                            
                            
                        {/* MAPAS */}
                        {mapa.direccion && (
                            <div>
                                <h3 className="text-lg font-semibold">Ubicación:</h3>
                                <OpenStreetMap address={mapa.direccion}/>
                            </div>
                        )}

                        <div className="flex-1">
                            {/* <Link href={`/mapa/${mapa._id}`}> */}
                                <h2 className="font-bold text-2xl">{mapa.usuario}</h2>
                            {/* </Link> */}

                            {/* Direcciones */}
                            <div className="flex items-center gap-2">
                                <span className="italic">{mapa.direccion}</span>
                            </div>
                            
                            
                        </div>
                        {/* IMAGENES */}
                        {mapa.imagenes.length != 0 && <div className="flex flex-col items-center">
                            {mapa.imagenes.map((imagen) => (
                                <div key={imagen._id} className="my-1">
                                    <Image
                                        className="h-auto" /* max-w-full */
                                        src={imagen.url}
                                        width={300}
                                        height={300}
                                        alt="Imagen relacionada con la entrada"
                                        />
                                </div>
                            ))}
                        </div>}

                    </div>
                ))
            )
        )}
    </div>
);
}