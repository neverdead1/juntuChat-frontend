import { GoHash } from "react-icons/go";

interface Props {
  nombreGrupo: string;
  isActive?: boolean; // nueva prop opcional para canal activo
}

export function SliderCardsCanales({ nombreGrupo, isActive = false }: Props) {
  return (
    <button
      className={`flex items-center w-full gap-2 px-3 py-2 rounded-lg text-left transition-all
        ${isActive 
          ? "bg-blue-950 text-white border-l-4 border-blue-400" 
          : "bg-blue-600 text-gray-300 hover:bg-blue-500"}
        focus:outline-none focus:ring-2 focus:ring-blue-400`}
    >
      <GoHash size={20} />
      <span className="font-medium truncate">{nombreGrupo}</span>
    </button>
  );
}
