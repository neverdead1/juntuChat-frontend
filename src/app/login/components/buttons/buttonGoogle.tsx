"use client";

import { FcGoogle } from "react-icons/fc";


import { auth, provider } from "@/app/login/utils/firebase";
import { signInWithPopup } from "firebase/auth";

interface Props {
  onLogin?: (user: { nombre: string; correo: string }) => void;
}

export function SesionGoogle({ onLogin }: Props) {

  function call_login_google() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Usuario:", user);
  
            // opcional enviar a tu backend NestJS
            // fetch("http://localhost:8000/usuario", { ... })
            if (onLogin) {
              onLogin({
                nombre: user.displayName || "Usuario Google",
                correo: user.email || "",
              });
            }
          })
          .catch((error) => {
            console.error("Error Google Login:", error);
          });
      }
  

  return (
    <div className="flex flex-col gap-1 w-full justify-center items-center">
      <button
        onClick={call_login_google}
        className="flex items-center gap-2 bg-white text-gray-800 border border-gray-300
                   rounded-lg px-4 py-2 shadow-sm hover:shadow-md
                   transition-all font-bold w-full justify-center"
      >
        <FcGoogle size={20} color="black" />
        Google
      </button>
    </div>
  );
}
