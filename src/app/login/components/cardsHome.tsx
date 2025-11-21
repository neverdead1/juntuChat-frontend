import { CiChat1 } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";

export function CardHome() {
  return (
    <div className="flex gap-6 justify-center items-center py-6">

      <div className="bg-white shadow-md hover:shadow-lg transition-shadow p-6 rounded-xl  relative w-68">{/**border border-gray-200 */}
        
        <CiChat1 
          size={50} 
          className="text-blue-400 absolute top-4 left-4"
        />

        <div className="mt-14 text-center">
          <p className="text-lg font-semibold">Mensajería Instantánea</p>
          <p className="text-gray-500 text-sm">
            Envía y recibe mensajes al instante
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md hover:shadow-lg transition-shadow p-6 rounded-xl  relative w-64">{/**border border-gray-200 */}
        
        <LuUsers 
          size={50} 
          className="text-fuchsia-950 absolute top-4 left-4"
        />

        <div className="mt-14 text-center">
          <p className="text-lg font-semibold">Múltiples Usuarios</p>
          <p className="text-gray-500 text-sm">
            Chatea con todo tu equipo
          </p>
        </div>
      </div>

    </div>
  );
}
