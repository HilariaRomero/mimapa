"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import * as React from "react";

import { HiPencilAlt, HiArrowSmLeft, HiHeart } from "react-icons/hi";
import RemoveBtnpost from "@/components/RemoveBtnPost";
import PopupModal from "@/components/PopupModal";

export default function MeGusta ({id, likesAnt}) {
    // const [likes, setLikes] = useState(0); 
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    

    const handleForceReload= async () => {
        //LIKES++
        try {
            // var newLikes =likesAnt+1;
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/publicaciones/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ newLikes: likesAnt+1}),//, newEditor}),
            });
            if (res.ok) {
                // Activa el popup
                setShowModal(true);
                setTimeout(() => {
                    // localStorage.setItem('wikiBorrada', 'true'); 
                    // router.refresh(); //no va creo que porque tengo next version <13
                    window.location.reload();
                }, 1000);
            } else {
                throw new Error('Error al dar like a la post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '5px' }}>
            <button
                onClick={handleForceReload}
                className="text-red-400">
                <HiHeart size={25}  />
            </button>

            {/* Muestra el modal si showModal es true */}
            {showModal && (
                <PopupModal
                    message="¡Te gusta!"
                    onClose={() => setShowModal(false)} // Cierra el modal si es necesario
                />
            )}
        </div>
    );
};