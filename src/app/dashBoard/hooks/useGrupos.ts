import { useState, useEffect } from "react";

interface Grupo {
  _id: string;
  nombre_grupo: string;
}

export const useGrupos = (usuarioId?: string) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId) return;

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
  }, [usuarioId]);

  return { grupos, loading, error };
};
