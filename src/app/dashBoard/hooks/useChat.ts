// hooks/useChat.ts
import { useState } from "react";

export function useChat() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [participantes, setParticipantes] = useState<string[]>([]);
  const [correo, setCorreo] = useState("");

  const crearCanal = async (correoUsr: string) => {
  if (!nombre || !descripcion || participantes.length === 0) {
    console.warn("Faltan datos:", { nombre, descripcion, participantes });
    return;
  }

  // Construir lista actualizada con el usuario actual
  const participantesActualizados = [...participantes, correoUsr];

  console.log("Participantes (correos):", participantesActualizados);

  // 1️⃣ Obtener IDs del backend
  const resIds = await fetch("http://localhost:8000/usuario/ids", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correos: participantesActualizados }),
  });

  const dataIds = await resIds.json();

  if (!Array.isArray(dataIds.ids)) {
    console.error("IDs recibidos no son válidos:", dataIds);
    return;
  }

  console.log("IDs recibidos del backend:", dataIds.ids);

  // 2️⃣ Construir payload final
  const payload = {
    nombre_grupo: nombre,
    descripcion,
    usuarios: dataIds.ids,
  };

  console.log("Payload final a enviar al endpoint /grupo:", payload);

  // 3️⃣ Enviar al backend
  const resGrupo = await fetch("http://localhost:8000/grupo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const grupoCreado = await resGrupo.json();
  console.log("Respuesta backend (grupo creado):", grupoCreado);

  // 4️⃣ Resetear formulario
  setParticipantes([]);
  setNombre("");
  setDescripcion("");
  setCorreo("");
};


  return {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    participantes,
    setParticipantes,
    correo,
    setCorreo,
    crearCanal,
  };
}
