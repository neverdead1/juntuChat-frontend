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
    if (!id_chat) return;

    const fetchMensajes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/mensaje/grupo/${id_chat}`);
        if (!res.ok) throw new Error("Error al cargar mensajes");
        const data = await res.json();
        setMensajes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMensajes();
  }, [id_chat]);

  return { mensajes, loading, error, setMensajes };
}