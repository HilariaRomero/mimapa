import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import connectionDB from "@/libs/mongodb";
import Usuario from "@/models/usuario";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    // Configura el uso de JWT para la sesión
    session: {
        strategy: "jwt", // Utiliza JWT para la sesión
    },

    callbacks: {
        // Callback para iniciar sesión
        async signIn({ user }) {
            await connectionDB();
            const usuario = await Usuario.findOne({ email: user.email });
            
            if (!usuario) {
                const nuevoUsuario = new Usuario({ email: user.email, nombre: user.name });
                await nuevoUsuario.save();

                // Redirige al nuevo usuario a la página para completar el perfil (rol, preferenciaNotificaciones)
                //return "/perfil/configuracion";   
            }

            return true;
        },

        // Callback para incluir datos en el token JWT
        async jwt({ token, user }) {
            if (user) {
                await connectionDB();
                const usuario = await Usuario.findOne({ email: user.email });

                // Añade la información del usuario al token
                token.email = usuario.email;
                token.nombre = usuario.nombre;
            }
            return token;
        },

        // Callback para personalizar el objeto de sesión (pasa la información del token a la sesión)
        async session({ session, token }) {
            if(token) {
                session.user.email = token.email;
                session.user.nombre = token.nombre;
            }

            return session;
        },
    },

    // pages: {
    //     newUser: "/perfil/configuracion"
    // },

    secret: process.env.NEXTAUTH_SECRET
};

// Exportar los métodos GET y POST para Next.js
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };