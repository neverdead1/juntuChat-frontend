"use client";
import { FaPlus } from "react-icons/fa6";
import { SliderCardsCanales } from "./components/slider/sliderCardsCanales";
import { SliderPerfilCard } from "./components/slider/sliderPerfilCard";

export default function Home() {
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-700 flex flex-col">
     <div className="text-white flex items-center justify-between px-4 py-5 border-b border-gray-700">
        <h1 className="text-lg font-medium">Canales</h1>
        <FaPlus className="" />
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        <SliderCardsCanales nombreGrupo={"umss"} />
        <SliderCardsCanales nombreGrupo={"frontend"} />
        <SliderCardsCanales nombreGrupo={"backend"} />
        <SliderCardsCanales nombreGrupo={"devops"} />
              {/* Agrega más canales si es necesario */}
        </div>
      <div className="p-2 border-t border-gray-700">
        <SliderPerfilCard
          nombreUsr={"Jhoan Claure"}
          correoUsr={"jhoanmijael@gmail.com"}
        />
      </div>
    </div>
  );
}
