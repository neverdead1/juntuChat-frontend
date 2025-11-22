"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
  contrasena?: string;
}

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Helper para manejar fetch
  const fetchAPI = async (url: string, body: any) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error de servidor");

    return data;
  };

  const registrar = async (nombre: string, correo: string, contrasena: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI("http://localhost:8000/usuario", { nombre, correo, contrasena });
      setUsuario(data);
      router.push("/dashBoard"); // redirige al registro exitoso
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const login = async (correo: string, contrasena: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI("http://localhost:8000/usuario/login", { correo, contrasena });
      setUsuario(data.usuario);
      router.push("/dashBoard"); // redirige al login exitoso
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loginGoogle = async (nombre: string, correo: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI("http://localhost:8000/usuario/login-google", { nombre, correo });
      setUsuario(data.usuario);
      router.push("/dashBoard"); // redirige al login exitoso
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { usuario, loading, error, registrar, login, loginGoogle };
}
