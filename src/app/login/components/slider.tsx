"use client";
import { useState } from "react";
import { Correo } from "./inputs/correo";
import { Password } from "./inputs/password";
import { Nombre } from "./inputs/nombre";
import { Sesion } from "./buttons/buttonSesion";
import { SesionGoogle } from "./buttons/buttonGoogle";

export function LoginSlider ()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">
        
      <div className="flex justify-center">
        <div className="bg-purple-100 p-4 rounded-full">
          {/**<IconComponent className="text-purple-600 w-8 h-8" /> */}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center">Bienvenido</h2>

      <p className="text-center text-gray-500 text-sm">
        Inicia sesión o crea una cuenta para comenzar
      </p>
        <Correo email={email} onChange={setEmail}></Correo>
        <Password password={password} onChange={setPassword}></Password>
        <Nombre nombre={nombre} onChange={setNombre}></Nombre>
        <Sesion nombre={"Iniciar Sesion"}></Sesion>
        <SesionGoogle></SesionGoogle>

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
};
