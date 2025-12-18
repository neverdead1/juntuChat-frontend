import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useOnlineStatus(userId: string | undefined) {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) return;

    // Conexión dedicada para estado, pasando el userId
    const newSocket: Socket = io("http://localhost:8000", {
      transports: ["websocket"],
      query: { userId }, // Enviamos quién soy al backend
    });

    // 1. Recibir lista inicial
    newSocket.on("lista-usuarios-online", (users: string[]) => {
      setOnlineUsers(new Set(users));
    });

    // 2. Escuchar cuando alguien entra o sale
    newSocket.on("usuario-cambio-estado", ({ userId, enLinea }: { userId: string, enLinea: boolean }) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        if (enLinea) {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return { onlineUsers };
}