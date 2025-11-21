"use client";

import { FaPlus } from "react-icons/fa6";
import { SliderCardsCanales } from "./components/slider/sliderCardsCanales";
import { SliderPerfilCard } from "./components/slider/sliderPerfilCard";
import { HeaderChat } from "./components/headerChat";
import { ListaConectados } from "./components/listaConectador";
import { InputChat } from "./components/inputChat";
import { useState } from "react";
import { LuUsers } from "react-icons/lu";

export default function Home() {
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    console.log("Mensaje enviado:", mensaje);
    setMensaje("");
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-white">

      {/* ================================
          COLUMNA 1 — SIDEBAR (IZQUIERDA)
      ================================= */}
      <div className="w-64 h-full bg-gray-900 border-r border-gray-800 flex flex-col">

        {/* Header */}
        <div className="text-white flex items-center justify-between px-4 py-8 border-b border-gray-800">
          <h1 className="text-lg font-medium">Canales</h1>
          <FaPlus className="cursor-pointer" />
        </div>

        {/* Lista de canales */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
          <SliderCardsCanales nombreGrupo={"umss"} />
          <SliderCardsCanales nombreGrupo={"frontend"} />
          <SliderCardsCanales nombreGrupo={"backend"} />
          <SliderCardsCanales nombreGrupo={"devops"} />
        </div>

        {/* Perfil abajo */}
        <div className="p-3 border-t border-gray-800">
          <SliderPerfilCard
            nombreUsr={"Jhoan Claure"}
            correoUsr={"jhoanmijael@gmail.com"}
          />
        </div>

      </div>

      {/* ================================
          COLUMNA 2 — CHAT (CENTRO)
      ================================= */}
      <div className="flex-1 h-full flex flex-col border-r border-gray-200">

        {/* Header del chat */}
        <HeaderChat
          nombreChat={"UMSS"}
          descripcion={"estudiantes"}
          estado={false}
        />

        {/* Área de mensajes */}
        <div className="flex-1 bg-gray-50 border-b border-gray-300 overflow-y-auto">
          {/* Aquí irán los mensajes */}
        </div>

        {/* Input chat */}
        <div className="p-4">
          <InputChat
            mensaje={mensaje}
            onChange={setMensaje}
            onSend={enviarMensaje}
            nombreGrupo="umss"
          />
        </div>

      </div>

      {/* ================================
          COLUMNA 3 — MIEMBROS (DERECHA)
      ================================= */}
      <div className="w-64 h-full bg-white border-l border-gray-200 flex flex-col">

        {/**Miembros */}
        <div className="flex items-center px-4 py-8 border-b border-gray-200">
          <LuUsers size={22} className="text-black" />
          <span className="ml-2 text-md font-semibold text-black">
            Miembros
          </span>
        </div>

        {/* Lista conectados */}
        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
          {/* Encabezado */}
          <ListaConectados estadoUsr={false} nombreUsr="Pedro Mamani" />
          <ListaConectados estadoUsr={true} nombreUsr="Luis Condori" />
          <ListaConectados estadoUsr={true} nombreUsr="María López" />
        </div>

      </div>
    </div>
  );
}
