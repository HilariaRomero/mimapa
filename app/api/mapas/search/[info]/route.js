import connectionDB from "@/libs/mongodb";
import Mapa from "@/models/mapa";
import { NextResponse } from "next/server";

// Buscar
export async function GET(request, {params}) {
    const info = await params; // Asumimos que pasamos la letra en los parámetros de la URL
    await connectionDB();
    
    var {usuario} = JSON.parse(info.info);
    
    // const regexCiudad = new RegExp(ciudad, 'i'); // Create a case-insensitive regular expression
    const posts = await Mapa.find( {usuario: usuario });


    if (posts.length === 0) {
        return NextResponse.json({ message: "No se encontraron mapas con esa descipcion" }, { status: 404 });
    }
    return NextResponse.json({ posts }, { status: 200 });
}