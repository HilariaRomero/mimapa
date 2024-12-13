"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowSmLeft } from "react-icons/hi";
import PopupModal from "@/components/PopupModal";

export default function EditPostForm({ id, descripcion}) {
    const [newDescripcion, setNewDescripcion] = useState("");
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const updatePost = async (e) => {
        e.preventDefault();
        if (!newDescripcion ) {//|| !newEditor
            alert("Es necesario rellenar los campos de Descripcion");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/publicaciones/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ newDescripcion }),//, newEditor}),
            });
            if (res.ok) {
                // Activa el popup
                setShowModal(true);
                setTimeout(() => {
                    // localStorage.setItem('wikiBorrada', 'true');
                    router.push('/');
                }, 2000);
            } else {
                throw new Error('Error al actualizar la post');
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

            <h1 className="text-2xl font-bold mb-4">Edición de Post</h1>

            <form onSubmit={updatePost} className="flex flex-col gap-3">
                <label>Descripcion</label>
                <input
                    onChange={(e) => setNewDescripcion(e.target.value)}
                    value={newDescripcion}
                    className="border border-slate-500 px-4 py-2"
                    type="text"
                    placeholder={descripcion}
                />

{/*             <label>Editor</label>
                <input
                    onChange={(e) => setNewEditor(e.target.value)}
                    value={newEditor}
                    className="border border-slate-500 px-4 py-2"
                    type="text"
                    placeholder={editor}
                /> */}
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-bold w-fit hover:bg-green-600 transition duration-200">
                    Actualizar post
                </button>
            </form>

            {/* Muestra el modal solo si `showModal` es true */}
            {showModal && (
                <PopupModal
                    message="¡Post editada con éxito!"
                    onClose={() => setShowModal(false)} // Cierra el modal después de la notificación
                />
            )}
        </div>
    );
}