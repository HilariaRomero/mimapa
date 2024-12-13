import connectionDB from "@/libs/mongodb";
import Usuario from "@/models/usuario";
import { NextResponse } from "next/server";

// Encontrar una
export async function GET(request, {params}) {
    const {id} = await params;

    await connectionDB();

    const usuario = await Usuario.findOne({_id: id});
    if(!usuario) {
        return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }
    return NextResponse.json({usuario}, {status: 200});
}