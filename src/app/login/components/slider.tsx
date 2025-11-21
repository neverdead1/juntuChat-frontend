"use client";
import { useState } from "react";
import { Correo } from "./inputs/correo";
import { Password } from "./inputs/password";
import { Nombre } from "./inputs/nombre";
import { Sesion } from "./buttons/buttonSesion";
import { SesionGoogle } from "./buttons/buttonGoogle";
import { CiChat1 } from "react-icons/ci";

export function LoginSlider() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [modo, setModo] = useState<"login" | "registro">("login");

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">

      <div className="flex justify-center">
        <div className="bg-linear-to-r from-blue-400 to-purple-400 p-4 rounded-2xl">
          <CiChat1 size={28} className="text-white w-10 h-10" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center">Bienvenido</h2>

      <p className="text-center text-gray-500 text-sm">
        Inicia sesión o crea una cuenta para comenzar
      </p>

      <div className="flex items-center bg-gray-200 rounded-2xl p-1">
        <button
          onClick={() => setModo("login")}
          className={`w-1/2 text-sm font-bold rounded-xl px-3 py-2 transition-all
            ${modo === "login" ? "bg-white text-black shadow" : "text-gray-700"}
          `}
        >
          Iniciar Sesión
        </button>

        <button
          onClick={() => setModo("registro")}
          className={`w-1/2 text-sm font-bold rounded-xl px-3 py-2 transition-all
            ${modo === "registro" ? "bg-white text-black shadow" : "text-gray-700"}
          `}
        >
          Registrarse
        </button>
      </div>

      {modo === "registro" && (
        <>
          <Nombre nombre={nombre} onChange={setNombre} />

          <Correo email={email} onChange={setEmail} />

          <Password
            password={password}
            onChange={setPassword}
            nombre={"Contraseña"}
          />

          <Password
            password={confirmPassword}
            onChange={setConfirmPassword}
            nombre={"Confirmar Contraseña"}
          />
        </>
      )}

      {modo === "login" && (
        <>
          <Correo email={email} onChange={setEmail} />
          <Password
            password={password}
            onChange={setPassword}
            nombre={"Contraseña"}
          />
        </>
      )}

      <Sesion nombre={modo === "login" ? "Iniciar Sesión" : "Registrarse"} />
      <SesionGoogle />

      <div className="flex items-center gap-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-400 text-xs">O CONTINÚA CON</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <p className="text-center text-gray-400 text-xs">
        Al continuar, aceptas los términos de servicio
      </p>
    </div>
  );
}
