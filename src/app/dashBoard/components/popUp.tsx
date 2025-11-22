"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineX } from "react-icons/hi";

export default function PopUp() {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const closePopup = () => setPopUpOpen(false);
  const openPopup = () => setPopUpOpen(true);

  const crearCanal = () => {
    console.log({ nombre, descripcion });
    closePopup();
  };

  return (
    <div>
      <button
        onClick={openPopup}
        className=" text-white p-3 px-4 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition"
        aria-label="Abrir popup"
      >
        <FaPlus size={20} />
      </button>

      {popUpOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
              onClick={closePopup}
              aria-label="Cerrar popup"
            >
              <HiOutlineX />
            </button>

            <div className="flex flex-col gap-4 w-full mt-6">
              <h1 className="text-black text-xl font-bold">
                Crear Nuevo Canal
              </h1>

              <p className="text-gray-400">
                Crear un nuevo canal de colaboración para tu equipo
              </p>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-black">
                  Nombre del canal
                </label>
                <input
                  type="text"
                  placeholder="general, proyectos, equipo…"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="outline-none w-full text-gray-800 bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-300 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-black">
                  Descripción
                </label>
                <input
                  type="text"
                  placeholder="¿De qué trata este canal?"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="outline-none w-full text-gray-800 bg-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-300 transition"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-gray-300 text-gray-800 rounded-lg px-3 py-2 hover:bg-gray-400 transition"
                  onClick={closePopup}
                >
                  Cancelar
                </button>
                <button
                  className="bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition"
                  onClick={crearCanal}
                >
                  Crear Canal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
