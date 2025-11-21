import { FaRegUser } from "react-icons/fa6";

interface Props{
    nombre: string;
    onChange?: (value: string) => void;
}

export function Nombre({nombre, onChange}:Props){
    return(
        <div className="flex flex-col gap-1 w-full">
              <p className="text-sm font-bold text-black">Nombre Completo</p>
        
              <div className="flex items-center bg-gray-100 gap-2  rounded-lg px-3 py-2
                              focus-within:ring-4 focus-within:ring-gray-200
                              transition-all">
                <FaRegUser size={20} className="text-gray-300" />
        
                <input
                  type="nombre"
                  placeholder="Juan Perez"
                  value={nombre}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="outline-none flex-1 text-gray-800"
                />
              </div>
            </div>
    );
}