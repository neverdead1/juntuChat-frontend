"use client";

import { useState, useEffect } from "react";
import { SliderCardsCanales } from "./components/slider/sliderCardsCanales";
import { SliderPerfilCard } from "./components/slider/sliderPerfilCard";
import { HeaderChat } from "./components/headerChat";
import { ListaConectados } from "./components/listaConectador";
import { InputChat } from "./components/inputChat";
import { LuUsers } from "react-icons/lu";
import PopUp from "./components/popUp";
import { useAuthContext } from "../context/AuthContext";
import { useGrupos, Grupo } from "./hooks/useGrupos";
import { useMensajes } from "./hooks/useMensajes";

export default function Home() {
  const [mensaje, setMensaje] = useState("");
  const { usuario } = useAuthContext();
  const { grupos, loading, error } = useGrupos(usuario?._id);

  const [grupoSeleccionado, setGrupoSeleccionado] = useState<Grupo | null>(null);

  // Inicializa el grupo seleccionado cuando los grupos estén listos
  useEffect(() => {
    if (grupos.length > 0 && !grupoSeleccionado) {
      setGrupoSeleccionado(grupos[0]);
    }
  }, [grupos]);

  const { mensajes, loading: loadingMensajes } = useMensajes(
  grupoSeleccionado?.id_chat?._id || null
);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    console.log("Mensaje enviado:", mensaje);
    setMensaje("");
  };

  if (loading) return <div>Cargando grupos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-screen flex overflow-hidden bg-white">
      {/* Sidebar izquierda */}
      <div className="w-64 h-full bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="text-white flex items-center justify-between px-4 py-8 border-b border-gray-800">
          <h1 className="text-lg font-medium">Canales</h1>
          <PopUp currentUserId={usuario?.correo} />
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
          {grupos.map((grupo) => (
            <SliderCardsCanales
              key={grupo._id}
              nombreGrupo={grupo.nombre_grupo}
              onClick={() => setGrupoSeleccionado(grupo)}
            />
          ))}
        </div>

        <div className="p-3 border-t border-gray-800">
          <SliderPerfilCard
            nombreUsr={"" + usuario?.nombre}
            correoUsr={"" + usuario?.correo}
          />
        </div>
      </div>

      {/* Panel central */}
      <div className="flex-1 h-full flex flex-col border-r border-gray-200">
        <HeaderChat
          nombreChat={grupoSeleccionado?.nombre_grupo || " "}
          descripcion={grupoSeleccionado?.descripcion || " "}
          estado={true}
        />

        <div className="flex-1 bg-gray-50 border-b border-gray-300 overflow-y-auto p-4 space-y-3">
          {grupoSeleccionado ? (
            loadingMensajes ? (
              <div>Cargando mensajes...</div>
            ) : mensajes.length > 0 ? (
              mensajes.map((m) => (
                <div key={m._id} className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-700">
                    {m.id_usuario.nombre}
                  </span>
                  <span className="text-md text-black">{m.mensaje}</span>
                </div>
              ))
            ) : (
              <div>No hay mensajes en este grupo:   {grupoSeleccionado._id}</div>
            )
          ) : (
            <div>Selecciona un grupo para ver los mensajes.</div>
          )}
        </div>

        <div className="p-4">
          <InputChat
            mensaje={mensaje}
            onChange={setMensaje}
            onSend={enviarMensaje}
            nombreGrupo={grupoSeleccionado?.nombre_grupo || ""}
          />
        </div>
      </div>

      {/* Sidebar derecha */}
      <div className="w-64 h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="flex items-center px-8 py-8 border-b border-gray-200">
          <LuUsers size={22} className="text-black" />
          <span className="ml-2 text-md font-semibold text-black">Miembros</span>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
          <ListaConectados estadoUsr={false} nombreUsr="Pedro Mamani" />
          <ListaConectados estadoUsr={true} nombreUsr="Luis Condori" />
          <ListaConectados estadoUsr={true} nombreUsr="María López" />
        </div>
      </div>
    </div>
  );
}