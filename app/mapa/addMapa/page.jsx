"use client";

import * as React from 'react';
import Image from 'next/image'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { HiArrowSmLeft } from "react-icons/hi";
import PopupModal from "@/components/PopupModal";

import {useSession} from "next-auth/react";

export default function AddMapa() {
    const {data:session} = useSession();

    const [usuario, setUsuario] = useState("");
    const [direccion, setDireccion] = useState("");

    const [imagenes, setImagenes] = useState([]);   // Array de imágenes
    const preset_name = "photonet";               // Nombre del preset de Cloudinary
    const cloud_name = "dleekobvh";                 // Nombre del Cloudinary

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Método para subir una imagen al crear una mapa
    const uploadImage = async (e) => {
        const files = e.target.files;               // Recupera los archivos seleccionados
        const data = new FormData();                // Crea un FormData para enviar la imagen
        data.append('file', files[0]);              // Agrega el archivo al FormData
        data.append('upload_preset', preset_name);  // Agrega el upload preset

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data,
            });

            const file = await response.json(); // Procesa la respuesta del servidor

            // Agrega la URL de la imagen al estado `imagenes`
            setImagenes((prevImagenes) => [...prevImagenes, { url: file.secure_url }]);

            setLoading(false);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setLoading(false);
        }
    };

    // Método para controlar el evento de darle al botón de Crear mapa
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario || !direccion || !imagenes) {
            alert("Es necesario rellenar los campos de Usuario, Direccion y Imagen");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/mapas`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    imagenes,
                    usuario,
                    direccion
                }),
            });

            if (res.ok) {
                // Muestra el popup
                setShowModal(true);
                setTimeout(() => {
                    localStorage.setItem('mapaCreada', 'true');
                    router.push(`/`); // Redirige a la página de las mapas de la wiki
                }, 2000);
            } else {
                throw new Error('Error al crear la mapa');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-8">
            {/* Botón de volver */}
            <div className="mb-4">
                <button
                    type="button"
                    className="bg-gray-600 text-white p-3 rounded-full flex items-center justify-center hover:bg-black transition duration-500"
                    onClick={() => router.push(`/`)}
                >
                    <HiArrowSmLeft className="h-5 w-5 text-white" />
                </button>
            </div>

            <h1 className="text-2xl font-bold mb-4">Creación de Mapa</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label>Usuario</label>
                <input
                    onChange={(e) => setUsuario(session.user.email)}
                    value={usuario}
                    className="border border-slate-500 px-4 py-2"
                    type="text"
                    placeholder="Manoli"
                />

                <label>Dirección para mapa (opcional)</label>
                <input
                    onChange={(e) => setDireccion(e.target.value)}
                    value={direccion}
                    className="border border-slate-500 px-4 py-2"
                    type="text"
                    placeholder="Dirección relacionada con la mapa"
                />

                <label>Imágenes</label>
                <div>
                    <input
                        type="file"
                        name="file"
                        placeholder="Upload an image"
                        onChange={(e) => uploadImage(e)}
                    />

                    {loading ? (
                        <h3>Cargando...</h3>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {imagenes.map((img, index) => (
                                <div key={index} className="relative">
                                    <Image
                                        src={img.url}
                                        alt={`imagen-${index}`}
                                        width={1000}
                                        height={1000}
                                        className="h-24 w-24 object-cover border rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-bold w-fit hover:bg-green-600 transition duration-200">
                    Crear Mapa
                </button>
            </form>

            {/* Muestra el modal solo si `showModal` es true */}
            {showModal && (
                <PopupModal
                    message="¡Mapa creada con éxito!"
                    onClose={() => setShowModal(false)} // Cierra el modal después de la notificación
                />
            )}
        </div>
    );
}
