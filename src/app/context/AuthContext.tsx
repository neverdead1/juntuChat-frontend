"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
  contrasena?: string;
}

interface AuthContextProps {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  usuario: null,
  setUsuario: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);


  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      setUsuario(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
