import { BiNavigation } from "react-icons/bi";

interface Props {
  mensaje: string;
  onChange?: (valor: string) => void;
  onSend?: () => void;
  nombreGrupo?: string;
}

export function InputChat({ mensaje, onChange, onSend, nombreGrupo }: Props) {
  return (
    <div className="flex items-center gap-2 w-full p-2 bg-white rounded-xl shadow-sm border border-gray-200">
      
      {/* Input */}
      <input
        type="text"
        placeholder={`Mensaje en ${nombreGrupo ? "#" + nombreGrupo : "el grupo"}`}
        value={mensaje}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 text-gray-800 bg-transparent outline-none px-2"
      />

      {/* Botón enviar */}
      <button
        onClick={onSend}
        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 active:bg-blue-500 transition"
      >
        <BiNavigation size={22} className="text-gray-700" />
      </button>
    </div>
  );
}
