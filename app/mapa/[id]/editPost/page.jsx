// import EditWikiForm from "@/components/EditWikiForm";

// const getPostById = async (id) => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_DOMINIO}/api/publicaciones/${id}`, { cache: "no-store", })
        
//         if (!res.ok) {
//             throw new Error("Error al cargar el post");
//         }
//         return res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default async function EditWiki({ params }) {
//     const { id } = await params;
//     const {publicacion} = await getPostById(id);
//     // const { nombre, editor } = publicacion;
//     return <EditWikiForm id={id} descripcion={publicacion.descripcion} />;
// }