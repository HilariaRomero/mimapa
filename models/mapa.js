import mongoose, { Schema } from "mongoose";
import Usuario from "./usuario";


const mapaSchema = new Schema({
    // idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    imagenes: [{url:String} ],
    usuario: {type: String},
    direccion: {type: String, default: null}
    }, {versionKey: false}
);

const Mapa = mongoose.models.Mapa || mongoose.model('Mapa', mapaSchema, 'mapas');
export default Mapa;