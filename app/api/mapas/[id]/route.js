import connectionDB from "@/libs/mongodb";
import Mapa from "@/models/mapa";
import { NextResponse } from "next/server";

// Encontrar una
export async function GET(request, {params}) {
    const {id} = await params;

    await connectionDB();

    const mapa = await Mapa.findOne({_id: id});
    if(!mapa) {
        return NextResponse.json({ message: "Mapa no encontrado" }, { status: 404 });
    }
    return NextResponse.json({mapa}, {status: 200});
}

// Modificar
export async function PUT(request, {params}) {
    const {id} = await params;
    const {newImagenes: imagenes, newUsuario:usuario, newDireccion: direccion} = await request.json();

    await connectionDB();

    const mapa = await Mapa.findById(id);
    if(!mapa){
        return NextResponse.json({message: "Mapa no encontrado"}, {status: 404});
    }

    await Mapa.findByIdAndUpdate(id, {imagenes, usuario, direccion});
    return NextResponse.json({message: "Mapa actualizado"}, {status: 200});
}