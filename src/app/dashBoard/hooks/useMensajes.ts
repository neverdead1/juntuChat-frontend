import { useEffect, useState } from "react";

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

export function useMensajes(id_chat: string | null) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay id_chat, limpiamos mensajes y salimos
    if (!id_chat) {
      setMensajes([]);
      return;
    }

    const fetchMensajes = async () => {
      setLoading(true);
      setError(null); // limpiamos error previo
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

  return { mensajes, loading, error, setMensajes };
}