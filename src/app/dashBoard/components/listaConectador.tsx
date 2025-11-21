import { LuUsers } from "react-icons/lu";
import FotoPerfilUsr from "./slider/fotoPerfilUsr";
import { FaCircle } from "react-icons/fa6";

interface Props {
  estadoUsr: boolean;
  nombreUsr: string;
}

export function ListaConectados({ estadoUsr, nombreUsr }: Props) {
  return (
    <div className="w-full px-3 py-1"> {/* mucho más compacto */}

      <button className="flex items-center gap-2 w-full hover:bg-gray-100 p-1 rounded-lg transition">
        <FotoPerfilUsr imagenUrl="" ancho={32} alto={32} /> {/* tamaño reducido */}

        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-sm truncate">{nombreUsr}</span>

          <FaCircle
            size={9}
            className={estadoUsr ? "text-emerald-500" : "text-red-800"}
          />
        </div>
      </button>
    </div>
  );
}
