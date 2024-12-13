"use client";

import { useState, useEffect } from "react";

export default function PopupModal({ message, duration = 2000, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Muestra el modal con la animación
        const timer = setTimeout(() => {
            setIsVisible(false); // Oculta el modal después de la duración
            if (onClose) onClose(); // Llama a la función de cierre si se proporciona
        }, duration);

        return () => clearTimeout(timer); // Limpia el temporizador
    }, [duration, onClose]);

    return (
        <div
            className={`fixed left-1/2 transform -translate-x-1/2 top-0 transition-all duration-500 ease-in-out ${
                isVisible ? "translate-y-20 opacity-100" : "-translate-y-full opacity-0"} z-50`}
        >
            <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
                <p className="text-center text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
}
