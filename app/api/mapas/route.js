import connectionDB from "@/libs/mongodb";
import Mapa from "@/models/mapa";
import { NextResponse } from "next/server";

// Crear
export async function POST(request){
    const {imagenes, usuario, direccion} = await request.json();

    await connectionDB();

    await Mapa.create({imagenes, usuario, direccion});
    return NextResponse.json({message: "Mapa creado"}, {status: 201})
}

// Obtener todas 
export async function GET(){
    await connectionDB();
    const mapas = await Mapa.find();
    console.log();
    return NextResponse.json({mapas});
}

// Borrar una
export async function DELETE(request){
    const id = request.nextUrl.searchParams.get('id');
    await connectionDB();

    const post = await Mapa.findById(id);

    if(!post){
        return NextResponse.json({message: "Mapa no encontrado"}, {status: 404});
    }

    await Mapa.findByIdAndDelete(id);
    return NextResponse.json({message: "Mapa borrado"}, {status: 200});
}