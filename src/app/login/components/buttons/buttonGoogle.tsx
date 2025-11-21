"use client";

import { FcGoogle } from "react-icons/fc";

export function SesionGoogle() {
  return (
    <div className="flex flex-col gap-1 w-full justify-center items-center">
      <button
        className="flex items-center gap-2 bg-white text-gray-800 border border-gray-300
                   rounded-lg px-4 py-2 shadow-sm hover:shadow-md
                   transition-all font-bold w-full justify-center"
      >
        <FcGoogle size={20} color="black" />
        Google
      </button>
    </div>
  );
}
