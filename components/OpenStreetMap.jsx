"use client";

import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const OpenStreetMap = ({ address }) => {
    const mapContainerRef = useRef(null);   // Referencia al contenedor del mapa
    const mapRef = useRef(null);            // Referencia al mapa
    
    const [errorMessage, setErrorMessage] = useState(null); // Estado para el mensaje de error

    const ZOOM_LEVEL = 9;           // Zoom por defecto
    const FOCUSED_ZOOM_LEVEL = 15;  // Zoom al hacer clic en el marcador

    // Función para obtener las coordenadas a partir de la dirección
    const fetchCoordinates = async (address) => {
        if (!address) return null; // Si la dirección es null o vacía, retornamos null

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`
            );

            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { lat: parseFloat(lat), lng: parseFloat(lon) };
            } else {
                return null; // Si no se encuentran coordenadas, retornamos null
            }
        } catch (error) {
            console.error("Error al obtener las coordenadas:", error);
            return null;
        }
    };

    // Crea el icono personalizado del marcador
    const customIcon = new L.Icon({
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png", // URL del icono
        iconSize: [25, 41], // Tamaño del icono
        iconAnchor: [12, 41], // Anclaje del icono
        popupAnchor: [1, -34], // Ajuste de la posición del popup
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png", // Sombra del marcador
        shadowSize: [41, 41], // Tamaño de la sombra
    });

    // Inicialización del mapa solo si las coordenadas son válidas
    useEffect(() => {
        const initializeMap = async () => {
            setErrorMessage(null);  // Limpiamos el mensaje de error al intentar buscar una nueva dirección

            if (!address || !mapContainerRef.current) {
                setErrorMessage("Por favor, ingresa una dirección válida.");
                return;
            }

            const coordinates = await fetchCoordinates(address);
            if (!coordinates) {
                setErrorMessage("No se encontró la dirección proporcionada.");
                return;
            }

            const { lat, lng } = coordinates;

            // Inicializamos el mapa si no está inicializado
            if (!mapRef.current) {
                // Inicializamos el mapa
                mapRef.current = L.map(mapContainerRef.current).setView(
                    [lat, lng],
                    ZOOM_LEVEL
                );

                // Añadimos la capa de OpenStreetMap
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(mapRef.current);
            }

            // Quitamos los marcadores previos
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.remove(); // Eliminar el marcador previo
                }
            });

            // Creamos el marcador con el popup
            const marker = L.marker([lat, lng], { icon: customIcon })
                .addTo(mapRef.current)
                .bindPopup(`<strong>Dirección:</strong> ${address}`);

            // Evento para centrar y ampliar el mapa al hacer clic en el marcador
            marker.on("click", () => {
                mapRef.current.setView([lat, lng], FOCUSED_ZOOM_LEVEL);
                marker.openPopup(); // Abre el popup automáticamente
            });

            // Inicialmente centramos el mapa con un marcador visible
            mapRef.current.setView([lat, lng], ZOOM_LEVEL);
        };

        initializeMap();
    }, [address]); // Solo se ejecuta cuando la dirección cambia

    return (
        <div>
            {errorMessage ? (
                <div className="text-red-600 text-center">
                    {errorMessage}
                </div>
            ) : null}
            <div
                ref={mapContainerRef}
                style={{ height: "500px", width: "100%", display: errorMessage ? "none" : "block" }}
            />
        </div>
    );
};

export default OpenStreetMap;