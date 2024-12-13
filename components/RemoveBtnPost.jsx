"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";
import PopupModal from "@/components/PopupModal";

export default function RemoveBtnPost({ id }) {
    const [showModal, setShowModal] = useState(false);

    const removePost = async () => {
        const confirmed = confirm("¿Estás seguro de que quieres eliminar esta post?");
        if (confirmed) {
            await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/publicaciones?id=${id}`, {
                method: "DELETE",
            });
            // Activa el popup
            setShowModal(true);
            setTimeout(() => {
                localStorage.setItem('postBorrada', 'true');
            }, 2000);
        }
    };

    return (
        <button onClick={removePost} className="text-red-500">
            <HiOutlineTrash size={30} />

            {/* Muestra el modal solo si `showModal` es true */}
            {showModal && (
                <PopupModal
                    message="Publicacion eliminado con éxito!"
                    onClose={() => setShowModal(false)} // Cierra el modal después de la notificación
                />
            )}
        </button>
    );
}
