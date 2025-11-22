// src/app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
  contrasena?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext debe estar dentro de AuthProvider");
  return context;
}
