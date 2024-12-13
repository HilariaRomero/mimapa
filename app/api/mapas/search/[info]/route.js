import connectionDB from "@/libs/mongodb";
import Mapa from "@/models/mapa";
import { NextResponse } from "next/server";

// Buscar
export async function GET(request, {params}) {
    const info = await params; // Asumimos que pasamos la letra en los parámetros de la URL
    await connectionDB();
    
    var {email} = JSON.parse(info.info);
    const regexMapa = new RegExp(email, 'i'); // Create a case-insensitive regular expression
    const mapas = await Mapa.find( {usuario: regexMapa });
    console.log(mapas);

    if (mapas.length === 0) {
        return NextResponse.json({ message: "No se encontraron mapas con esa descipcion" }, { status: 404 });
    }
    return NextResponse.json({ mapas }, { status: 200 });
}