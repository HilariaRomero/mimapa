import Mapa from "./mapa";

// Esquema que define las visitas
const visitaSchema = new Schema(
    {
        idMapa: {type: mongoose.Schema.Types.ObjectId, ref: "Mapa"},
        usuarioVisitante: String,
        usuarioMapa: String,
        fecha: { type: Date, default: Date.now },
        token: String
    }, {versionKey: false}
);

const Visita = mongoose.models.Visita || mongoose.model("Visita", visitaSchema);
export default Visita;