"use client";
import { useState } from "react";
import { Correo } from "./inputs/correo";
import { Password } from "./inputs/password";
import { Nombre } from "./inputs/nombre";
import { Sesion } from "./buttons/buttonSesion";
import { SesionGoogle } from "./buttons/buttonGoogle";
import { CiChat1 } from "react-icons/ci";
import { useAuth } from "../hooks/useAuth";


export function LoginSlider() {
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { usuario, error, loading, registrar, login, loginGoogle } = useAuth();

  const handleSubmit = async () => {
    if (modo === "registro") {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      await registrar(nombre, email, password);
    } else {
      await login(email, password);
    }
  };

  const handleGoogleLogin = async (user: { nombre: string; correo: string }) => {
    await loginGoogle(user.nombre, user.correo);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6">

      <div className="flex justify-center">
        <div className="bg-linear-to-r from-blue-400 to-purple-400 p-4 rounded-2xl">
          <CiChat1 size={28} className="text-white w-10 h-10" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center">Bienvenido</h2>
      <p className="text-center text-gray-500 text-sm">Inicia sesión o crea una cuenta para comenzar</p>

      <div className="flex items-center bg-gray-200 rounded-2xl p-1">
        <button onClick={() => setModo("login")} className={`w-1/2 text-sm font-bold rounded-xl px-3 py-2 transition-all
            ${modo === "login" ? "bg-white text-black shadow" : "text-gray-700"}`}>
          Iniciar Sesión
        </button>
        <button onClick={() => setModo("registro")} className={`w-1/2 text-sm font-bold rounded-xl px-3 py-2 transition-all
            ${modo === "registro" ? "bg-white text-black shadow" : "text-gray-700"}`}>
          Registrarse
        </button>
      </div>

      {modo === "registro" && (
        <>
          <Nombre nombre={nombre} onChange={setNombre} />
          <Correo email={email} onChange={setEmail} />
          <Password password={password} onChange={setPassword} nombre="Contraseña" />
          <Password password={confirmPassword} onChange={setConfirmPassword} nombre="Confirmar Contraseña" />
        </>
      )}

      {modo === "login" && (
        <>
          <Correo email={email} onChange={setEmail} />
          <Password password={password} onChange={setPassword} nombre="Contraseña" />
        </>
      )}

      <Sesion nombre={modo === "login" ? "Iniciar Sesión" : "Registrarse"} onClick={handleSubmit} />

      <SesionGoogle onLogin={handleGoogleLogin} />

      {loading && <p className="text-center text-blue-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {/*{usuario && <p className="text-center text-green-600">Bienvenido, {usuario.nombre}</p>}*/}
    </div>
  );
}
