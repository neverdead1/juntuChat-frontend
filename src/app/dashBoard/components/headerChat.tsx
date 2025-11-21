import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { GoHash } from "react-icons/go";

interface Props {
  nombreChat: string;
  descripcion: string;
  estado: boolean;
}

export function HeaderChat({ nombreChat, descripcion, estado }: Props) {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-5 px-6 flex items-center justify-between">

      {/* Columna 1: Botón */}
      <div className="shrink-0">
        <button className="p-2  text-blue-950 rounded-full transition duration-200">
          <GoHash size={20} />
        </button>
      </div>

      {/* Columna 2: Nombre + Descripción + Estado */}
      <div className="flex-1 flex flex-col ml-5">

        {/* Fila 1: Nombre */}
        <p className="text-black text-xl font-semibold leading-tight">
          {nombreChat}
        </p>

        {/* Fila 2: Descripción + Estado */}
        <div className="flex items-center justify-between mt-1">

          {/* Descripción */}
          <p className="text-gray-600 text-sm">
            {descripcion}
          </p>

          {/* Estado */}
          {estado ? (
            <div className="flex items-center text-green-400 gap-1 ml-4">
              <CiCircleCheck size={18} />
              <span className="text-sm font-medium">Conectado</span>
            </div>
          ) : (
            <div className="flex items-center text-red-400 gap-1 ml-4">
              <CiCircleRemove size={18} />
              <span className="text-sm font-medium">Desconectado</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
