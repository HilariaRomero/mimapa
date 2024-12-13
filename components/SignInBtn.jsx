"use client";
import {signIn} from "next-auth/react";
import { CiLogin } from "react-icons/ci";

export default function SignInBtn() {
    return (
        <button onClick={()=>signIn("google")} className="flex items-centre gap-4 rounded-lg pl-3">
            <CiLogin size={30} />
            <span className="bg-blue-200 text-white px-4 py-3">Iniciar sesion</span>
        </button>
    );
}