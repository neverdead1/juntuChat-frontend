import { IoSettingsOutline } from "react-icons/io5";
import FotoPerfilUsr from "./fotoPerfilUsr";

interface Props {
  nombreUsr: string;
  correoUsr: string;
}

export function SliderPerfilCard({ nombreUsr, correoUsr }: Props) {
  return (
    <div className="flex items-center justify-between  p-3 gap-4 bg-gray-900">
      
      <div>
        <FotoPerfilUsr imagenUrl={""} alto={25} ancho={25} />
      </div>

      <div className="flex flex-col justify-center flex-1">
        <p className="text-white font-medium">{nombreUsr}</p>
        <p className="text-gray-400 text-sm">{correoUsr}</p>
      </div>

      <div>
        <IoSettingsOutline className="text-white text-xl cursor-pointer hover:text-gray-300 transition" />
      </div>

    </div>
  );
}
