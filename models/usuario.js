import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
    {
        email: { type: String },
        nombre: { type: String }
    },
    { versionKey: false }
);

const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);
export default Usuario;
