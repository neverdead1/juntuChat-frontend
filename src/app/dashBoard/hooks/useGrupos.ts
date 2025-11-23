import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export interface Grupo {
  _id: string;
  nombre_grupo: string;
  descripcion : string;
  usuarios: string[];
  id_chat: {
    _id: string;
    tipo_chat: string;
    usuarios: string[];
    // puedes agregar más campos si tu modelo de Chat los tiene
  };

}

let socket: Socket | null = null;

export const useGrupos = (usuarioId?: string) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId) return;

    // 1️⃣ fetch inicial
    const fetchGrupos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:8000/grupo/usuario/${usuarioId}`);
        if (!res.ok) throw new Error("Error al obtener los grupos");

        const data = await res.json();
        setGrupos(data);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchGrupos();

    // 2️⃣ conectar socket si no existe todavía
    if (!socket) {
      socket = io("http://localhost:8000", {
        transports: ["websocket"],
      });
    }

    // 3️⃣ escuchar creación de grupo
    socket.on("grupo-creado", (nuevoGrupo: Grupo) => {
      // validar que el usuario sea miembro
      if (!nuevoGrupo.usuarios.includes(usuarioId)) return;

      setGrupos(prev => {
        // evitar duplicados
        if (prev.some(g => g._id === nuevoGrupo._id)) return prev;
        return [...prev, nuevoGrupo];
      });
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };

  }, [usuarioId]);

  return { grupos, loading, error, setGrupos };
};
