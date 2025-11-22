"use client";

interface Props {
  nombre: string;
  onClick: () => void;
}

export function Sesion({ nombre, onClick  }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <button
        onClick={onClick}
        className="bg-[#030213] text-white font-bold px-6 py-2 rounded-md text-sm
                   hover:bg-gray-900 transition-colors shadow-md hover:shadow-lg"
      >
        {nombre}
      </button>
    </div>
  );
}
