"use client";

import { CiLock } from "react-icons/ci";

interface Props {
  password: string;
  onChange?: (value: string) => void;
}

export function Password({ password, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-sm font-bold text-black">Contraseña</p>

      <div
        className="flex items-center bg-gray-100 gap-2 rounded-lg px-3 py-2
                   focus-within:ring-2 focus-within:ring-blue-400
                   transition-all"
      >
        <CiLock size={20} className="text-gray-400" />

        <input
          type="password"
          placeholder="●●●●●●●●"
          value={password}
          onChange={(e) => onChange?.(e.target.value)}
          className="outline-none flex-1 text-gray-800 font-medium placeholder-gray-400 font-base"
        />
      </div>
    </div>
  );
}
