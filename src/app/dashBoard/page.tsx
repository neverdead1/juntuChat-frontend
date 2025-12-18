"use client";

import { useState, useEffect, useRef } from "react";
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
import { useOnlineStatus } from "./hooks/useOnlineStatus"; // <--- 1. Importar

// Interfaz auxiliar para manejar los usuarios populados
interface UsuarioGrupo {
  _id: string;
  nombre: string;
  correo: string;
}

export default function Home() {
  const [mensaje, setMensaje] = useState("");
  const { usuario } = useAuthContext();
  const { grupos, loading, error } = useGrupos(usuario?._id);

  // <--- 2. Usar el hook de estado
  const { onlineUsers } = useOnlineStatus(usuario?._id);

  // El estado grupoSeleccionado ahora puede contener usuarios completos
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<any | null>(null);

  useEffect(() => {
    if (grupos.length > 0 && !grupoSeleccionado) {
      setGrupoSeleccionado(grupos[0]);
    }
  }, [grupos]);

  const { mensajes, loading: loadingMensajes, setMensajes } = useMensajes(
    grupoSeleccionado?.id_chat?._id || null
  );

  // ... (Mantener lógica de chatEndRef y enviarMensaje EXACTAMENTE IGUAL para no romper el chat) ...
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (!mensaje.trim() || !grupoSeleccionado || !usuario?._id) return;
    // ... Tu lógica original de fetch ...
    try {
        const res = await fetch("http://localhost:8000/mensaje", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_chat: grupoSeleccionado.id_chat._id,
            id_usuario: usuario._id,
            mensaje: mensaje,
          }),
        });
        if (!res.ok) throw new Error("Error al enviar");
        const nuevoMensaje = await res.json();
        setMensajes((prev) => [...prev, nuevoMensaje]);
    } catch (err) {
        console.error(err);
    }
    setMensaje("");
  };

  if (loading) return <div>Cargando grupos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-screen flex overflow-hidden bg-white">
      {/* Sidebar Izquierda ... (Igual que antes) */}
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
              // Puedes añadir estilo activo visualmente si quieres
              isActive={grupoSeleccionado?._id === grupo._id} 
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

      {/* Panel Central ... (Igual que antes) */}
      <div className="flex-1 h-full flex flex-col border-r border-gray-200">
        <HeaderChat
          nombreChat={grupoSeleccionado?.nombre_grupo || " "}
          descripcion={grupoSeleccionado?.descripcion || " "}
          estado={true}
        />
        <div className="flex-1 bg-gray-50 border-b border-gray-300 overflow-y-auto p-4 space-y-3">
          {/* ... Tu lógica original de renderizado de mensajes ... */}
          {grupoSeleccionado ? (
            loadingMensajes ? <div>Cargando...</div> : 
            mensajes.length > 0 ? mensajes.map((m) => (
                <div key={m._id} className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-700">{m.id_usuario.nombre}</span>
                  <span className="text-md text-black">{m.mensaje}</span>
                </div>
            )) : <div>No hay mensajes.</div>
          ) : <div>Selecciona un grupo.</div>}
          <div ref={chatEndRef} />
        </div>
        <div className="p-4">
          <InputChat mensaje={mensaje} onChange={setMensaje} onSend={enviarMensaje} nombreGrupo={grupoSeleccionado?.nombre_grupo || ""} />
        </div>
      </div>

      {/* Sidebar Derecha (MODIFICADO para mostrar usuarios reales) */}
      <div className="w-64 h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="flex items-center px-8 py-8 border-b border-gray-200">
          <LuUsers size={22} className="text-black" />
          <span className="ml-2 text-md font-semibold text-black">Miembros</span>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-y-auto">
          {/* Renderizado dinámico de usuarios del grupo */}
          {grupoSeleccionado?.usuarios && Array.isArray(grupoSeleccionado.usuarios) ? (
            grupoSeleccionado.usuarios.map((miembro: UsuarioGrupo) => (
              <ListaConectados 
                key={miembro._id}
                estadoUsr={onlineUsers.has(miembro._id)} // Verifica si el ID está en el Set de online
                nombreUsr={miembro.nombre} 
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">No hay miembros</p>
          )}
        </div>
      </div>
    </div>
  );
}