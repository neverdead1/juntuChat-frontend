import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"; // Importar io

export interface Mensaje {
  _id: string;
  id_chat: string;
  id_usuario: {
    _id: string;
    nombre: string;
    correo: string;
  };
  mensaje: string;
  createdAt: string;
}

// Singleton del socket para no crear múltiples conexiones
let socket: Socket | null = null;

export function useMensajes(id_chat: string | null) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Carga inicial por HTTP (Historial)
  useEffect(() => {
    if (!id_chat) {
      setMensajes([]);
      return;
    }

    const fetchMensajes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/mensaje/grupo/${id_chat}`);
        if (!res.ok) throw new Error("Error al cargar mensajes");
        const data: Mensaje[] = await res.json();
        setMensajes(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchMensajes();
  }, [id_chat]);

  // 2. Conexión WebSocket (Tiempo Real)
  useEffect(() => {
    // Conectar si no existe
    if (!socket) {
      socket = io("http://localhost:8000", {
        transports: ["websocket"], // Forzamos websocket para evitar problemas de polling
      });
    }

    // Escuchar el evento que emite el backend
    socket.on("nuevo-mensaje", (nuevoMensaje: Mensaje) => {
      console.log("⚡ Mensaje recibido por socket:", nuevoMensaje);

      // Validamos que el mensaje sea para el chat que estamos viendo
      if (id_chat && nuevoMensaje.id_chat === id_chat) {
        setMensajes((prev) => {
          // Evitar duplicados por si acaso
          if (prev.some(m => m._id === nuevoMensaje._id)) return prev;
          return [...prev, nuevoMensaje];
        });
      }
    });

    // Limpieza al desmontar
    return () => {
      socket?.off("nuevo-mensaje");
    };
  }, [id_chat]); // Se vuelve a ejecutar si cambias de chat

  return { mensajes, loading, error, setMensajes };
}